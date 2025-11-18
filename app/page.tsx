import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProjects from '@/components/FeaturedProjects'
import AllProjects from '@/components/AllProjects'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <AllProjects />
      <Contact />
      <ScrollToTop />
    </>
  )
}
