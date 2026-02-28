import { ExploreByCategory } from '../components/home/ExploreByCategory';
import { CTABanner } from '../components/home/CTABanner';
import { FeaturedJobs } from '../components/home/FeaturedJobs';
import { Hero } from '../components/home/Hero';
import { Companies } from '../components/home/Companies';
import { LatestJobs } from '../components/home/LatestJobs';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Companies />
      <ExploreByCategory />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />

    </div>
  );
}
