'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { getJobs } from '../../lib/api';
import { Job } from '../../types/job';
import { FiLoader } from 'react-icons/fi';

const TAG_STYLES: Record<string, string> = {
    Marketing: 'text-[#FFB836] bg-[#FFB836]/10',
    Design: 'text-[#56CDAD] bg-[#56CDAD]/10',
    Business: 'text-[#4640DE] bg-[#4640DE]/10',
    Technology: 'text-[#FF6550] bg-[#FF6550]/10',
    Engineering: 'text-[#4640DE] bg-[#4640DE]/10',
    Sales: 'text-[#FFB836] bg-[#FFB836]/10',
    Product: 'text-[#56CDAD] bg-[#56CDAD]/10'
};

export const FeaturedJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentJobs = async () => {
            try {
                // Fetching all jobs; mimicking "Featured" by taking the first 8 
                const res = await getJobs();
                if (res.data) {
                    setJobs(res.data.slice(0, 8));
                }
            } catch (err) {
                console.error("Failed to fetch featured jobs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentJobs();
    }, []);

    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#25324B]">
                        Featured <span className="text-[#26A4FF]">jobs</span>
                    </h2>
                    <Link href="/jobs" className="flex items-center gap-2 text-[#4640DE] font-semibold hover:gap-3 transition-all text-base border-b border-transparent hover:border-[#4640DE]">
                        Show all jobs
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FiLoader className="w-10 h-10 text-[#4640DE] animate-spin" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12 text-[#515B6F]">No featured jobs available right now.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {jobs.map((job) => (
                            <Link href={`/jobs/${job._id}`} key={job._id} className="group flex flex-col p-6 bg-white border border-gray-200 hover:border-[#4640DE]/30 hover:shadow-[0_8px_20px_rgba(70,64,222,0.08)] transition-all cursor-pointer">

                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded overflow-hidden">
                                        <Image
                                            src="/assets/Company Logo.png"
                                            alt={`${job.company} logo`}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-[#4640DE] border border-[#4640DE] font-sans font-semibold text-xs py-1.5 px-3">
                                        Full Time
                                    </span>
                                </div>

                                <h4 className="font-heading font-semibold text-lg text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-2 line-clamp-1">
                                    {job.title}
                                </h4>

                                <p className="font-sans text-sm text-[#515B6F] mb-4 line-clamp-1">
                                    {job.company} <span className="mx-1">•</span> {job.location}
                                </p>

                                <p className="font-sans text-sm text-[#7C8493] leading-relaxed mb-6 grow line-clamp-2">
                                    {job.description}
                                </p>

                                <div className="flex items-center gap-2 flex-wrap mt-auto">
                                    <span
                                        className={`font-sans font-semibold text-xs py-1 px-3 rounded-full ${TAG_STYLES[job.category] || 'text-gray-600 bg-gray-100'}`}
                                    >
                                        {job.category}
                                    </span>
                                </div>

                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
