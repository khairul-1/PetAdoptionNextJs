import React, { ReactNode } from "react";
import RegistrationForm from "../components/RegistrationForm";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <RegistrationForm />
      </div>
      {children}
    </div>
  );
}

export default RootLayout;
