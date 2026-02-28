"use client";

import React, { useState, useEffect, use } from 'react';
import { getJobById } from '../../../lib/api';
import { Job } from '../../../types/job';
import ApplyForm from '../../../components/job/ApplyForm';
import { FiMapPin, FiBriefcase, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface JobDetailsProps {
    params: Promise<{ id: string }>;
}

export default function JobDetailsPage({ params }: JobDetailsProps) {
    const { id } = use(params);

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await getJobById(id);
                setJob(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to fetch job details.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start pt-24 animate-pulse">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="flex gap-4">
                            <div className="h-8 w-32 bg-gray-100 rounded-full"></div>
                            <div className="h-8 w-32 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="space-y-3 pt-6">
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start pt-24">
                <div className="max-w-xl w-full text-center space-y-6">
                    <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 shadow-sm">
                        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
                        <p className="font-medium text-red-500 mb-6">{error || "This position may have been filled or removed."}</p>
                        <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FiArrowLeft /> Back to all jobs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Back Navigation */}
                <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors gap-2">
                    <FiArrowLeft className="h-4 w-4" /> Back to job search
                </Link>

                {/* Job Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                {job.title}
                            </h1>
                            <p className="text-xl font-medium text-blue-600">{job.company}</p>
                        </div>
                        {/* Desktop Apply Button Anchor */}
                        <div className="hidden md:block">
                            <a href="#apply" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors block text-center">
                                Apply Now
                            </a>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                            <FiMapPin className="text-gray-400 h-5 w-5" />
                            <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                            <FiBriefcase className="text-gray-400 h-5 w-5" />
                            <span className="font-medium">{job.category}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                            <FiCalendar className="text-gray-400 h-5 w-5" />
                            <span className="font-medium">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Job Description section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About the role</h2>
                    <div className="prose prose-blue prose-lg max-w-none text-gray-600">
                        {/* Quick mock formatting handling line breaks safely */}
                        {job.description.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div id="apply" className="scroll-mt-8">
                    <ApplyForm jobId={job._id} />
                </div>

            </div>
        </div>
    );
}