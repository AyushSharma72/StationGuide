import User from '../models/User.js';
import crypto from 'crypto'; // For generating OTP
import nodemailer from 'nodemailer';
import { hashPassword, comparePassword, generateToken, verifyToken, addCookie, getCookies, removeCookie } from '../utils/authFunctions.js';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, isGoogle } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    } else if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    } else if (isGoogle == false && !password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP (6 digits)

    if (isGoogle == true) {
      const newUser = new User({
        name,
        email,
        phoneNumber: phoneNumber ? phoneNumber : '',
        password: '',
        otp: otp,
        otpExpiry: Date.now() + 3600000, // OTP expires in 1 hour
      });

      await newUser.save();

      await sendOtpEmail(email, otp); // Send OTP to the user's email

      const token = await generateToken(newUser._id);
      addCookie(res, 'token', token);

      return res.status(201).json({
        message: 'User registered successfully. Please check your email for the OTP to verify your email.',
        userId: newUser._id,
        token: token,
      });
    } else {
      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        name,
        email,
        phoneNumber: phoneNumber ? phoneNumber : '',
        password: hashedPassword,
        otp: otp,
        otpExpiry: Date.now() + 3600000, // OTP expires in 1 hour
      });

      await newUser.save();

      await sendOtpEmail(email, otp); // Send OTP to the user's email

      const token = await generateToken(newUser._id);
      addCookie(res, 'token', token);

      res.status(201).json({
        message: 'User registered successfully. Please check your email for the OTP to verify your email.',
        userId: newUser._id,
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const sendOtpEmail = async (userEmail, otp) => {
  try {

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Email Verification - Station Sarthi',
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Check if OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is correct, mark user as verified
    user.isVerified = true;
    user.otp = null; // Clear OTP after verification
    user.otpExpiry = null; // Clear OTP expiry after verification
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    } else if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = await generateToken(user._id);

    addCookie(res, 'token', token);

    res.status(200).json({ message: 'User logged in successfully', userId: user._id, token: token });
  } catch (error) {
    res.status(500).json({ error: error | 'Internal Server Error' });
  }
};

async function sendResetOtpEmail(email, otp) {
  await transporter.sendMail({
    from: 'Station Sarthi <noreply@gmail.com>',
    to: email,
    subject: 'Password Reset OTP - Station Sarti',
    text: `Your OTP for password reset is ${otp}. It will expire in 1 hour.`
  });
}

// Route 1: Request Password Reset (Sends OTP)
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User with this email does not exist' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP
    user.otp = otp;
    user.otpExpiry = Date.now() + 3600000; // OTP expires in 1 hour
    await user.save();

    await sendResetOtpEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to email for password reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Route 2: Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Email, OTP, and new password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Check if OTP is valid
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash the new password and reset OTP fields
    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    removeCookie(res, 'token');

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error | 'Internal Server Error' });
  }
}

export const verifyUser = async (req, res) => {
  try {
    const token = getCookies(req, 'token');

    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    res.status(200).json({ message: 'User verified successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error | 'Internal Server Error' });
  }
};