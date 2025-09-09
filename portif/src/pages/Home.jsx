import { useEffect, useRef, useState } from 'react';
import { FaBookOpen, FaBriefcase, FaCertificate, FaCode, FaStar } from 'react-icons/fa';
import photo from '../assets/photo.png';
import './Style.css';

// Toast component
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
    // Set document title
    document.title = 'Al Baraa Mohammed Al Harthi - Software Engineer & Computer Science Student';
    
    // Create or update meta tags
    const metaTags = [
      { name: 'description', content: 'Al Baraa Mohammed Al Harthi - Software Engineer, Computer Science Student, and Technical Lead at GDGC. Expert in Java, Python, Flutter, React, and mobile app development in Muscat, Oman.' },
      { name: 'keywords', content: 'Al Baraa Mohammed Al Harthi, Software Engineer, Computer Science Student, Java Developer, Python Developer, Flutter Developer, React Developer, Mobile App Development, Muscat Oman, Middle East College, Rihal Intern, GDGC Technical Lead' },
      { name: 'author', content: 'Al Baraa Mohammed Al Harthi' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'en' },
      { name: 'geo.region', content: 'OM-MA' },
      { name: 'geo.placename', content: 'Muscat, Oman' },
      { name: 'geo.position', content: '23.5859;58.4059' },
      { name: 'ICBM', content: '23.5859, 58.4059' },
      
      // Open Graph tags
      { property: 'og:title', content: 'Al Baraa Mohammed Al Harthi - Software Engineer & Computer Science Student' },
      { property: 'og:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development, web development, and AI/ML. Currently interning at Rihal and serving as Technical Lead at GDGC.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Al Baraa Al Harthi Portfolio' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Al Baraa Mohammed Al Harthi - Software Engineer' },
      { name: 'twitter:description', content: 'Software Engineer and Computer Science Student specializing in mobile app development and AI/ML technologies.' },
      
      // Professional/LinkedIn specific
      { name: 'profile:first_name', content: 'Al Baraa Mohammed' },
      { name: 'profile:last_name', content: 'Al Harthi' },
      { name: 'profile:username', content: 'al-baraa-al-harthi' },
    ];

    // Remove existing meta tags and add new ones
    metaTags.forEach(tag => {
      let existingTag;
      if (tag.name) {
        existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      } else if (tag.property) {
        existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      }
      
      if (existingTag) {
        existingTag.remove();
      }
      
      const metaTag = document.createElement('meta');
      if (tag.name) {
        metaTag.setAttribute('name', tag.name);
      } else if (tag.property) {
        metaTag.setAttribute('property', tag.property);
      }
      metaTag.setAttribute('content', tag.content);
      document.head.appendChild(metaTag);
    });

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href.split('#')[0]);

    // Add structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Al Baraa Mohammed Al Harthi",
      "jobTitle": "Software Engineer",
      "description": "Computer Science Student and Software Engineer specializing in mobile app development and AI/ML",
      "url": window.location.href,
      "image": photo,
      "email": "albraa9021@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Muscat",
        "addressCountry": "OM"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Middle East College"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Rihal"
      },
      "sameAs": [
        "https://www.linkedin.com/in/al-baraa-al-harthi-740340212",
        "https://github.com/albaraa-prog",
        "https://instagram.com/sp_nr"
      ],
      "knowsAbout": [
        "Java Programming",
        "Python Development",
        "Flutter Development",
        "React Development",
        "Mobile App Development",
        "Web Development",
        "Firebase",
        "MongoDB",
        "Machine Learning",
        "Artificial Intelligence"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Fundamentals of Deep Learning",
          "credentialCategory": "Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "NVIDIA DLI"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Software Engineering Virtual Experience",
          "credentialCategory": "Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Electronic Arts"
          }
        }
      ]
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

  useEffect(() => {
    setTypedText("");
    let idx = 0;
    let timeout;
    function type() {
      setTypedText(introText.slice(0, idx));
      if (idx < introText.length) {
        idx++;
        timeout = setTimeout(type, typingDelay);
      }
    }
    if (isLoading) {
      type();
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

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
    if (isNavOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    showToast('Email copied to clipboard!');
  };

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

  const education = {
    institution: 'Middle East College',
    degree: 'Bachelor of Science (Hons) in Computer Science (Software Technology)',
    university: 'Coventry University',
    sociaty: 'Technical Lead of the GDGC (Google Developer Student Club)',
  };

  const projects = [
    {
      name: 'Rock Classification using CNN',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas'],
      description: 'Developed a Convolutional Neural Network (CNN) model to classify different types of rocks with high accuracy.',
    },
    {
      name: 'Omani Specialties Mobile App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Developed a mobile app to help users purchase Omani specialties, enhancing local market reach.',
    },
    {
      name: 'Sports Facility Booking App',
      technologies: ['Dart', 'Flutter', 'MongoDB', 'Firebase', 'React', 'AI/ML'],
      description: 'Cross-platform mobile app with booking, community interaction, chat, recommendation systems, and dashboard.',
    },
    {
      name: 'Appointment Booking System',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      description: 'Created an appointment booking as a team  for a general purpose, allowing users to schedule and manage appointments.',
    },
    {
      name: 'URL Scanner',
      technologies: ['Python', 'Django', 'Virus Total API'],
      description: 'Developed a URL scanning application integrated with Virus Total API.',
    },
    {
      name: 'Water Ordering & Delivery App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Mobile application for users to order and track water deliveries.',
    },
    {
      name: 'AutoReel',
      technologies: ['Python', 'Giminai API', 'AssemblyAI API'],
      description: 'Developed a python script that generates video reels from YouTube videos using Giminai and AssemblyAI APIs. With subtitles, images, and audio.',
    },
    {
      name: 'Video Downloader',
      technologies: ['Python'],
      description: 'Created a Python script to download videos from YouTube, supporting various formats and resolutions.',   
    },
  ];

  const skills = {
    programmingLanguages: ['Java', 'Python', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#'],
    developmentTools: ['Flutter', 'Android Studio', 'VS Code', 'React', 'Django', 'Firebase', 'MongoDB', 'GitHub', 'TensorFlow', '.Net', 'Unity', 'Spring Boot', 'MySQL'],
  };

  return (
    <>
      <SEOHead />
      <div className="space-bg">
        {Array.from({ length: 80 }).map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 1.5 + Math.random() * 2;
          return (
            <div
              key={i}
              className="star"
              style={{ top: `${top}vh`, left: `${left}vw`, animationDuration: `${duration}s` }}
            />
          );
        })}
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
            
            {/* Semantic Navigation */}
            <nav ref={sidebarRef} className={`sidebar ${isNavOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
              <ul className="nav-links">
                <li>
                  <a href="portifolio/#header" className="nav-link" aria-describedby="about-desc">
                    About
                  </a>
                </li>
                <li>
                  <a href="portifolio/#education" className="nav-link" aria-describedby="education-desc">
                    Education
                  </a>
                </li>
                <li>
                  <a href="portifolio/#experience" className="nav-link" aria-describedby="experience-desc">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="portifolio/#projects" className="nav-link" aria-describedby="projects-desc">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="portifolio/#skills" className="nav-link" aria-describedby="skills-desc">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="portifolio/#certifications" className="nav-link" aria-describedby="certifications-desc">
                    Licenses & Certifications
                  </a>
                </li>
              </ul>
            </nav>

            <button
              ref={toggleRef}
              className="nav-toggle"
              onClick={() => setIsNavOpen(!isNavOpen)}
              style={isNavOpen ? { zIndex: 1101 } : {}}
              aria-label={isNavOpen ? 'Close sidebar navigation' : 'Open sidebar navigation'}
              aria-expanded={isNavOpen}
            >
              {isNavOpen ? '✖' : '☰'}
            </button>

            {/* Semantic Main Content */}
            <main className="container" role="main">
              {/* Header with structured data */}
              <header id="header" className="header" itemScope itemType="https://schema.org/Person">
                <img 
                  src={photo} 
                  alt="Al Baraa Mohammed Al Harthi - Professional headshot" 
                  className="profile-photo"
                  itemProp="image"
                />
                <h1 itemProp="name">{personalInfo.name}</h1>
                <p itemProp="jobTitle">{personalInfo.title}</p>
                <nav className="social-links" aria-label="Social media links">
                  <a 
                    href={personalInfo.contact.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link"
                    itemProp="sameAs"
                    aria-label="LinkedIn Profile"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={personalInfo.contact.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link"
                    itemProp="sameAs"
                    aria-label="GitHub Profile"
                  >
                    GitHub
                  </a>
                  <a 
                    href={personalInfo.contact.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link"
                    itemProp="sameAs"
                    aria-label="Instagram Profile"
                  >
                    Instagram
                  </a>
                  <a 
                    href="#" 
                    className="link" 
                    onClick={(e) => { e.preventDefault(); handleEmailCopy(); }}
                    itemProp="email"
                    aria-label="Copy email address to clipboard"
                  >
                    {personalInfo.contact.email}
                  </a>
                </nav>
                <p className="location" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">Muscat</span>, <span itemProp="addressCountry">Oman</span>
                </p>
              </header>

              {/* Education Section */}
              <section id="education" aria-labelledby="education-heading">
                <h2 id="education-heading">
                  <FaBookOpen size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                  Education
                </h2>
                <div itemScope itemType="https://schema.org/EducationalOrganization">
                  <h3 itemProp="name">{education.degree}</h3>
                  <p itemProp="name">{education.institution}</p>
                  <p itemProp="parentOrganization">{education.university}</p>
                  <p>{education.sociaty}</p>
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience" aria-labelledby="experience-heading">
                <h2 id="experience-heading">
                  <FaBriefcase size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                  Experience
                </h2>
                <div className="experience-cards">
                  <article className="exp-card" itemScope itemType="https://schema.org/WorkExperience">
                    <span className="exp-chip" itemProp="hiringOrganization">AL NAHDA Training Institute ( London Academy)</span>
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
                <h2 id="projects-heading">
                  <FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                  Projects
                </h2>
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <article 
                      key={index} 
                      className="project-card" 
                      style={{ "--delay": `${index * 0.2}s` }}
                      itemScope 
                      itemType="https://schema.org/SoftwareApplication"
                    >
                      <h3 itemProp="name">{project.name}</h3>
                      <p itemProp="description">{project.description}</p>
                      <div className="tags-container" itemProp="programmingLanguage">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" aria-labelledby="skills-heading">
                <h2 id="skills-heading">
                  <FaStar size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                  Skills
                </h2>
                <div itemScope itemType="https://schema.org/Person">
                  <h3>Programming Languages</h3>
                  <div className="tags-container">
                    {skills.programmingLanguages.map((lang, index) => (
                      <span key={index} className="tool-tag" itemProp="knowsAbout">{lang}</span>
                    ))}
                  </div>
                  <h3>Development Tools</h3>
                  <div className="tags-container">
                    {skills.developmentTools.map((tool, index) => (
                      <span key={index} className="tool-tag" itemProp="knowsAbout">{tool}</span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Certifications Section */}
              <section id="certifications" aria-labelledby="certifications-heading">
                <h2 id="certifications-heading">
                  <FaCertificate size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
                  Licenses & Certifications
                </h2>
                <div className="cert-cards">
                  <article className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <span className="cert-chip" itemProp="recognizedBy">Electronic Arts</span>
                    <span className="cert-title" itemProp="name">Software Engineering virtual experience program on Forage</span>
                    <time className="cert-date" itemProp="datePublished">Nov 2024</time>
                    <ul itemProp="description">
                      <li>Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders.</li>
                      <li>Built a class diagram and created a header file in C++ with class definitions for each object.</li>
                      <li>Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.</li>
                    </ul>
                  </article>
                  <article className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <span className="cert-chip" itemProp="recognizedBy">Hewlett Packard Enterprise</span>
                    <span className="cert-title" itemProp="name">Software Engineering Job Simulation on Forage</span>
                    <time className="cert-date" itemProp="datePublished">Dec 2024</time>
                    <ul itemProp="description">
                      <li>Wrote a proposal for a RESTful web service to manage a list of employees.</li>
                      <li>Built a web server application in Java Spring Boot that can accept and respond to HTTP requests as well as support uploading JSON data.</li>
                      <li>Developed and ran a set of unit tests to assess my Java Spring Boot application's performance.</li>
                    </ul>
                  </article>
                  <article className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <span className="cert-chip" itemProp="recognizedBy">NVIDIA DLI</span>
                    <span className="cert-title" itemProp="name">Fundamentals of Deep Learning</span>
                    <time className="cert-date" itemProp="datePublished">May 2025</time>
                    <ul itemProp="description">
                      <li>Gained hands-on experience in training and deploying deep neural networks using TensorFlow and PyTorch.</li>
                      <li>Learned the fundamentals of convolutional neural networks (CNNs), backpropagation, and performance optimization.</li>
                      <li>Completed lab exercises focused on image classification, data augmentation, and model evaluation.</li>
                    </ul>
                  </article>
                  <article className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <span className="cert-chip" itemProp="recognizedBy">Six Sigma</span>
                    <span className="cert-title" itemProp="name">Yellow Belt</span>
                    <ul itemProp="description">
                      <li>Entry-level certification within the Six Sigma methodology</li>
                    </ul>
                  </article>
                  <article className="cert-card" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <span className="cert-chip" itemProp="recognizedBy">Project Management</span>
                    <span className="cert-title" itemProp="name">Foundations of Project Management</span>
                    <ul itemProp="description">
                      <li>Describe project management skills, roles, and responsibilities across a variety of industries</li>
                      <li>Explain the project management life cycle and compare different program management methodologies</li>
                      <li>Define organizational structure and organizational culture and explain how it impacts project management.</li>
                    </ul>
                  </article>
                </div>
              </section>
            </main>
            {isNavOpen && <div className="sidebar-overlay" onClick={() => setIsNavOpen(false)} aria-hidden="true"></div>}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;