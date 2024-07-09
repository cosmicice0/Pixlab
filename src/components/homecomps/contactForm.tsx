import React from "react";

const ContactForm = () => {
  return (
    <section className=" py-20  text-white text-center max-md:px-6">
      <h1 className="text-4xl mb-10 text-[#EE412B] font-semibold">Describe Project</h1>
      <form className="max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 rounded bg-gray-100 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 rounded bg-gray-100 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service" className="block mb-2">
            Select Service:
          </label>
          <select
            id="service"
            name="service"
            className="w-full p-2 text-black rounded bg-gray-100"
          >
            <option value="front-end">Front-End</option>
            <option value="back-end">Back-End</option>
            <option value="custom-project">Custom Project</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full p-2 rounded bg-gray-100 text-black"
          ></textarea>
        </div>
        <button type="submit" className="bg-red-600 px-4 py-2 rounded text-white">
          Buy Now
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
