import { useState } from "react";
import Logo from "../assets/logo v2 nobg.png";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg w-full z-50 top-0 start-0 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg sticky">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <img
            src={Logo}
            width={100}
            height={120}
            alt="EncryptShare Logo"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative py-1.5 px-1 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Aboutus"
                className={({ isActive }) =>
                  `relative py-1.5 px-1 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app"
                className={({ isActive }) =>
                  `relative py-1.5 px-1 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Send File
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/download"
                className={({ isActive }) =>
                  `relative py-1.5 px-1 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                File Download
              </NavLink>
            </li>

            <SignedIn>
              <li>
                <NavLink
                  to="/file-history"
                  className={({ isActive }) =>
                    `relative py-1.5 px-1 text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                      isActive ? "after:scale-x-100" : ""
                    }`
                  }
                >
                  File History
                </NavLink>
              </li>
            </SignedIn>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <SignedOut>
            <div className="hidden md:flex items-center space-x-2">
              <SignInButton className="relative px-4 py-2 text-blue-600 bg-transparent border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Sign In
              </SignInButton>
              <SignUpButton className="relative px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Sign Up
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/app"
                className="relative px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Go To App</span>
              </Link>
              <div className="scale-100">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 rounded-full ring-2 ring-blue-500 ring-offset-2 hover:ring-blue-600 transition-all duration-300",
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-9 h-9 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <span
                className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {/* Mobile Navigation Links */}
          <ul className="space-y-3 mb-4">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                🏠 Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Aboutus"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                👥 About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                📤 Send File
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/download"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                📥 File Download
              </NavLink>
            </li>
          </ul>

          {/* Mobile Auth Buttons */}
          <SignedOut>
            <div className="space-y-2">
              <SignInButton className="w-full py-2.5 px-3 text-blue-600 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300">
                Sign In
              </SignInButton>
              <SignUpButton className="w-full py-2.5 px-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300">
                Sign Up
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-2">
              <Link
                to="/app"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 px-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>🚀</span>
                <span>Go To App</span>
              </Link>
              <div className="flex justify-center pt-1">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2",
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
