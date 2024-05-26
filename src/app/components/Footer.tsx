import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>Contact: contact@petadoption.com | +1 (123) 456-7890</p>
        <div className="space-x-4">
          <a href="#" className="text-blue-400">
            Facebook
          </a>
          <a href="#" className="text-blue-400">
            Twitter
          </a>
          <a href="#" className="text-blue-400">
            Instagram
          </a>
        </div>
        <p>&copy; 2024 PetAdoption. All rights reserved.</p>
        <p>
          <Link href="/terms" passHref>
            Terms of Use
          </Link>{" "}
          |{" "}
          <Link href="/privacy" passHref>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
