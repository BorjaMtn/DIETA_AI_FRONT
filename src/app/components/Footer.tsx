// components/Footer.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-theme-primary)] text-[var(--color-theme-background)] py-12 text-center">
      <p className="mb-4 text-lg">© 2025 NutriApp. Todos los derechos reservados.</p>
      <div className="flex justify-center gap-6">
        <Link href="https://twitter.com" target="_blank" className="hover:text-[var(--color-theme-success)]">Twitter</Link>
        <Link href="https://facebook.com" target="_blank" className="hover:text-[var(--color-theme-success)]">Facebook</Link>
        <Link href="https://instagram.com" target="_blank" className="hover:text-[var(--color-theme-success)]">Instagram</Link>
      </div>
    </footer>
  );
};

export default Footer;
