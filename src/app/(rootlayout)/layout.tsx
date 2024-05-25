"use client";

import React, { ReactNode } from "react";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import PetsPage from "../components/PetsPage";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <RegistrationForm />
        <LoginForm />
        <PetsPage />
      </div>
      {children}
    </div>
  );
}

export default RootLayout;
