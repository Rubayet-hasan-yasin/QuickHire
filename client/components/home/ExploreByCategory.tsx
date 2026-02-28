import React from 'react';
import Link from 'next/link';
import { FiBarChart, FiMonitor, FiCreditCard } from 'react-icons/fi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineDesignServices } from 'react-icons/md';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { LuBriefcaseBusiness } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';

const CATEGORIES = [
    { title: 'Design', count: 235, icon: <MdOutlineDesignServices className="text-[40px]" /> },
    { title: 'Sales', count: 756, icon: <FiBarChart className="text-[40px]" /> },
    { title: 'Marketing', count: 140, icon: <HiOutlineSpeakerphone className="text-[40px]" />},
    { title: 'Finance', count: 325, icon: <FiCreditCard className="text-[40px]" /> },
    { title: 'Technology', count: 436, icon: <FiMonitor className="text-[40px]" /> },
    { title: 'Engineering', count: 542, icon: <IoCodeSlashOutline className="text-[40px]" /> },
    { title: 'Business', count: 211, icon: <LuBriefcaseBusiness className="text-[40px]" /> },
    { title: 'Human Resource', count: 346, icon: <FaUsers className="text-[40px]" /> },
];

export const ExploreByCategory = () => {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <h2 className="font-heading font-semibold text-4xl md:text-5xl text-[#25324B]">
                        Explore by <span className="text-[#26A4FF]">category</span>
                    </h2>
                    <Link href="/jobs" className="flex items-center gap-2 text-[#4640DE] font-semibold hover:gap-3 transition-all text-base border-b border-transparent hover:border-[#4640DE]">
                        Show all jobs
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <div
                            key={i}
                            className={`group flex flex-col items-start p-8 border transition-all duration-300 cursor-pointer hover:bg-[#4640DE] hover:border-[#4640DE] shadow-xl bg-white border-gray-200 hover:shadow-lg`}
                        >
                            <div className={`mb-8 transition-colors duration-300 group-hover:text-white text-[#4640DE]`}>
                                {cat.icon}
                            </div>

                            <h4 className={`font-heading font-semibold text-2xl mb-4 transition-colors duration-300 text-whitetext-[#25324B] group-hover:text-white`}>
                                {cat.title}
                            </h4>

                            <div className="flex items-center justify-between w-full mt-auto">
                                <span className={`font-sans text-base transition-colors duration-300 group-hover:text-white/80 text-[#515B6F]`}>
                                    {cat.count} jobs available
                                </span>
                                <BsArrowRight className={`w-6 h-6 transition-colors duration-300 group-hover:text-white text-[#25324B]`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
