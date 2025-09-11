import { useEffect, useMemo, useRef, useState } from 'react';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import photo from '../assets/photo.png';
import './Style.css';

// Toast Component
function Toast({ message, onClose }) {
  return (
    <div className={`toast-message${message ? ' visible' : ''}`} onClick={onClose}>
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
      { property: 'og:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development, web development, and AI/ML. Currently interning at Rihal and serving as Technical Lead at GDGC.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Al Baraa Al Harthi Portfolio' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Al Baraa Mohammed Al Harthi - Software Engineer' },
      { name: 'twitter:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development and AI/ML technologies.' },
    ];

    metaTags.forEach(tag => {
      let existingTag = tag.name
        ? document.querySelector(`meta[name="${tag.name}"]`)
        : document.querySelector(`meta[property="${tag.property}"]`);

      if (existingTag) existingTag.remove();

      const metaTag = document.createElement('meta');
      tag.name && metaTag.setAttribute('name', tag.name);
      tag.property && metaTag.setAttribute('property', tag.property);
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
      "name": "Al Baraa Mohammed Al Harthi",
      "jobTitle": "Software Engineer",
      "description": "Computer Science Student and Software Engineer specializing in mobile app development and AI/ML",
      "url": window.location.href,
      "image": photo,
      "email": "albraa9021@gmail.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Muscat", "addressCountry": "OM" },
      "alumniOf": { "@type": "EducationalOrganization", "name": "Middle East College" },
      "worksFor": { "@type": "Organization", "name": "Rihal" },
      "sameAs": ["https://www.linkedin.com/in/al-baraa-al-harthi-740340212", "https://github.com/albaraa-prog", "https://instagram.com/sp_nr"]
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [toast, setToast] = useState("");
  const [typedText, setTypedText] = useState("");
  const typingDelay = 80;
  const introText = "Jack of all trades, master of one";
  const preloaderRef = useRef();
  const sidebarRef = useRef();
  const toggleRef = useRef();
  const [preloaderHide, setPreloaderHide] = useState(false);

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

  const projects = [
    {
      name: 'Omani Specialties Mobile App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Developed a mobile app to help users purchase Omani specialties, enhancing local market reach.',
      url: 'https://github.com/albaraa-prog/Ghanayim',
    },
    {
      name: 'Appointment Booking System',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      description: 'Created an appointment booking system allowing users to schedule and manage appointments.',
      url: 'https://github.com/mozaalismaili/AppointmentScheduler',
    },
    {
      name: 'Video Downloader',
      technologies: ['Python'],
      description: 'Created a Python script to download videos from YouTube, supporting various formats and resolutions.',
      url: 'https://github.com/albaraa-prog/download-video',
    },
  ];

  useEffect(() => {
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

  useEffect(() => {
    function handleClick(e) {
      if (isNavOpen && sidebarRef.current && !sidebarRef.current.contains(e.target) && toggleRef.current && !toggleRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavOpen]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    showToast('Email copied to clipboard!');
  };

  const stars = useMemo(() =>
    Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 1.5 + Math.random() * 2
    })), []);

  return (
    <>
      <SEOHead />
      <div className="space-bg">
        {stars.map((star, i) => (
          <div key={i} className="star" style={{ top: `${star.top}vh`, left: `${star.left}vw`, animationDuration: `${star.duration}s` }} />
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
            <div className={`content ${isContentVisible ? 'fade-up' : ''}`}></div>
            <Toast message={toast} onClose={() => setToast("")} />

            {/* Projects Section */}
            <section id="projects" aria-labelledby="projects-heading">
              <h2 id="projects-heading">
                <FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                Projects
              </h2>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <article
                    key={index}
                    className="project-card"
                    style={{ "--delay": `${index * 0.2}s`, cursor: project.url ? 'pointer' : 'default' }}
                    itemScope
                    itemType="https://schema.org/SoftwareApplication"
                    onClick={() => project.url && window.open(project.url, '_blank')}
                  >
                    <h3 itemProp="name">{project.name}</h3>
                    <p itemProp="description">{project.description}</p>
                    <div className="tags-container" itemProp="programmingLanguage">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {project.url && (
                      <p className="project-link">
                        <FaExternalLinkAlt size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                        Click to view project
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
