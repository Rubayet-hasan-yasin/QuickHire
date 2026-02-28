"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getJobs } from '../../lib/api';
import JobCard from '../../components/job/JobCard';
import { Job } from '../../types/job';
import { FiSearch, FiMapPin, FiBriefcase, FiLoader } from 'react-icons/fi';


function JobsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [location, setLocation] = useState(searchParams.get('location') || '');

    
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce the search input by 300ms
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (category) params.set('category', category);
        if (location) params.set('location', location);

        const queryString = params.toString();
        const newUrl = queryString ? `/jobs?${queryString}` : '/jobs';

        router.replace(newUrl, { scroll: false });
    }, [debouncedSearch, category, location, router]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getJobs({
                    search: debouncedSearch || undefined,
                    category: category || undefined,
                    location: location || undefined,
                });
                setJobs(response.data || []);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to fetch jobs");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [debouncedSearch, category, location]);

    return (
        <div className="min-h-screen bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
                        Find your next <span className="text-blue-600">dream job</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Browse through thousands of job openings and discover the perfect opportunity for your career.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">

                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-1 md:flex-none">
                        {/* Category Select */}
                        <div className="relative flex-1 sm:w-48">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiBriefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Product">Product</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>

                        {/* Location Select (Mock data for now) */}
                        <div className="relative flex-1 sm:w-48">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 appearance-none"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Any Location</option>
                                <option value="Remote">Remote</option>
                                <option value="New York, NY">New York, NY</option>
                                <option value="San Francisco, CA">San Francisco, CA</option>
                                <option value="London, UK">London, UK</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/* Status Indicators & Grid Layout */}
                {error ? (
                    <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
                        <p className="font-medium">{error}</p>
                        <button
                            onClick={() => { setSearch(''); setCategory(''); setLocation(''); }}
                            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 font-medium rounded-lg transition-colors"
                        >
                            Clear Filters & Try Again
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl h-55 shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="flex gap-2 pt-2">
                                        <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                                        <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-gray-100 rounded-lg w-full mt-4"></div>
                            </div>
                        ))}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <FiSearch className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
                        <p className="mt-2 text-gray-500 max-w-md mx-auto">
                            We couldn&apos;t find any jobs matching your current search criteria. Try adjusting your filters or search keywords.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setCategory(''); setLocation(''); }}
                            className="mt-6 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4 text-sm font-medium text-gray-500">
                            Showing <span className="text-gray-900">{jobs.length}</span> {jobs.length === 1 ? 'job' : 'jobs'}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <FiLoader className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
        }>
            <JobsContent />
        </Suspense>
    );
}