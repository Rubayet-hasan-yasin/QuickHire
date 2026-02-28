import React from 'react';
import Image from 'next/image';

export const Companies = () => {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <p className="text-[#515B6F] font-sans text-base mb-6">Companies we helped grow</p>
                <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image src="/assets/companies/vodafone-2017-logo.png" alt="Vodafone" width={120} height={40} className="h-8 md:h-9 w-auto object-contain" />
                    <Image src="/assets/companies/intel-3.png" alt="Intel" width={100} height={40} className="h-8 md:h-9 w-auto object-contain" />
                    <Image src="/assets/companies/tesla-9 1.png" alt="Tesla" width={140} height={40} className="h-5 md:h-6 w-auto object-contain" />
                    <Image src="/assets/companies/amd-logo-1.png" alt="AMD" width={120} height={40} className="h-7 md:h-8 w-auto object-contain" />
                    <Image src="/assets/companies/talkit 1.png" alt="Talkit" width={100} height={40} className="h-8 md:h-9 w-auto object-contain" />
                </div>
            </div>
        </section>
    );
};
