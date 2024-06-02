"use client";
// import PetCardDetails from "@/app/components/PetCardDetails";
import PrivateRoute from "@/app/components/PrivateRoute";
import React from "react";

function PetsPetId({ params }: { params: { petId: string } }) {
  //   console.log(params.petId);
  return <div>{params.petId}</div>;
}

export default PrivateRoute(PetsPetId);
