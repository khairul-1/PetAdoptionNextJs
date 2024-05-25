import AdoptionRequest from "@/app/components/Adoption-Request";
import React from "react";

function AdoptionPetId({ params }: { params: { petId: string } }) {
  return (
    <div>
      AdoptionPetId
      <div>
        <AdoptionRequest key={params.petId} petId={params.petId} />
      </div>
    </div>
  );
}

export default AdoptionPetId;
