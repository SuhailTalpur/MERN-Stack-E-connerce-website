import React, { useState } from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { ClipLoader } from 'react-spinners';
import { BsCart2 } from "react-icons/bs";

function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="text-gray-400 body-font bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        {/* Logo & Hamburger */}
        <div className="flex justify-between w-full md:w-auto items-center">
          <a href='/' className="flex title-font font-medium items-center text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none ml-auto transition duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>


        <div
          className={`w-full md:flex md:items-center md:space-x-6 md:w-auto overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0 md:max-h-full'
            }`}
        >
          <nav className="flex flex-col md:flex-row text-base md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
            <a href="/" className="hover:text-white block transition duration-300">
              Home
            </a>
            <a href="/Menfashion" className="hover:text-white block transition duration-300">
              Men
            </a>
            <a href="/Womenfashion" className="hover:text-white block transition duration-300">
              Women
            </a>
            <a href="#" className="hover:text-white block transition duration-300">
              KIds
            </a>
          </nav>


          <div className="mt-4 md:mt-0">
            {!isLoaded ? (
              <ClipLoader color="#a78bfa" size={28} />
            ) : isSignedIn ? (
              <div className='flex items-center space-x-4'>
                  <UserButton afterSignOutUrl="/" />          
                <a href="/cart" className='text-gray-300 text-lg hover:text-purple-500 cursor-pointer transition duration-300'>
                  <BsCart2 />
                </a>
              </div>

            ) : (
              <SignInButton>
                <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base cursor-pointer transition duration-300">
                  Sign In
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
