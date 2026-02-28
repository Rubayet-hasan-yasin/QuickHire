import axios from 'axios';
import type { Job, Application } from '../types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout to prevent UI freeze
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message || 'An unexpected error occurred');
    }
);

interface GetJobsParams {
    search?: string;
    category?: string;
    location?: string;
}

export const getJobs = async (params?: GetJobsParams) => {
    const response = await api.get('/jobs', { params });
    return response.data;
};

export const getJobById = async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
};

export const createJob = async (data: Omit<Job, '_id' | 'createdAt'>) => {
    const response = await api.post('/jobs', data);
    return response.data;
};

export const deleteJob = async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
};

export const createApplication = async (data: Omit<Application, '_id' | 'createdAt'>) => {
    const response = await api.post('/applications', data);
    return response.data;
};
