import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ForTeachers from './components/ForTeachers.jsx'
import WhoItsFor from './components/WhoItsFor.jsx'
import Waitlist from './components/Waitlist.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ForTeachers />
        <WhoItsFor />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
