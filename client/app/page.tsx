import { ExploreByCategory } from './components/ExploreByCategory';
import { CTABanner } from './components/CTABanner';
import { Hero } from './components/Hero';
import { Companies } from './components/Companies';


export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Companies />
      <ExploreByCategory />
      <CTABanner />
      

    </div>
  );
}
