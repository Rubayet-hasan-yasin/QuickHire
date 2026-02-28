'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { getJobs } from '../../lib/api';
import { Job } from '../../types/job';
import { FiLoader } from 'react-icons/fi';

const TAG_STYLES: Record<string, string> = {
    'Full-Time': 'text-[#56CDAD] border-[#56CDAD]/50 bg-[#56CDAD]/5',
    Marketing: 'text-[#FFB836] border-[#FFB836]/50 bg-[#FFB836]/5',
    Design: 'text-[#4640DE] border-[#4640DE]/50 bg-[#4640DE]/5',
    Engineering: 'text-[#4640DE] border-[#4640DE]/50 bg-[#4640DE]/5',
    Sales: 'text-[#FFB836] border-[#FFB836]/50 bg-[#FFB836]/5',
    Product: 'text-[#56CDAD] border-[#56CDAD]/50 bg-[#56CDAD]/5',
    Technology: 'text-[#FF6550] border-[#FF6550]/50 bg-[#FF6550]/5',
};

export const LatestJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentJobs = async () => {
            try {
                // Latest Jobs mapping -> fetch jobs and slice first 8
                const res = await getJobs();
                if (res.data) {
                    setJobs(res.data.slice(0, 8));
                }
            } catch (err) {
                console.error("Failed to fetch latest jobs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentJobs();
    }, []);

    return (
        <section className="py-20 md:py-24 bg-[#F8F8FD]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#25324B]">
                        Latest <span className="text-[#26A4FF]">jobs open</span>
                    </h2>
                    <Link href="/jobs" className="flex items-center gap-2 text-[#4640DE] font-semibold hover:gap-3 transition-all text-base border-b border-transparent hover:border-[#4640DE]">
                        Show all jobs
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 relative z-10">
                        <FiLoader className="w-10 h-10 text-[#4640DE] animate-spin" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12 text-[#515B6F] relative z-10">No latest jobs available right now.</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                        {jobs.map((job) => (
                            <Link
                                href={`/jobs/${job._id}`}
                                key={job._id}
                                className="flex items-center gap-6 p-6 md:p-8 bg-white border border-gray-100 hover:border-[#4640DE]/30 hover:shadow-[0_8px_20px_rgba(70,64,222,0.08)] transition-all cursor-pointer group"
                            >
                                {/* Logo Area */}
                                <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                                    <Image
                                        src="/assets/Company Logo.png"
                                        alt={`${job.company} logo`}
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content Area */}
                                <div className="flex flex-col grow overflow-hidden">
                                    <h4 className="font-heading font-semibold text-xl text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-2 truncate">
                                        {job.title}
                                    </h4>

                                    <p className="font-sans text-[#515B6F] mb-4 flex items-center gap-2 text-sm md:text-base truncate">
                                        {job.company} <span className="text-gray-400 shrink-0">•</span> <span className="truncate">{job.location}</span>
                                    </p>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-sans font-semibold text-xs md:text-sm py-1 md:py-1.5 px-3 md:px-4 rounded-full border text-[#56CDAD] border-[#56CDAD]/50 bg-[#56CDAD]/5 shrink-0">
                                            Full-Time
                                        </span>
                                        <span
                                            className={`font-sans font-semibold text-xs md:text-sm py-1 md:py-1.5 px-3 md:px-4 rounded-full border shrink-0 ${TAG_STYLES[job.category] || 'text-gray-600 border-gray-200 bg-gray-50'}`}
                                        >
                                            {job.category}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
