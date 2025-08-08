import React from "react";

function Category() {
    return (
<section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap">
    <div class="lg:w-2/3 mx-auto">
      <div class="flex flex-wrap w-full bg-gray-800 py-32 px-10 relative mb-4">
        <img alt="gallery" class="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div class="text-center relative z-10 w-full">
          <h2 class="text-2xl text-white font-medium title-font mb-2">Women's Fashion</h2>
          <p class="leading-relaxed">Explore our latest collection of women's fashion.</p>
          <a class="mt-3 text-purple-300 inline-flex items-center cursor-pointer">Explore
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2">
        <div class="px-2 w-1/2">
          <div class="flex flex-wrap w-full bg-gray-800 sm:py-24 py-16 sm:px-10 px-6 relative">
            <img alt="gallery" class="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div class="text-center relative z-10 w-full"> 
              <h2 class="text-xl text-white font-medium title-font mb-2">Men's Fashion</h2>
              <p class="leading-relaxed">Explore our latest collection of men's fashion.</p>
              <a href="/Menfashion" class="mt-3 text-purple-300 inline-flex items-center cursor-pointer">Explore
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="px-2 w-1/2">
          <div class="flex flex-wrap w-full bg-gray-800 sm:py-24 py-16 sm:px-10 px-6 relative">
            <img alt="gallery" class="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://plus.unsplash.com/premium_photo-1669613319684-f026577ed10d?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div class="text-center relative z-10 w-full">
              <h2 class="text-xl text-white font-medium title-font mb-2">Kids' Fashion</h2>
              <p class="leading-relaxed">Explore our latest collection of kids' fashion.</p>
              <a class="mt-3 text-purple-300 inline-flex items-center cursor-pointer">Explore
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default Category;