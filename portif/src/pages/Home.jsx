import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaBookOpen,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaExternalLinkAlt,
  FaStar,
} from 'react-icons/fa';
import photo from '../assets/photo.png';
import './Style.css';

// Toast component
function Toast({ message, onClose }) {
  return (
    <div
      className={`toast-message${message ? ' visible' : ''}`}
      onClick={onClose}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

// SEO Head Component
function SEOHead() {
  useEffect(() => {
    document.title = 'Al Baraa Mohammed Al Harthi - Software Engineer & Computer Science Student';

    const metaTags = [
      { name: 'description', content: 'Al Baraa Mohammed Al Harthi - Software Engineer, Computer Science Student, and Technical Lead at GDGC. Expert in Java, Python, Flutter, React, and mobile app development in Muscat, Oman.' },
      { name: 'keywords', content: 'Al Baraa Mohammed Al Harthi, Software Engineer, Computer Science Student, Java Developer, Python Developer, Flutter Developer, React Developer, Mobile App Development, Muscat Oman, Middle East College, Rihal Intern, GDGC Technical Lead' },
      { name: 'author', content: 'Al Baraa Mohammed Al Harthi' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'en' },
      { property: 'og:title', content: 'Al Baraa Mohammed Al Harthi - Software Engineer & Computer Science Student' },
      { property: 'og:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development, web development, and AI/ML.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Al Baraa Al Harthi Portfolio' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Al Baraa Mohammed Al Harthi' },
      { name: 'twitter:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development and AI/ML technologies.' },
    ];

    metaTags.forEach((tag) => {
      let existingTag = tag.name
        ? document.querySelector(`meta[name="${tag.name}"]`)
        : document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) existingTag.remove();

      const metaTag = document.createElement('meta');
      if (tag.name) metaTag.setAttribute('name', tag.name);
      if (tag.property) metaTag.setAttribute('property', tag.property);
      metaTag.setAttribute('content', tag.content);
      document.head.appendChild(metaTag);
    });

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href.split('#')[0]);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: 'Al Baraa Mohammed Al Harthi',
      jobTitle: 'Software Engineer',
      description: 'Computer Science Student and Software Engineer specializing in mobile app development and AI/ML',
      url: window.location.href,
      image: photo,
      email: 'albraa9021@gmail.com',
      address: { "@type": 'PostalAddress', addressLocality: 'Muscat', addressCountry: 'OM' },
      alumniOf: { "@type": 'EducationalOrganization', name: 'Middle East College' },
      worksFor: { "@type": 'Organization', name: 'Rihal' },
      sameAs: [
        'https://www.linkedin.com/in/al-baraa-al-harthi-740340212',
        'https://github.com/albaraa-prog',
        'https://instagram.com/sp_nr',
      ],
    };

    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}

const HomePage = () => {
  // UI state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderHide, setPreloaderHide] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [toast, setToast] = useState('');
  const [typedText, setTypedText] = useState('');

  const introText = 'Jack of all trades, master of one';
  const typingDelay = 80;

  // refs
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  // Personal info
  const personalInfo = {
    name: 'Al Baraa Mohammed Al Harthi',
    title: 'Computer Science Student | Software Engineer | AI/ML | Game Development',
    location: 'Muscat, Oman',
    contact: {
      email: 'albraa9021@gmail.com',
      linkedin: 'https://www.linkedin.com/in/al-baraa-al-harthi-740340212',
      github: 'https://github.com/albaraa-prog',
      instagram: 'https://instagram.com/sp_nr',
    },
  };

  // Education
  const education = {
    institution: 'Middle East College',
    degree: 'Bachelor of Science (Hons) in Computer Science (Software Technology)',
    university: 'Coventry University',
    sociaty: 'Technical Lead of the GDGC (Google Developer Student Club)',
  };

  // Projects (no duplicates)
  const projects = [
    {
      name: 'Rock Classification using CNN',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas'],
      description: 'Developed a Convolutional Neural Network (CNN) model to classify different types of rocks with high accuracy.',
      url: '',
    },
    {
      name: 'Omani Specialties Mobile App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Developed a mobile app to help users purchase Omani specialties, enhancing local market reach.',
      url: 'https://github.com/albaraa-prog/Ghanayim',
    },
    {
      name: 'Sports Facility Booking App',
      technologies: ['Dart', 'Flutter', 'MongoDB', 'Firebase', 'React', 'AI/ML'],
      description: 'Cross-platform mobile app with booking, community interaction, chat, recommendation systems, and dashboard.',
      url: '',
    },
    {
      name: 'Appointment Booking System',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      description: 'Created an appointment booking system allowing users to schedule and manage appointments.',
      url: 'https://github.com/mozaalismaili/AppointmentScheduler',
    },
    {
      name: 'URL Scanner',
      technologies: ['Python', 'Django', 'VirusTotal API'],
      description: 'Developed a URL scanning application integrated with VirusTotal API.',
      url: '',
    },
    {
      name: 'AutoReel',
      technologies: ['Python', 'Giminai API', 'AssemblyAI API'],
      description: 'Generates short video reels from YouTube videos using Giminai and AssemblyAI APIs.',
      url: '',
    },
    {
      name: 'Video Downloader',
      technologies: ['Python'],
      description: 'Created a Python script to download videos from YouTube, supporting various formats and resolutions.',
      url: 'https://github.com/albaraa-prog/download-video',
    },
  ];

  // Skills
  const skills = {
    programmingLanguages: ['Java', 'Python', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#'],
    developmentTools: ['Flutter', 'Android Studio', 'VS Code', 'React', 'Django', 'Firebase', 'MongoDB', 'GitHub', 'TensorFlow', '.Net', 'Unity', 'Spring Boot', 'MySQL'],
  };

  // Certifications
  const certifications = [
    {
      recognizedBy: 'Electronic Arts',
      name: 'Software Engineering virtual experience program on Forage',
      date: 'Nov 2024',
      bullets: [
        'Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal.',
        'Built a class diagram and created a header file in C++ with class definitions for each object.',
        'Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.',
      ],
    },
    {
      recognizedBy: 'Hewlett Packard Enterprise',
      name: 'Software Engineering Job Simulation on Forage',
      date: 'Dec 2024',
      bullets: [
        'Wrote a proposal for a RESTful web service to manage a list of employees.',
        'Built a web server application in Java Spring Boot that accepts and responds to HTTP requests and supports uploading JSON data.',
        'Developed and ran unit tests to assess application performance.',
      ],
    },
    {
      recognizedBy: 'NVIDIA DLI',
      name: 'Fundamentals of Deep Learning',
      date: 'May 2025',
      bullets: [
        'Hands-on experience in training and deploying deep neural networks using TensorFlow and PyTorch.',
        'Learned fundamentals of CNNs, backpropagation, and performance optimization.',
        'Completed lab exercises focused on image classification, data augmentation, and model evaluation.',
      ],
    },
    {
      recognizedBy: 'Six Sigma',
      name: 'Yellow Belt Certification',
      date: 'Dec 2024',
      bullets: [
        'Entry-level certification within the Six Sigma methodology',
        'Understanding of Six Sigma principles, DMAIC process, and basic quality management tools.',
        'Ability to contribute to Six Sigma projects and support process improvement initiatives.',
      ]
    },
    {
      recognizedBy: 'Google',
      name: 'Foundations of Project Management',
      date: 'Dec 2024',
      bullets: [
        'Describe project management skills, roles, and responsibilities across a variety of industries.',
        'Explain the project management life cycle and compare different program management methodologies.',
        'Define organizational structure and organizational culture and explain how it impacts project management.',
      ]
    }
  ];

  // Toast helper
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleEmailCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(personalInfo.contact.email);
      showToast('Email copied to clipboard!');
    } else {
      // Fallback
      const el = document.createElement('textarea');
      el.value = personalInfo.contact.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast('Email copied to clipboard!');
    }
  };

  // Typewriter effect
  useEffect(() => {
    setTypedText('');
    let idx = 0;
    let timeout;
    function type() {
      setTypedText(introText.slice(0, idx));
      if (idx < introText.length) {
        idx++;
        timeout = setTimeout(type, typingDelay);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Preloader hide
  useEffect(() => {
    const totalTime = introText.length * typingDelay + 400;
    const timer = setTimeout(() => {
      setPreloaderHide(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsContentVisible(true);
      }, 600);
    }, totalTime);
    return () => clearTimeout(timer);
  }, []);

  // Close nav on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        isNavOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsNavOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavOpen]);

  // Stars background (memoized)
  const stars = useMemo(() =>
    Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 1.5 + Math.random() * 2,
    })),
  []);

  return (
    <>
      <SEOHead />

      <div className="space-bg">
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{ top: `${s.top}vh`, left: `${s.left}vw`, animationDuration: `${s.duration}s` }}
          />
        ))}
      </div>

      <div className="home-page dark">
        {isLoading && (
          <div className={`preloader${preloaderHide ? ' preloader--hide' : ''}`}>
            <h1 className="preloader-text animated-intro">{typedText}<span className="type-cursor">|</span></h1>
          </div>
        )}

        {!isLoading && (
          <>
            <div className={`content ${isContentVisible ? 'fade-up' : ''}`} />
            <Toast message={toast} onClose={() => setToast('')} />

            {/* Navigation toggle */}
            <button
              ref={toggleRef}
              className="nav-toggle"
              onClick={() => setIsNavOpen((v) => !v)}
              aria-label={isNavOpen ? 'Close sidebar navigation' : 'Open sidebar navigation'}
              aria-expanded={isNavOpen}
            >
              {isNavOpen ? '✖' : '☰'}
            </button>

            {/* Sidebar Navigation */}
            <nav ref={sidebarRef} className={`sidebar ${isNavOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
              <ul className="nav-links">
                <li><a href="#header" className="nav-link">About</a></li>
                <li><a href="#education" className="nav-link">Education</a></li>
                <li><a href="#experience" className="nav-link">Experience</a></li>
                <li><a href="#projects" className="nav-link">Projects</a></li>
                <li><a href="#skills" className="nav-link">Skills</a></li>
                <li><a href="#certifications" className="nav-link">Licenses & Certifications</a></li>
              </ul>
            </nav>

            {/* Main content */}
            <main className="container" role="main">
              {/* Header */}
              <header id="header" className="header" itemScope itemType="https://schema.org/Person">
                <img src={photo} alt="Al Baraa Mohammed Al Harthi - Professional headshot" className="profile-photo" itemProp="image" />
                <h1 itemProp="name">{personalInfo.name}</h1>
                <p itemProp="jobTitle">{personalInfo.title}</p>
                <nav className="social-links" aria-label="Social media links">
                  <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link" aria-label="LinkedIn Profile">LinkedIn</a>
                  <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="link" aria-label="GitHub Profile">GitHub</a>
                  <a href={personalInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="link" aria-label="Instagram Profile">Instagram</a>
                  <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleEmailCopy(); }} aria-label="Copy email address to clipboard">{personalInfo.contact.email}</a>
                </nav>
                <p className="location" itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressLocality">Muscat</span>, <span itemProp="addressCountry">Oman</span></p>
              </header>

              {/* Education Section */}
              <section id="education" aria-labelledby="education-heading">
                <h2 id="education-heading"><FaBookOpen size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Education</h2>
                <div itemScope itemType="https://schema.org/EducationalOrganization">
                  <h3 itemProp="name">{education.degree}</h3>
                  <p itemProp="name">{education.institution}</p>
                  <p itemProp="parentOrganization">{education.university}</p>
                  <p>{education.sociaty}</p>
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience" aria-labelledby="experience-heading">
                <h2 id="experience-heading"><FaBriefcase size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Experience</h2>
                <div className="experience-cards">
                  <article className="exp-card" itemScope itemType="https://schema.org/WorkExperience">
                    <span className="exp-chip" itemProp="hiringOrganization">AL NAHDA Training Institute with Unity</span>
                    <span className="exp-role" itemProp="jobTitle">Game Developer</span>
                    <time className="exp-date" itemProp="datePublished">2025 - present</time>
                  </article>
                  <article className="exp-card" itemScope itemType="https://schema.org/WorkExperience">
                    <span className="exp-chip" itemProp="hiringOrganization">Rihal</span>
                    <span className="exp-role" itemProp="jobTitle">Software Engineer Intern</span>
                    <time className="exp-date" itemProp="datePublished">2025 - 2025 (2 Months)</time>
                  </article>
                  <article className="exp-card" itemScope itemType="https://schema.org/WorkExperience">
                    <span className="exp-chip" itemProp="hiringOrganization">Oman Archive</span>
                    <span className="exp-role" itemProp="jobTitle">Full-Stack developer Intern</span>
                    <time className="exp-date" itemProp="datePublished">2025 - 2025 (3 Months)</time>
                  </article>
                  <article className="exp-card" itemScope itemType="https://schema.org/WorkExperience">
                    <span className="exp-chip" itemProp="hiringOrganization">Buslah</span>
                    <span className="exp-role" itemProp="jobTitle">Manager of Research and Development, Part-time</span>
                    <time className="exp-date" itemProp="datePublished">2024 - 2025 (1 year)</time>
                  </article>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" aria-labelledby="projects-heading">
                <h2 id="projects-heading"><FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Projects</h2>
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <article
                      key={index}
                      className="project-card"
                      tabIndex={0}
                      style={{ ['--delay']: `${index * 0.2}s`, cursor: project.url ? 'pointer' : 'default' }}
                      itemScope
                      itemType="https://schema.org/SoftwareApplication"
                      onClick={() => project.url && window.open(project.url, '_blank')}
                      onKeyDown={(e) => e.key === 'Enter' && project.url && window.open(project.url, '_blank')}
                    >
                      <h3 itemProp="name">{project.name}</h3>
                      <p itemProp="description">{project.description}</p>
                      <div className="tags-container" itemProp="programmingLanguage">
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      {project.url ? (
                        <p className="project-link"><FaExternalLinkAlt size={20} aria-hidden="true" />Click to view project</p>
                      ) : (
                        <p className="project-link muted">Coming soon</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" aria-labelledby="skills-heading">
                <h2 id="skills-heading"><FaStar size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Skills</h2>
                <div itemScope itemType="https://schema.org/Person">
                  <h3>Programming Languages</h3>
                  <div className="tags-container">
                    {skills.programmingLanguages.map((lang, i) => <span key={i} className="tool-tag" itemProp="knowsAbout">{lang}</span>)}
                  </div>
                  <h3>Development Tools</h3>
                  <div className="tags-container">
                    {skills.developmentTools.map((tool, i) => <span key={i} className="tool-tag" itemProp="knowsAbout">{tool}</span>)}
                  </div>
                </div>
              </section>

              {/* Certifications Section */}
              <section id="certifications" aria-labelledby="certifications-heading">
                <h2 id="certifications-heading"><FaCertificate size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Licenses & Certifications</h2>
                <div className="cert-cards">
                  {certifications.map((c, i) => (
                    <article key={i} className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                      <span className="cert-chip" itemProp="recognizedBy">{c.recognizedBy}</span>
                      <span className="cert-title" itemProp="name">{c.name}</span>
                      {c.date && <time className="cert-date" itemProp="datePublished">{c.date}</time>}
                      <ul itemProp="description">{c.bullets.map((b, bi) => <li key={bi}>{b}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </section>

            </main>

            {/* Sidebar overlay when nav open */}
            {isNavOpen && <div className="sidebar-overlay" onClick={() => setIsNavOpen(false)} aria-hidden="true"></div>}

          </>
        )}

      </div>
    </>
  );
};

export default HomePage;
