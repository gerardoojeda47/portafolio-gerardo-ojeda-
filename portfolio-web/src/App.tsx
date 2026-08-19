import './styles/global.css'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { TechStack } from './components/TechStack/TechStack'
import { AISection } from './components/AISection/AISection'
import { Projects } from './components/Projects/Projects'
import { EngineeringSection } from './components/EngineeringSection/EngineeringSection'
import { Experience } from './components/Experience/Experience'
import { GitHubSection } from './components/GitHubSection/GitHubSection'
import { CurrentlyBuilding } from './components/CurrentlyBuilding/CurrentlyBuilding'
import { Certifications } from './components/Certifications/Certifications'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { BackToTop } from './components/BackToTop/BackToTop'
import { CustomCursor } from './components/CustomCursor/CustomCursor'

function App() {
  return (
    <>
      <CustomCursor />
      <header>
        <Navbar />
      </header>

      <main>
        <Hero />
        <About />
        <TechStack />
        <AISection />
        <Projects />
        <EngineeringSection />
        <Experience />
        <GitHubSection />
        <CurrentlyBuilding />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}

export default App
