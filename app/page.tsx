import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
