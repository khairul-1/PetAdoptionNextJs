import React, { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2">
      DashboardLayout
      <div className="bg-sky-400">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
