import React from "react";
import { Card } from "flowbite-react";

function card({image, category, name, price, onClick}) {
  return (
    <div
      onClick={onClick}
      className="sm:w-52 lg:w-64 w-58  p-4 m-2 rounded-lg border-1 border-purple-700 cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-shadow delay-25 duration-150"
    >
      <div className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image} />
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
        <h2 className="text-white title-font text-lg font-medium">{name}</h2>
        <p className="mt-1 text-white/70">${price}</p>
      </div>
    </div>
  );
}

export default card