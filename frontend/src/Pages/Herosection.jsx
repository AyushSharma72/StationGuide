import React from "react";
import "./Herosection.css";
import ThemeToggle from "../components/ThemeToggle"
import logo from "../assets/stationsaarthi.svg";
import navigationsvg from "../assets/svg/navigation.svg";
import bookingsvg from "../assets/svg/bookings.svg";
import stationsvg from "../assets/svg/station.svg";
import noticationsvg from "../assets/svg/notification.svg";
import mapsvg from "../assets/svg/3dmap.svg";
import schedulesvg from "../assets/svg/schedule.svg";
import searchsvg from "../assets/svg/search.svg";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./hamburger";
import contributorsvg from "../assets/svg/contributor.svg";
import chatbotsvg from "../assets/svg/chatbot.svg";
import Chatbot from "../components/chatbot";
import Navbar from "../components/navbar";
import Language from "../components/language";
import { FaUserAlt } from "react-icons/fa";
import Popup from "../components/popup";
import GoogleTranslate from "./GoogleTranslate";

const Herosection = () => {
  const navigate = useNavigate();

  const LoginClick = () => {
    navigate("/Login"); // Navigates to the login page
  };
  const RegisterClick = () => {
    navigate("/Register"); // Navigates to the login page
  };
  const StationCLick = () => {
    navigate("/Stations"); // Navigates to the login page
  };
  const UserCLick = () => {
    navigate("/user"); // Navigates to the login page
  };
  const NavigationCLick = () => {
    navigate("/Navigation"); // Navigates to the login page
  };
  const BookingCLick = () => {
    navigate("/Booking"); // Navigates to the login page
  };
  const MapCLick = () => {
    navigate("/3DMap"); // Navigates to the login page
  };
  const ScheduleCLick = () => {
    navigate("/Schedule"); // Navigates to the login page
  };
  const NotificationCLick = () => {
    navigate("/Notification"); // Navigates to the login page
  };
  const ContributorCLick = () => {
    navigate("/contributor"); // Navigates to the login page
  };
  const ContactClick = () => {
    navigate("/contactus");
  };

  return (
    <>
      <div className="relative z-50 flex items-center justify-between gap-[88vw]">
        <div className="flex flex-col gap-x-2">
          <Navbar />
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-center">
          <div>
            <HamburgerMenu />
          </div>

          <button type="submit" onClick={UserCLick} className="">
            <FaUserAlt className="bg-blue-200  dark:bg-black border-2 text-blue-600 dark:text-white border-blue-200 rounded-full w-[55px] h-[55px] p-2 shadow-lg mr-2" />
          </button>
        </div>
      </div>
      <div
        className="translate relative z-50 flex items-center"
        style={{ marginLeft: "70px", top: "-100px" }}
      >
        <GoogleTranslate />
      </div>

      <h1 className="pl-4 text-4xl font-black text-center text-white">
        Namaste !! Yatree{" "}
      </h1>
      <div className="relative flex items-center justify-center bg-center bg-cover herosection">
        <div className="relative z-10 grid justify-items-center">
          <img src={logo} alt="" srcset="" style={{ height: "40vh" }} />
          <h1 className="text-2xl font-extrabold text-white text-center">
            Station Saarthi : Your Platform Guide
          </h1>
        </div>
        {/* <img src={bg} alt="whitishbg" style={{ position: "absolute", bottom: 0 }} />
            <img src={bgmobile} alt="" style={{ position: "absolute", bottom: 0, zIndex: "10" }} className="md:hidden" /> */}
      </div>
      <br></br>
          
      <div className="dark:bg-black grid grid-cols-3 gap-2 pb-10 mt-32 md:flex md:flex-row md:justify-evenly justify-items-center ">
      <div
          type="submit"
          onClick={ContactClick}
          className="fixed flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer  left-3 -bottom-16 md:bottom-24"
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADEUlEQVR4nO2Zy08TURTG+4cNUawPFhJi0PhYEB+RNBo3LnztRHnUBiiUgtRKKxIXVROqlWopveKD4EJjVQK2/0fnPcecRpM+h3unM3MHw+LbNc395Zx7zne/8ZGyAf+DfLwPsA9S9mhF0kUdQlkFAkkZTk5L4B+pwPFxEe6mFciXPN5aayUD4p80uBSXoWuoAkIbnZuVIPNT9x5IoWzAdF6F3gmx7eGFBp0Ii/DaBMZ1kMVNDU7PSNQAQo2w5d5ucwZZ3THg9nMFuu6xAwg1uvBIrrYkF5Cnmxr0henbSNhFN1KK+yDBrAIH7tsDIPwVDobYB9UdkNy2AVcXZVsBhNpJNic5D4LTxeqFFijlHxWdBXnxTYe+Sfvug9BGZ6IOViSxocGRMech/KNidYA4ArLwWYNDI84CCEMVuBiXYbnYvBhtAZlfV+HgsLMAh8fEqhdrd4aOQaIF1fbxKjRoMCGb2pOOQR6us0P0hMSqzxpc2H009zwQYaZQvy9sB3n8UWNuJ5z9r37odb7rbLT1mA4kZXjzy7wKHYMkNzToZoTACuR/N/8X+qaJd2p173SPVOBURIK593RV6Agk9VVnHrG44VsZPTvlY/kxlpp12V1/pjgOQVhA0Dux2o47L9uPS24g15Zkz0IQWpDgisLcTm5CEBoQ9DQsu+LKE+cvNmEFwecpPvppIc7HpJYjljvIzRR9S+EgyO3wgSBmILh1aYOCY0ERlr/Tb2HXQApltlE7lWffxK6ATOVVNvuRkL0HslYyoHec/ZWHDytPgUQLbNWoTQELJQ+BDMxbTz8mc6o3QNJF3TQVZ002uIGEsmxWpFH4RvEESCDZWTLYH/FIRfojnaWDs8Qjd8Q/ah0CzSIvCNIIYmV/oI4GRcgwBAWOgwxnrF122sjGNZC1kgEDMWnP2RPSaiGubOnVLU3VUmPmHyi5ghBMS7bovm+EV/m3FDEDQeEj6bJJrImpOO/DExqQf3fmVkppsi2YjKdrok8vyEfzI/zwiBkthhDYcktf+Fp2YhVkL8jH+wD7IOX6ivwBG1++6j5JMzMAAAAASUVORK5CYII=" alt="phone-disconnected"
            className="
      bg-blue-200 border-2 border-blue-100 rounded-full  dark:bg-black
      w-[64px] h-[64px] p-2
    "
          />
          <h1 className="text-xs font-bold text-black dark:text-white">Contact Us</h1>
        </div>
        <div
          type="submit"
          onClick={ContributorCLick}
          className="fixed flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer  left-3 -bottom-8 md:-bottom-5"
        >
          <img
            src={contributorsvg}
            alt=""
            className="
      bg-blue-200 border-2 border-blue-100 rounded-full  dark:bg-black
      w-[64px] h-[64px] p-2
    "
          />
          <h1 className="text-xs font-bold text-black dark:text-white">Contributors</h1>
        </div>

        <div
          type="submit"
          onClick={NavigationCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300"
        >
          <img
            src={navigationsvg}
            alt=""
            srcset=""
            className="dark:bg-black bg-blue-200 border-2 border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg"
          />
          <button className="w-24 py-1 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-500 dark:bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            <h1 className="font-bold text-white dark:text-black">Navigation</h1>
          </button>
        </div>
        <div
          type="submit"
          onClick={BookingCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300"
        >
          <img
            src={bookingsvg}
            alt=""
            srcset=""
            className="bg-blue-200 border-2 dark:bg-black border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg "
          />
          <button
            type="submit"
            onClick={BookingCLick}
            className="w-20 py-1 mt-2 font-semibold dark:bg-white text-white transition-all duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            <h1 className="font-bold text-white dark:text-black">Booking</h1>
          </button>
        </div>
        <div
          type="submit"
          onClick={StationCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300"
        >
          <img
            src={stationsvg}
            alt=""
            srcset=""
            className="bg-blue-200 dark:bg-black border-2 border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg"
          />
          <button className="w-20 py-1 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-500 dark:bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            <h1 className="font-bold text-white dark:text-black">Station</h1>
          </button>
        </div>
        <div
          type="submit"
          onClick={MapCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300 "
        >
          <img
            src={mapsvg}
            alt=""
            srcset=""
            className="bg-blue-200 dark:bg-black border-2 border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg"
          />{" "}
          <button
            type="submit"
            onClick={MapCLick}
            className="w-20 py-1 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-500 dark:bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            {" "}
            <h1 className="font-bold text-white dark:text-black">3D Map</h1>
          </button>
        </div>

        <div
          type="submit"
          onClick={ScheduleCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300"
        >
          <img
            src={schedulesvg}
            alt=""
            srcset=""
            className="bg-blue-200 dark:bg-black border-2 border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg"
          />
          <button
            type="submit"
            onClick={ScheduleCLick}
            className="w-20 py-1 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-500 dark:bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            {" "}
            <h1 className="font-bold text-white dark:text-black">Schedule</h1>
          </button>
        </div>

        <div
          type="submit"
          onClick={NotificationCLick}
          className="flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer transition-all hover:translate-y-2 duration-300"
        >
          <img
            src={noticationsvg}
            alt=""
            srcset=""
            className="bg-blue-200 dark:bg-black border-2 border-blue-200 rounded-full w-[64px] h-[64px] p-2 shadow-lg "
          />{" "}
          <button
            type="submit"
            onClick={NotificationCLick}
            className="w-24 py-1 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-500 dark:bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            {" "}
            <h1 className="font-bold text-white dark:text-black">Notification</h1>
          </button>
        </div>
      </div>
      <div className="fixed dark:bg-black flex flex-col items-center justify-center py-8 my-auto rounded-full cursor-pointer  right-5 -bottom-8 md:-bottom-7">
        <Popup />
        <Chatbot />
        <h1 className="text-xs font-bold text-black dark:text-white">Saarthi</h1>
      </div>
    </>
  );
};

export default Herosection;
