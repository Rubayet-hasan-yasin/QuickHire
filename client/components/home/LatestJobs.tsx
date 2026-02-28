import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

const TAG_STYLES: Record<string, string> = {
    'Full-Time': 'text-[#56CDAD] border-[#56CDAD]/50 bg-[#56CDAD]/5',
    Marketing: 'text-[#FFB836] border-[#FFB836]/50 bg-[#FFB836]/5',
    Design: 'text-[#4640DE] border-[#4640DE]/50 bg-[#4640DE]/5',
};

const LATEST_JOBS = [
    {
        id: '1',
        company: 'Nomad',
        location: 'Paris, France',
        title: 'Social Media Assistant',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '2',
        company: 'Netlify',
        location: 'Paris, France',
        title: 'Social Media Assistant',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '3',
        company: 'Dropbox',
        location: 'San Fransisco, USA',
        title: 'Brand Designer',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '4',
        company: 'Maze',
        location: 'San Fransisco, USA',
        title: 'Brand Designer',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '5',
        company: 'Terraform',
        location: 'Hamburg, Germany',
        title: 'Interactive Developer',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '6',
        company: 'Udacity',
        location: 'Hamburg, Germany',
        title: 'Interactive Developer',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '7',
        company: 'Packer',
        location: 'Lucern, Switzerland',
        title: 'HR Manager',
        tags: ['Full-Time', 'Marketing', 'Design'],
    },
    {
        id: '8',
        company: 'Webflow',
        location: 'Lucern, Switzerland',
        title: 'HR Manager',
        tags: ['Full-Time', 'Marketing', 'Design'],
    }
];

export const LatestJobs = () => {
    return (
        <section className="py-20 md:py-24 bg-[#F8F8FD]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                {/* Background diagonal lines (optional decorative touch mimicking the design background if needed, else we keep it clean) */}

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#25324B]">
                        Latest <span className="text-[#26A4FF]">jobs open</span>
                    </h2>
                    <Link href="#" className="flex items-center gap-2 text-[#4640DE] font-semibold hover:gap-3 transition-all text-base border-b border-transparent hover:border-[#4640DE]">
                        Show all jobs
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                    {LATEST_JOBS.map((job) => (
                        <div
                            key={job.id}
                            className="flex items-center gap-6 p-6 md:p-8 bg-white border border-gray-100 hover:border-[#4640DE]/30 hover:shadow-[0_8px_20px_rgba(70,64,222,0.08)] transition-all cursor-pointer group"
                        >
                            {/* Logo Area */}
                            <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-white rounded-lg">
                                <Image
                                    src="/assets/Company Logo.png"
                                    alt={`${job.company} logo`}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>

                            {/* Content Area */}
                            <div className="flex flex-col grow">
                                <h4 className="font-heading font-semibold text-xl text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-2">
                                    {job.title}
                                </h4>

                                <p className="font-sans text-[#515B6F] mb-4 flex items-center gap-2 text-sm md:text-base">
                                    {job.company} <span className="text-gray-400">•</span> {job.location}
                                </p>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {job.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className={`font-sans font-semibold text-xs md:text-sm py-1 md:py-1.5 px-3 md:px-4 rounded-full border ${TAG_STYLES[tag] || 'text-gray-600 border-gray-200 bg-gray-50'}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
