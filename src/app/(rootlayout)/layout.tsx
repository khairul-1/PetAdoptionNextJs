"use client";

import React, { ReactNode } from "react";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import PetsPage from "../components/PetsPage";
import UserProfileUpdate from "../components/UserProfileUpdate";
import ChangePassword from "../components/ChangePassword";
import UserPetProfile from "../components/UserPetProfile";
import UpdateUserStatus from "../components/UpdateUserStatus";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <UpdateUserStatus />
        <UserPetProfile />
        <ChangePassword />
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
