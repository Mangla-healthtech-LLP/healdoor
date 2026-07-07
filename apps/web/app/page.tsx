import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { HealthcareIntro } from '@/components/home/HealthcareIntro'
import { ServiceCategoriesGrid } from '@/components/home/ServiceCategoriesGrid'
import { TrustBadges } from '@/components/home/TrustBadges'
import { ProblemsSection } from '@/components/home/ProblemsSection'
// import { HighestSellingProducts } from "@/components/home/HighestSellingProducts";
import { RentOrBuySection } from '@/components/home/RentOrBuySection'
import { ExpertDoctors } from '@/components/home/ExpertDoctors'
import { DoctorReelsSection } from '@/components/home/DoctorReelsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection'
import { OurStorySection } from '@/components/home/OurStorySection'
import { BlogsSection } from '@/components/home/BlogsSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { LocationSection } from '@/components/home/LocationSection'
import { CookieBanner } from '@/components/CookieBanner'
import {
  getHomepageSettings,
  getBlogs,
  getTestimonials,
  getDoctorReels,
  getFeaturedProducts,
} from '@healdoor/utils'

async function getHomeData() {
  try {
    const [homepage, blogsRes, testimonials, doctorReels, products] =
      await Promise.all([
        getHomepageSettings().catch(() => null),
        getBlogs({ limit: 4 }).catch(() => null),
        getTestimonials().catch(() => []),
        getDoctorReels().catch(() => []),
        getFeaturedProducts().catch(() => []),
      ])

    return {
      homepage,
      blogs: blogsRes?.docs ?? [],
      testimonials,
      doctorReels,
      products,
    }
  } catch {
    return {
      homepage: null,
      blogs: [],
      testimonials: [],
      doctorReels: [],
      products: [],
    }
  }
}

export default async function Home() {
  const { homepage, blogs, testimonials, doctorReels, products } =
    await getHomeData()

  // Products for rent/buy section will be filtered dynamically inside the component

  return (
    <>
      <Navbar />
      {/* <ServiceNavTabs /> */}
      <main className="flex-1">
        <HeroCarousel slides={homepage?.heroSlides} />
        <HealthcareIntro
          heading={homepage?.healthcareIntro?.heading}
          description={homepage?.healthcareIntro?.description}
        />
        <ServiceCategoriesGrid services={homepage?.serviceCategories} />
        <TrustBadges badges={homepage?.trustBadges} />
        <ProblemsSection
          heading={homepage?.problemsSection?.heading}
          description={homepage?.problemsSection?.description}
          problems={homepage?.problemsSection?.problems}
        />
        {/* <HighestSellingProducts
          heading={homepage?.highestSellingSection?.heading}
          description={homepage?.highestSellingSection?.description}
          products={products.length > 0 ? products : undefined}
        /> */}
        <RentOrBuySection
          heading={homepage?.rentOrBuySection?.heading}
          description={homepage?.rentOrBuySection?.description}
          products={products.length > 0 ? products : undefined}
          rentBenefits={homepage?.rentOrBuySection?.rentBenefits}
          buyBenefits={homepage?.rentOrBuySection?.buyBenefits}
        />
        <ExpertDoctors
          heading={homepage?.expertDoctorsSection?.heading}
          description={homepage?.expertDoctorsSection?.description}
          doctors={homepage?.expertDoctorsSection?.doctors}
        />
        <DoctorReelsSection
          heading={homepage?.doctorReelsSection?.heading}
          description={homepage?.doctorReelsSection?.description}
          reels={doctorReels.length > 0 ? doctorReels : undefined}
        />
        <TestimonialsSection
          heading={homepage?.testimonialsSection?.heading}
          description={homepage?.testimonialsSection?.description}
          testimonials={testimonials.length > 0 ? testimonials : undefined}
        />
        <BeforeAfterSection
          heading={homepage?.beforeAfterSection?.heading}
          description={homepage?.beforeAfterSection?.description}
          stories={homepage?.beforeAfterSection?.stories}
        />
        <OurStorySection
          heading={homepage?.ourStorySection?.heading}
          narrative={homepage?.ourStorySection?.narrative}
          team={homepage?.ourStorySection?.team}
        />
        <BlogsSection
          heading={homepage?.blogsSection?.heading}
          description={homepage?.blogsSection?.description}
          blogs={blogs.length > 0 ? blogs : undefined}
        />
        <HowItWorks
          heading={homepage?.howItWorksSection?.heading}
          description={homepage?.howItWorksSection?.description}
          steps={homepage?.howItWorksSection?.steps}
        />
        <LocationSection
          heading={homepage?.locationSection?.heading}
          companyName={homepage?.locationSection?.companyName}
          address={homepage?.locationSection?.address}
          mapEmbedUrl={homepage?.locationSection?.mapEmbedUrl}
          getDirectionsLink={homepage?.locationSection?.getDirectionsLink}
        />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
