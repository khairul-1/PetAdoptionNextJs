import Link from "next/link";
import React from "react";

function DashboardPage() {
  return (
    <div>
      DashboardPage
      <div>
        <Link href="/about">about</Link>
      </div>
    </div>
  );
}

export default DashboardPage;
