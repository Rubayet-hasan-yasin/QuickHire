"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="flex items-center justify-between py-6 px-6 md:px-12 max-w-7xl mx-auto w-full bg-transparent relative z-50">
            {/* Left side: Logo + Links */}
            <div className="flex items-center gap-12">
                <Link href="/" className="flex items-center gap-2.5">
                    <Image
                        src="/assets/logo.svg"
                        alt="QuickHire Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 md:w-10 md:h-10"
                    />
                    <span className="font-heading font-bold text-2xl text-[#25324B]">
                        QuickHire
                    </span>
                </Link>
                <div className="hidden lg:flex items-center gap-8 font-sans text-[#515B6F] font-medium text-base">
                    <Link href="#" className="hover:text-[#4640DE] transition-colors">Find Jobs</Link>
                    <Link href="#" className="hover:text-[#4640DE] transition-colors">Browse Companies</Link>
                </div>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
                <Link href="#" className="font-sans font-bold text-[#4640DE] hover:text-[#3733B1] text-base transition-colors px-4 py-2.5">
                    Login
                </Link>
                <div className="w-px h-8 bg-[#D6DDEB]"></div>
                <Button variant="primary" className="px-6 py-3 text-base font-bold bg-[#4640DE] hover:bg-[#3733B1] text-white">Sign Up</Button>
            </div>

            {/* Mobile Menu Icon */}
            <button className="md:hidden text-[#25324B]" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                )}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-6 md:hidden z-40">
                    <Link href="#" className="font-sans text-[#515B6F] font-medium text-lg hover:text-[#4640DE] transition-colors" onClick={toggleMobileMenu}>Find Jobs</Link>
                    <Link href="#" className="font-sans text-[#515B6F] font-medium text-lg hover:text-[#4640DE] transition-colors" onClick={toggleMobileMenu}>Browse Companies</Link>
                    <Link href="#" className="font-sans font-bold text-[#4640DE] hover:text-[#3733B1] text-lg transition-colors" onClick={toggleMobileMenu}>
                        Login
                    </Link>
                    <Button variant="primary" className="px-8 py-3 text-lg font-bold bg-[#4640DE] hover:bg-[#3733B1] text-white" onClick={toggleMobileMenu}>Sign Up</Button>
                </div>
            )}
        </nav>
    );
};
