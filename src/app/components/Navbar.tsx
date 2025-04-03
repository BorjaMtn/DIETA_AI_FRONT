'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDietOpen, setIsDietOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDietMenu = () => setIsDietOpen(!isDietOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

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
          <Link href="/about" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Acerca de</Link>
          <Link href="/services" className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Servicios</Link>

          {/* Dropdown - Dietas */}
          <div className="relative">
            <button
              onClick={toggleDietMenu}
              className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105"
            >
              Dietas
            </button>
            {isDietOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg transform transition-all duration-300 opacity-100 scale-100">
                <Link href="/screens/diet-plan/list" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Mis Planes</Link>
                <Link href="/screens/diet-plan/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Crear Plan</Link>
                <Link href="/screens/diet-recommendation/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Obtener Recomendación</Link>
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaUserCircle size={24} className="text-indigo-300" />
                  <span className="text-white font-semibold">Perfil</span>
                </div>
                {/* Avatar Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                  <Link href="/screens/profile" className="block px-4 py-2 text-left hover:bg-indigo-600 transition-all">Mis Datos</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-left w-full hover:bg-indigo-600 transition-all">Logout</button>
                </div>
              </div>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-6 space-y-6 transform transition-all duration-300 opacity-100 scale-100 backdrop-blur-lg">
          <Link href="/" className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Inicio</Link>
          <Link href="/about" className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Acerca de</Link>
          <Link href="/services" className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Servicios</Link>

          {/* Dropdown - Dietas */}
          <div className="relative">
            <button
              onClick={toggleDietMenu}
              className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105 w-full text-left"
            >
              Dietas
            </button>
            {isDietOpen && (
              <div className="absolute left-0 mt-2 w-full bg-gray-800 text-white shadow-lg rounded-lg transform transition-all duration-300 opacity-100 scale-100">
                <Link href="/screens/diet-plan/list" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Mis Planes</Link>
                <Link href="/screens/diet-plan/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Crear Plan</Link>
                <Link href="/screens/diet-recommendation/create" className="block px-4 py-2 hover:bg-indigo-600 transition-all">Obtener Recomendación</Link>
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          {isAuthenticated ? (
            <div className="flex flex-col space-y-4">
              <Link href="/screens/profile" className="flex items-center space-x-2 text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">
                <FaUserCircle size={20} />
                <span>Mis Datos</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-indigo-300 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link href="/screens/login" className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Login</Link>
              <Link href="/screens/register" className="text-white block hover:text-indigo-300 transition-all duration-300 transform hover:scale-105">Registro</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
