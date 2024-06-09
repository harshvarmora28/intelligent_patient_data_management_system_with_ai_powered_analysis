import React from "react";
import "../assets/css/Home.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Chat from "@/components/Chat/Chat";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold">MedAssist</h1>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to="/aboutus" className="mr-5 hover:text-gray-900">About Us</Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        <Link to={"/auth/signup"}>Sign up</Link>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
      <section className="text-gray-600 body-font px-5">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Skip the travel! <br />
              Take Online Doctor Consultation
            </h1>
            <h4 className="title-font sm:text-2xl text-2xl mb-2 mt-3 font-small text-gray-900">
            Intelligent Patient Data Management System
            </h4>
            <p className="mb-8 leading-relaxed">
            Introducing the AI-based Patient Data Management System.
            Securely input your health details and let cutting-edge AI do the
            rest, offering insights and suggestions like never before. Transform
            patient care, where innovation meets trust and efficiency.
            </p>
            <div className="flex mt-5 justify-center">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
              <Link to={"/auth/login"}>Get Started</Link>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img src="pic.svg" width={500} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
