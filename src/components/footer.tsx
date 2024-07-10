import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-8 w-full flex  flex-col justify-center items-center">
      <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between w-full  max-lg:min-w-full ">
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col justify-center items-center">
          <h2 className="text-2xl  font-bold mb-4">Rigalem</h2>
          <p className="mb-4 text-center">
            Your Vision. Our Services. Limitless Solutions.
          </p>
        </div>

        {/* <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center items-center flex-col ">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className=" flex flex-col  justify-center items-center flex-wrap">
            <li>
              <Link href="/" className="hover:underline ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline p-2">
                About
              </Link>
            </li>
            <li>
              <Link href="/prices"  className="hover:underline p-2">
                Prices
              </Link>
            </li>
            <li>
              <Link href="/contact " className="hover:underline p-2">
                Contact
              </Link>
            </li>
          </ul>
        </div> */}

        <div className="w-full md:w-1/3 justify-center items-center flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:info@rigalem.com" className="hover:underline">
              sales@pixlab.com
            </a>
          </p>
          {/* <p className="mb-2">
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +123 456 7890
            </a>
          </p> */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Pixlab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
