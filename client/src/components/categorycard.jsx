import React from "react";
function CategoryCard({image, subtitle, title, description}) {
    return (
<div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={image} alt="content"/>
          <h3 class="tracking-widest text-purple-400 text-xs font-medium title-font">{subtitle}</h3>
          <h2 class="text-lg text-white font-medium title-font mb-4">{title}</h2>
          <p class="leading-relaxed text-base">{description}</p>
        </div>
      </div>
    )
}

export default CategoryCard;