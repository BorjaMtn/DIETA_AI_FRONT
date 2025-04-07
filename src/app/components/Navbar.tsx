'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDietOpen, setIsDietOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let dietTimeout: NodeJS.Timeout;
  let profileTimeout: NodeJS.Timeout;

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          <Link href="/">Logo</Link>
        </div>

        {/* Menú - Desktop */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Inicio</Link>
          <Link href="/screens/about" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Acerca de</Link>
          <Link href="/screens/services" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Servicios</Link>
          <Link href="/screens/food" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Comida</Link>

          {/* Dropdown - Dietas */}
          <div 
            className="relative"
            onMouseEnter={() => {
              clearTimeout(dietTimeout);
              setIsDietOpen(true);
            }}
            onMouseLeave={() => {
              dietTimeout = setTimeout(() => setIsDietOpen(false), 200);
            }}
          >
            <button className="text-white  hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">
              Dietas
            </button>
            {isDietOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg">
                <Link href="/screens/diet-plan/list" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Mis Planes</Link>
                <Link href="/screens/diet-plan/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Crear Plan</Link>
                <Link href="/screens/diet-recommendation/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Obtener Recomendación</Link>
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          {isAuthenticated ? (
            <div 
              className="relative"
              onMouseEnter={() => {
                clearTimeout(profileTimeout);
                setIsProfileOpen(true);
              }}
              onMouseLeave={() => {
                profileTimeout = setTimeout(() => setIsProfileOpen(false), 200);
              }}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaUserCircle size={24} className="text-indigo-300" />
                <span className="text-white font-semibold">Perfil</span>
              </div>

              {/* Avatar Dropdown */}
              {isProfileOpen && (
                <div className="absolute mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg">
                  <Link href="/screens/profile" className="block px-4 py-2 text-left hover:bg-indigo-600 transition-all">Mis Datos</Link>
                  <button onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }} className="block px-4 py-2 text-left w-full hover:bg-indigo-600 transition-all">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link href="/screens/login" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Login</Link>
              <Link href="/screens/register" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Registro</Link>
            </div>
          )}
        </div>

        {/* Menú - Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <HiX size={30} className="transition-all duration-300" /> : <HiMenuAlt3 size={30} className="transition-all duration-300" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
