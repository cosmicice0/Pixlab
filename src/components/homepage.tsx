import React from "react";
import HeroBanner from "./homecomps/heroBanner";

import Prices from "./homecomps/prices";
import ContactForm from "./homecomps/contactForm";
import Navbar from "./homecomps/navbar";
import AboutUs from "./homecomps/aboutUs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";
import Footer from "./footer";


const Homepage =  () => {

  // const session = await getServerSession(authOptions);

  // if (session) redirect("/");
  // console.log(session)


  return (
    <div className="bg-[#1F1F1F] min-h-screen">
      {/* <Navbar /> */}
      <HeroBanner />
      <AboutUs />

      <Prices />
      <Footer/>
    </div>
  );
};

export default Homepage;
