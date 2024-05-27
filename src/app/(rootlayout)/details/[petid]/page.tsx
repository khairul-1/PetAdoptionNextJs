"use client";
import PetCardDetails from "@/app/components/PetCardDetails";
import PrivateRoute from "@/app/components/PrivateRoute";
import React from "react";

function DetailsPetId({ params }: { params: { petId: string } }) {
  //   console.log(params.petid);
  return (
    <div>
      <PetCardDetails key={params.petid} petId={params.petid} />
    </div>
  );
}

export default PrivateRoute(DetailsPetId);
