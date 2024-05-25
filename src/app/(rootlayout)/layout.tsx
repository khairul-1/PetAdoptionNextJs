"use client";

import React, { ReactNode } from "react";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <RegistrationForm />
        <LoginForm />
      </div>
      {children}
    </div>
  );
}

export default RootLayout;
