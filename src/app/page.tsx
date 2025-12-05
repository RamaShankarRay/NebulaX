import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Expertise } from '@/components/sections/expertise';
import { HowWeWork } from '@/components/sections/how-we-work';
import { WhoWeAre } from '@/components/sections/who-we-are';
import { Testimonials } from '@/components/sections/testimonials';
import { Partners } from '@/components/sections/partners';
import { Blogs } from '@/components/sections/blogs';
import { CTASection } from '@/components/sections/cta-section';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Services />
      <Expertise />
      <HowWeWork />
      <WhoWeAre />
      <Testimonials />
      <Partners />
      <Blogs />
      <CTASection />
      <WhatsAppButton />
    </main>
  );
}
