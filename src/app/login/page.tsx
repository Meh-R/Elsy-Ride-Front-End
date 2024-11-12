"use client";

import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <div>
      <LoginForm />
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

export default page;
