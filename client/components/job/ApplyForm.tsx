"use client";

import React, { useState } from 'react';
import { createApplication } from '../../lib/api';

interface ApplyFormProps {
    jobId: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ jobId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeLink: '',
        coverNote: ''
    });
    

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        try {
            const url = new URL(formData.resumeLink);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                throw new Error();
            }
        } catch {
            setError("Please enter a valid URL for your resume (e.g. https://example.com/resume.pdf).");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!validateForm()) return;

        setLoading(true);

        try {
            await createApplication({
                jobId: jobId,
                ...formData
            });

            

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                resumeLink: '',
                coverNote: ''
            });

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred while submitting your application.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 rounded-2xl border border-green-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-green-700">Thank you for applying. We have received your application and will be in touch shortly.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 inline-flex justify-center items-center px-6 py-2 border border-green-200 text-green-700 bg-white hover:bg-green-50 font-medium rounded-xl transition-colors"
                >
                    Submit Another Application
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h3>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-2">Resume URL Link <span className="text-red-500">*</span></label>
                    <input
                        type="url"
                        id="resumeLink"
                        name="resumeLink"
                        required
                        value={formData.resumeLink}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="https://yourwebsite.com/resume.pdf"
                    />
                </div>

                <div>
                    <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700 mb-2">Cover Note <span className="text-red-500">*</span></label>
                    <textarea
                        id="coverNote"
                        name="coverNote"
                        rows={4}
                        required
                        value={formData.coverNote}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Tell us why you are a great fit..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Submit Application"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ApplyForm;
