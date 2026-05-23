import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Team from '../components/Team'
import Gallery from '../components/Gallery'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Team />
      <Gallery />
      <ActionButtons />
      <Footer />
    </div>
  )
}
