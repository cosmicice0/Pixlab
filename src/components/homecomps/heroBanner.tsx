import React from "react";
import Navbar from "./navbar";
import Image from "next/image";
import bgImg from "../../../public/hero_bg.jpeg";

const HeroBanner = () => {
  return (
    <section className="relative text-center text-white h-screen w-full flex flex-col justify-center items-center ">
        <div className="flex flex-1  z-20 justify-start items-start w-full">
          <Navbar />
        </div>
        <Image
          src={bgImg}
          alt="background image"
          layout="fill"
        //   objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10 "></div>{" "}
        <div className="  flex flex-1 p-4 z-20 mb-[7%] max-md:mb-[40%]">
          {/* For overlay effect */}
          <div className="relative z-20 ">
            <h1 className="text-5xl font-bold mt-10">
              Your <span className="text-red-600">Vision</span>. Our{" "}
              <span className="text-red-600">Services</span>. Limitless{" "}
              <span className="text-red-600">Solutions</span>.
            </h1>
            <p className="mt-4 text-lg">
            {/* Pixlab is a dynamic website development agency specializing in creating visually stunning and highly functional websites. */}
            </p>
          </div>
        </div>
    </section>
  );
};

export default HeroBanner;
