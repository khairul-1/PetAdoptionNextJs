// components/AboutUs.tsx

import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mission Statement</h2>
          <p className="text-gray-700">
            Our mission is to connect pets in need with loving homes and caring
            owners. We strive to provide a platform where pet adoption is made
            easier and where pets can find their forever families.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
          <p className="text-gray-700">
            Our dedicated team consists of passionate individuals who share a
            common love for animals and a commitment to animal welfare.
            Together, we work tirelessly to improve the lives of pets and
            promote responsible pet ownership.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-2">Email: contact@petadoption.com</p>
          <p className="text-gray-700 mb-2">Phone: +1 (123) 456-7890</p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Facebook
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Twitter
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
