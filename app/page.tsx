import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Ticker } from '@/components/layout/ticker';
import { Footer } from '@/components/layout/footer';
import { MottoBar } from '@/components/layout/motto-bar';
import { HeroSection } from '@/components/sections/hero-section';
import { ColorSystemSection } from '@/components/sections/color-system-section';
import { ZoneMechanicsSection } from '@/components/sections/zone-mechanics-section';
import { PsychologySection } from '@/components/sections/psychology-section';
import { MasterclassSection } from '@/components/sections/masterclass-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { CommunitySection } from '@/components/sections/community-section';

export const metadata: Metadata = {
  title: 'Official Musty — Muster Point Protocol',
};

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Ticker />
      <Header currentPath="/" />
      <main>
        <HeroSection />
        <MottoBar />
        <ColorSystemSection />
        <ZoneMechanicsSection />
        <PsychologySection />
        <MasterclassSection />
        <PricingSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
