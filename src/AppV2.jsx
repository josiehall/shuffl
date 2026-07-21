import NavV2 from './components/v2/NavV2.jsx'
import HeroV2 from './components/v2/HeroV2.jsx'
import ProblemV2 from './components/v2/ProblemV2.jsx'
import HowItWorksV2 from './components/v2/HowItWorksV2.jsx'
import ForTeachersV2 from './components/v2/ForTeachersV2.jsx'
import TranslatorV2 from './components/v2/TranslatorV2.jsx'
import WhoItsForV2 from './components/v2/WhoItsForV2.jsx'
import WaitlistV2 from './components/v2/WaitlistV2.jsx'
import FAQV2 from './components/v2/FAQV2.jsx'
import FooterV2 from './components/v2/FooterV2.jsx'

export default function AppV2() {
  return (
    <div className="relative min-h-screen bg-bone font-archivo text-noir">
      <NavV2 />
      <main>
        <HeroV2 />
        <ProblemV2 />
        <HowItWorksV2 />
        <ForTeachersV2 />
        <TranslatorV2 />
        <WhoItsForV2 />
        <WaitlistV2 />
        <FAQV2 />
      </main>
      <FooterV2 />
    </div>
  )
}
