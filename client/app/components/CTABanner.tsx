import React from 'react';
import Image from 'next/image';
import { Button } from './Button';

export const CTABanner = () => {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Clipped Container */}
                <div
                    className="relative overflow-hidden w-full flex flex-col lg:flex-row items-center justify-between px-3 md:px-6 lg:px-20 bg-[#4640DE] [clip-path:polygon(38%_0%,100%_0%,100%_88%,62%_100%,0%_100%,0%_12%)] md:[clip-path:polygon(15%_0%,100%_0%,100%_82%,85%_100%,0%_100%,0%_18%)]"
                >
                    {/* Left Content */}
                    <div className="flex-1 w-full py-6 pt-16 md:py-16 lg:py-24 z-10">
                        <h2 className="font-heading font-semibold text-2xl text-center md:text-left md:text-5xl lg:text-[56px] leading-[1.1] text-white">
                            Start posting jobs today
                        </h2>

                        <p className="mt-6 font-sans text-sm text-center md:text-left md:text-xl text-white/90">
                            Start posting jobs for only $10.
                        </p>

                        <Button variant="primary" className="mt-10 w-full md:w-fit bg-white text-[#4640DE] hover:bg-gray-50 shadow-[0_8px_20px_rgba(0,0,0,0.15)] px-10 py-4 font-bold rounded-none text-base transition-colors">
                            Sign Up For Free
                        </Button>
                    </div>

                    {/* Right Image */}
                    <div className="flex-[1.2] w-full md:mt-10 lg:mt-0 flex justify-end z-10 self-end">
                        <Image
                            src="/assets/Dashboard Company.png"
                            alt="Dashboard Preview"
                            width={800}
                            height={600}
                            className="w-full max-w-162 lg:max-w-212 h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
