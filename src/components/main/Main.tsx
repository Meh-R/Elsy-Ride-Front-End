import Image from "next/image";
import React from "react";

export const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="h-[100vh] flex flex-col md:flex-row bg-gray-100">
        <div className="flex items-center justify-center w-full md:w-1/2 bg-imgMain bg-cover bg-center"></div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-white p-8">
          <div className="text-center max-w-lg mx-auto">
            <Image
              src="/Elsy_Bike_transparent.png"
              alt="Elsy Ride Logo"
              width={300}
              height={300}
              priority
              className="mb-8 w-auto h-auto"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-black leading-snug">
              Bike Store for All Your Hobbies
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-4 mb-6">
              Discover the perfect bike for every adventure, from the trails to
              the streets.
            </p>
            <a
              href="./register"
              className="inline-block bg-yellow-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            >
              Sign Up / Sign In
            </a>
          </div>
        </div>
      </section>

      <section className="h-[75vh] flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/imgMain2.jpg')` }}
        ></div>
        <div className="w-full md:w-1/2 h-full flex items-center p-8">
          <div className="text-left max-w-lg mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Mountain Biking
            </h2>
            <p className="text-lg md:text-xl text-black">
              Conquer the trails with our range of durable and high-performance
              mountain bikes.
            </p>
          </div>
        </div>
      </section>

      <section className="h-[75vh] flex flex-col md:flex-row-reverse">
        <div
          className="w-full md:w-1/2 h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/imgMain4.jpg')` }}
        ></div>
        <div className="w-full md:w-1/2 h-full flex items-center p-8">
          <div className="text-left max-w-lg mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Eco-Friendly Adventures
            </h2>
            <p className="text-lg md:text-xl text-black">
              Explore the world sustainably. Our planet-friendly bikes are
              perfect for green commuting.
            </p>
          </div>
        </div>
      </section>

      <section className="h-[75vh] flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/imgMain3.jpg')` }}
        ></div>
        <div className="w-full md:w-1/2 h-full flex items-center p-8">
          <div className="text-left max-w-lg mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Road Biking
            </h2>
            <p className="text-lg md:text-xl text-black">
              Speed through the city or countryside with our top-of-the-line
              road bikes, built for endurance.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Elsy Ride. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
