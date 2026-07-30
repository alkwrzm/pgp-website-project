import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import CompanyProfileSection from '@/components/CompanyProfileSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import { ensureServicesSeeded } from '@/lib/seedServices';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects: any[] = [];
  let services: any[] = [];
  let dbError = false;

  try {
    await ensureServicesSeeded();
    const [fetchedProjects, fetchedServices] = await Promise.all([
      prisma.project.findMany({ orderBy: [{ order: 'asc' }, { eventDate: 'desc' }] as any }),
      prisma.service.findMany({ orderBy: { order: 'asc' } as any }),
    ]);
    projects = fetchedProjects;
    services = fetchedServices;
  } catch (error) {
    console.error('Failed to fetch data for home page:', error);
    dbError = true;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section (Bilingual ID / EN) */}
      <HeroSection />

      {/* About Us / Company Profile */}
      <CompanyProfileSection />

      {/* Selected Portfolio Section (Projects) */}
      <PortfolioSection projects={projects} dbError={dbError} />

      {/* Our Services Section */}
      <ServicesSection dynamicServices={services} />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
