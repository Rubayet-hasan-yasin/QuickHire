import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

const TAG_STYLES: Record<string, string> = {
    Marketing: 'text-[#FFB836] bg-[#FFB836]/10',
    Design: 'text-[#56CDAD] bg-[#56CDAD]/10',
    Business: 'text-[#4640DE] bg-[#4640DE]/10',
    Technology: 'text-[#FF6550] bg-[#FF6550]/10',
};

const FEATURED_JOBS = [
    {
        id: '1',
        company: 'Revolut',
        location: 'Madrid, Spain',
        title: 'Email Marketing',
        description: 'Revolut is looking for Email Marketing to help team ma...',
        tags: ['Marketing', 'Design'],
    },
    {
        id: '2',
        company: 'Dropbox',
        location: 'San Fransisco, US',
        title: 'Brand Designer',
        description: 'Dropbox is looking for Brand Designer to help the team t...',
        tags: ['Design', 'Business'],
    },
    {
        id: '3',
        company: 'Pitch',
        location: 'Berlin, Germany',
        title: 'Email Marketing',
        description: 'Pitch is looking for Customer Manager to join marketing t...',
        tags: ['Marketing'],
    },
    {
        id: '4',
        company: 'Blinkist',
        location: 'Granada, Spain',
        title: 'Visual Designer',
        description: 'Blinkist is looking for Visual Designer to help team desi...',
        tags: ['Design'],
    },
    {
        id: '5',
        company: 'ClassPass',
        location: 'Manchester, UK',
        title: 'Product Designer',
        description: 'ClassPass is looking for Product Designer to help us...',
        tags: ['Marketing', 'Design'],
    },
    {
        id: '6',
        company: 'Canva',
        location: 'Ontario, Canada',
        title: 'Lead Designer',
        description: 'Canva is looking for Lead Engineer to help develop n...',
        tags: ['Design', 'Business'],
    },
    {
        id: '7',
        company: 'GoDaddy',
        location: 'Marseille, France',
        title: 'Brand Strategist',
        description: 'GoDaddy is looking for Brand Strategist to join the team...',
        tags: ['Marketing'],
    },
    {
        id: '8',
        company: 'Twitter',
        location: 'San Diego, US',
        title: 'Data Analyst',
        description: 'Twitter is looking for Data Analyst to help team desi...',
        tags: ['Technology'],
    }
];

export const FeaturedJobs = () => {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#25324B]">
                        Featured <span className="text-[#26A4FF]">jobs</span>
                    </h2>
                    <Link href="#" className="flex items-center gap-2 text-[#4640DE] font-semibold hover:gap-3 transition-all text-base border-b border-transparent hover:border-[#4640DE]">
                        Show all jobs
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_JOBS.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col p-6 bg-white border border-gray-200 hover:border-[#4640DE]/30 hover:shadow-[0_8px_20px_rgba(70,64,222,0.08)] transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded">
                                    <Image
                                        src="/assets/Company Logo.png"
                                        alt={`${job.company} logo`}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[#4640DE] border border-[#4640DE] font-sans font-semibold text-xs py-1.5 px-3">
                                    Full Time
                                </span>
                            </div>

                            <h4 className="font-heading font-semibold text-lg text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-2">
                                {job.title}
                            </h4>

                            <p className="font-sans text-sm text-[#515B6F] mb-4">
                                {job.company} <span className="mx-1">•</span> {job.location}
                            </p>

                            <p className="font-sans text-sm text-[#7C8493] leading-relaxed mb-6 grow">
                                {job.description}
                            </p>

                            <div className="flex items-center gap-2 flex-wrap mt-auto">
                                {job.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className={`font-sans font-semibold text-xs py-1 px-3 rounded-full ${TAG_STYLES[tag] || 'text-gray-600 bg-gray-100'}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
