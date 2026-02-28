"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './Button';

export const Hero = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Any Location");
    const locations = ["Any Location", "Florence, Italy", "New York, USA", "London, UK", "Berlin, Germany", "Paris, France"];
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedLocation && selectedLocation !== "Any Location") params.set('location', selectedLocation);

        router.push(`/jobs?${params.toString()}`);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="bg-[#F8F8FD] pt-20 md:pt-32 pb-8 md:pb-0 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-225 h-175 opacity-100 pointer-events-none z-0 translate-x-32 -translate-y-10 lg:block hidden">
                <Image
                    src="/assets/Pattern.svg"
                    alt="Background pattern"
                    width={997}
                    height={794}
                    className="w-full h-full object-contain"
                    priority
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="flex flex-col gap-6 md:pb-32">

                    <h1 className="font-heading font-semibold text-5xl md:text-7xl leading-[1.1] text-[#25324B]">
                        Discover <br />
                        more than <br />
                        <span className="text-[#26A4FF] relative inline-block">
                            5000+ Jobs
                            {/* Underline decoration from Vector.svg */}
                            <div className="absolute left-0 w-[105%] pointer-events-none">
                                <Image
                                    src="/assets/Vector.svg"
                                    alt=""
                                    width={455}
                                    height={33}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </span>
                    </h1>
                    <p className="text-[#515B6F] font-sans text-lg md:text-xl leading-relaxed mt-4 md:mt-8 max-w-lg">
                        Great platform for the job seeker that searching for new career heights and passionate about startups.
                    </p>

                    {/* Search Box */}
                    <div className="mt-8 md:mt-10 bg-white p-2 rounded-md shadow-sm flex flex-col md:flex-row gap-0 items-stretch relative z-20 max-w-2xl border border-gray-100">
                        <div className="flex-[1.5] flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full font-sans text-base text-[#25324B] placeholder:text-gray-400 focus:outline-none bg-transparent"
                            />
                        </div>

                        {/* Custom Location Dropdown */}
                        <div
                            className="flex-1 flex items-center gap-3 px-4 py-3 relative cursor-pointer"
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                            ref={dropdownRef}
                        >
                            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>

                            <div className="w-full font-sans text-[#25324B] text-base select-none truncate pr-6">
                                {selectedLocation === "Any Location" ? "Location" : selectedLocation}
                            </div>

                            <div className={`absolute right-4 text-gray-400 flex items-center transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>

                            {/* Dropdown */}
                            {isLocationOpen && (
                                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-md shadow-[0_8px_30px_rgba(32,36,48,0.12)] border border-gray-100 py-2 z-50 max-h-60 overflow-y-auto">
                                    {locations.map((loc) => (
                                        <div
                                            key={loc}
                                            className={`px-4 py-2.5 font-sans text-base cursor-pointer transition-colors flex items-center justify-between ${selectedLocation === loc
                                                ? 'bg-blue-50 text-[#4640DE] font-semibold'
                                                : 'text-[#515B6F] hover:bg-gray-50'
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedLocation(loc);
                                                setIsLocationOpen(false);
                                            }}
                                        >
                                            {loc}
                                            {selectedLocation === loc && (
                                                <svg className="w-4 h-4 text-[#4640DE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleSearch}
                            className="w-full md:w-auto px-8 py-3 rounded md:ml-2 text-base font-bold bg-[#4640DE] hover:bg-[#3733B1]"
                        >
                            Search my job
                        </Button>
                    </div>

                    <p className="text-base font-sans text-[#515B6F] mt-2">
                        <span className="font-semibold text-[#25324B]">Popular :</span> UI Designer, UX Researcher, Android, Admin
                    </p>
                </div>

                {/* Hero Image - Person */}
                <div className="relative h-full hidden lg:block self-end mt-12">

                    <div className="relative z-10 flex justify-center items-end h-150 xl:h-162 overflow-visible">
                        <Image
                            src="/assets/person.png"
                            alt="Professional looking for a job"
                            width={800}
                            height={900}
                            className="w-auto h-full object-contain object-bottom transform translate-y-6"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
