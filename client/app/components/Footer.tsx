import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';
import { FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-[#202430] text-white py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8 mb-12">
                    {/* Brand & Info */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5">
                            <Image
                                src="/assets/logo.svg"
                                alt="QuickHire Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                            <span className="font-heading font-bold text-2xl">
                                QuickHire
                            </span>
                        </Link>
                        <p className="text-[#D6DDEB] font-sans text-base leading-relaxed max-w-70">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 lg:col-span-2">
                        {/* Links: About */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h4 className="font-heading font-semibold text-lg">About</h4>
                            <div className="flex flex-col gap-4">
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Companies</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Pricing</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Terms</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Advice</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Privacy Policy</Link>
                            </div>
                        </div>

                        {/* Links: Resources */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h4 className="font-heading font-semibold text-lg">Resources</h4>
                            <div className="flex flex-col gap-4">
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Help Docs</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Guide</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Updates</Link>
                                <Link href="#" className="text-[#D6DDEB] font-sans text-base hover:text-white transition-colors">Contact Us</Link>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2">
                        <h4 className="font-heading font-semibold text-lg">Get job notifications</h4>
                        <p className="text-[#D6DDEB] font-sans text-base leading-relaxed">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <div className="flex flex-col md:flex-row gap-2 w-full mt-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white text-[#515B6F] placeholder:text-[#A8ADB7] px-4 py-3 rounded-none text-base w-full font-sans focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                            />
                            <Button variant="primary" className="w-full md:w-auto px-6 py-3 rounded-none font-bold bg-[#4640DE] hover:bg-[#3733B1]">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mt-16">
                    <p className="text-[#D6DDEB]/70 font-sans text-sm order-2 md:order-1 text-center md:text-left">
                        2021 © QuickHire. All rights reserved.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-4 text-[#D6DDEB] order-1 md:order-2">
                        <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-white transition-all">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-white transition-all">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-white transition-all">
                            <FaDribbble className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-white transition-all">
                            <FaLinkedinIn className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-white transition-all">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
