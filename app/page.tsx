import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Now from '@/components/Now'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Now />
      <Experience />
      <About />
      <Contact />
      <ScrollToTop />
    </>
  )
}
