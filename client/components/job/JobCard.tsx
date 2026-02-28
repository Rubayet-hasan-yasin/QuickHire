import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types/job';

const TAG_STYLES: Record<string, string> = {
    'Technology':       'text-[#4640DE] bg-[#EDECFC]',
    'Design':           'text-[#E05C2A] bg-[#FCF0EB]',
    'Marketing':        'text-[#0BA02C] bg-[#E7F6EA]',
    'Finance':          'text-[#FFB836] bg-[#FEF6E7]',
    'Healthcare':       'text-[#4640DE] bg-[#EDECFC]',
    'Engineering':      'text-[#E05C2A] bg-[#FCF0EB]',
    'Education':        'text-[#0BA02C] bg-[#E7F6EA]',
    'Sales':            'text-[#FFB836] bg-[#FEF6E7]',
    'Human Resources':  'text-[#4640DE] bg-[#EDECFC]',
    'Customer Service': 'text-[#0BA02C] bg-[#E7F6EA]',
};

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <Link
            href={`/jobs/${job._id}`}
            key={job._id}
            className="group flex flex-col p-6 bg-white border border-gray-200 hover:border-[#4640DE]/30 hover:shadow-[0_8px_20px_rgba(70,64,222,0.08)] transition-all cursor-pointer"
        >
            {/* Header: logo + type badge */}
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
                <span className="text-[#4640DE] border border-[#4640DE] font-semibold text-xs py-1.5 px-3">
                    Full Time
                </span>
            </div>

            {/* Title */}
            <h4 className="font-semibold text-lg text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-2 line-clamp-1">
                {job.title}
            </h4>

            {/* Company · Location */}
            <p className="text-sm text-[#515B6F] mb-4 line-clamp-1">
                {job.company} <span className="mx-1">•</span> {job.location}
            </p>

            {/* Description */}
            <p className="text-sm text-[#7C8493] leading-relaxed mb-6 grow line-clamp-2">
                {job.description}
            </p>

            {/* Category tag */}
            <div className="flex items-center gap-2 flex-wrap mt-auto">
                <span className={`font-semibold text-xs py-1 px-3 rounded-full ${TAG_STYLES[job.category] || 'text-gray-600 bg-gray-100'}`}>
                    {job.category}
                </span>
            </div>
        </Link>
    );
};

export default JobCard;
