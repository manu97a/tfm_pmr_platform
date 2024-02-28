import SensorFormulario from "@/components/SensorFormulario";
import React from "react";

const page = () => {
  return (
    <>
        <div className="container max-w-full text-center bg-gray-50 font-light mx-auto p-8">
            <h3 className="text-white">Agrega un nuevo sensor:</h3>
            <SensorFormulario/>
        </div>
    </>
  );
};

export default page;
