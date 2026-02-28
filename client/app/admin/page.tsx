"use client";

import React, { useState, useEffect } from 'react';
import { getJobs, createJob, deleteJob } from '../../lib/api';
import { Job } from '../../types/job';
import { FiTrash2, FiPlus, FiBriefcase, FiMapPin } from 'react-icons/fi';

export default function AdminPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [jobsError, setJobsError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Deletion State
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchJobs = async () => {
        setLoadingJobs(true);
        setJobsError(null);
        try {
            const response = await getJobs();
            setJobs(response.data || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setJobsError(err.message);
            } else {
                setJobsError("Failed to load jobs");
            }
        } finally {
            setLoadingJobs(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);
        setIsSubmitting(true);

        try {
            await createJob(formData);
            setSubmitSuccess(true);
            setFormData({
                title: '',
                company: '',
                location: '',
                category: '',
                description: ''
            });
            // Refresh the jobs list
            fetchJobs();

            // Clear success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setSubmitError(err.message);
            } else {
                setSubmitError("Failed to create job");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return;

        setDeletingId(id);
        setJobsError(null);

        try {
            await deleteJob(id);
            // Refresh jobs list
            fetchJobs();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setJobsError(err.message);
            } else {
                setJobsError("Failed to delete job");
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-600">Manage job postings and operations from this control panel.</p>
                </div>

                {/* Create Job Form Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FiPlus className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
                    </div>

                    {submitError && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                            {submitError}
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="mb-6 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                            Job successfully created!
                        </div>
                    )}

                    <form onSubmit={handleCreateJob} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Job Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="e.g. Senior Frontend Engineer"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleFormChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="e.g. TechCorp Inc."
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleFormChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="e.g. Remote, New York, etc."
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500 appearance-none bg-white"
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Product">Product</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Job Description <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                required
                                value={formData.description}
                                onChange={handleFormChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-y disabled:bg-gray-50 disabled:text-gray-500"
                                placeholder="Describe the role, responsibilities, and requirements..."
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center min-w-40"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Create Job"
                                )}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Job List Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Manage Active Jobs</h2>

                    {jobsError && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex justify-between items-center">
                            <span>{jobsError}</span>
                            <button onClick={() => fetchJobs()} className="underline hover:no-underline">Retry</button>
                        </div>
                    )}

                    {loadingJobs ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                            ))}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                            No jobs found. Create one above to get started.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <div key={job._id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all gap-4 bg-white">

                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{job.title}</h3>
                                        <p className="text-gray-500 font-medium">{job.company}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                                            <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                                            <span className="flex items-center gap-1"><FiBriefcase /> {job.category}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteJob(job._id)}
                                        disabled={deletingId === job._id}
                                        className="shrink-0 self-start sm:self-center p-3 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                        title="Delete Job"
                                    >
                                        {deletingId === job._id ? (
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <FiTrash2 className="w-5 h-5" />
                                        )}
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}