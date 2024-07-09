import React from "react";

const page = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start p-4 mt-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-purple-600">
          Welcome to Pixlab
        </h1>
        <p className="mt-4 text-lg text-gray-800">
          Pixlab is your go-to platform for professional web development
          projects. Choose from frontend, backend, or fullstack options to get
          your project done by experienced professionals. Our user-friendly site
          makes it easy to get started with your project at competitive prices.
        </p>
        {/* <div className="mt-8">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg mr-4">
            Get Started
          </button>
          <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">
            Learn More
          </button>
        </div> */}
      </div>
    </main>
  );
};

export default page;
