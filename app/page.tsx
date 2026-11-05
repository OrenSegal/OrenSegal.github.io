import Hero from '@/components/Hero'
import Flagships from '@/components/Flagships'
import Checks from '@/components/Checks'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Hero />
      <Flagships />
      <Checks />
      <Projects />
      <About />
      <Contact />
      <ScrollToTop />
    </>
  )
}
