"use client";

import React, { ReactNode } from "react";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import PetsPage from "../components/PetsPage";
import UserProfileUpdate from "../components/UserProfileUpdate";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <UserProfileUpdate />
        <RegistrationForm />
        <LoginForm />
        <PetsPage />
      </div>
      {children}
    </div>
  );
}

export default RootLayout;
