import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaBookOpen,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLanguage,
  FaPhone,
  FaStar,
} from 'react-icons/fa';
import './Style.css';

const photo = `${import.meta.env.BASE_URL}photo.jpg`;
const cvPdf = `${import.meta.env.BASE_URL}Al%20Baraa%20Al%20Harthi.pdf`;

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

function SEOHead() {
  useEffect(() => {
    document.title = 'Al Baraa Mohammed Al Harthi - Software Engineer | AI/ML';

    const pageUrl = window.location.href.split('#')[0];
    const imageUrl = new URL(photo, window.location.origin).href;

    const metaTags = [
      {
        name: 'description',
        content:
          'Al Baraa Mohammed Al Harthi is a Software Engineer, Computer Science student, and AI/ML practitioner based in Muscat, Oman with experience across React, Flutter, Spring Boot, and applied machine learning.',
      },
      {
        name: 'keywords',
        content:
          'Al Baraa Mohammed Al Harthi, Software Engineer, AI ML, Computer Science Student, React Developer, Flutter Developer, Spring Boot, Muscat Oman, Middle East College, Digital Dimension',
      },
      { name: 'author', content: 'Al Baraa Mohammed Al Harthi' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'en' },
      { property: 'og:title', content: 'Al Baraa Mohammed Al Harthi - Software Engineer | AI/ML' },
      {
        property: 'og:description',
        content:
          'Portfolio of Al Baraa Mohammed Al Harthi featuring full-stack software engineering, mobile development, and AI/ML projects.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Al Baraa Al Harthi Portfolio' },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Al Baraa Mohammed Al Harthi' },
      {
        name: 'twitter:description',
        content:
          'Software Engineer, Computer Science student, and AI/ML builder focused on full-stack and mobile products.',
      },
      { name: 'twitter:image', content: imageUrl },
    ];

    metaTags.forEach((tag) => {
      const selector = tag.name
        ? `meta[name="${tag.name}"]`
        : `meta[property="${tag.property}"]`;
      const existingTag = document.querySelector(selector);
      if (existingTag) {
        existingTag.remove();
      }

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
    canonicalLink.setAttribute('href', pageUrl);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Al Baraa Mohammed Al Harthi',
      jobTitle: 'Software Engineer',
      description:
        'Software Engineer, Computer Science student, and AI/ML practitioner with experience in React, Flutter, Spring Boot, and machine learning.',
      url: pageUrl,
      image: imageUrl,
      email: 'albraa9021@gmail.com',
      telephone: '+96891262544',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Muscat',
        postalCode: '122',
        addressCountry: 'OM',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Middle East College',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Digital Dimension',
      },
      knowsLanguage: ['Arabic', 'English'],
      sameAs: [
        'https://www.linkedin.com/in/al-baraa-al-harthi-740340212',
        'https://github.com/albaraa-prog',
        'https://albaraa-prog.github.io/portifolio/',
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [isAppBarHidden, setIsAppBarHidden] = useState(false);

  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  const personalInfo = {
    name: 'Al Baraa Mohammed Al Harthi',
    title: 'Software Engineer | Computer Science Student | AI/ML',
    summary:
      'Building full-stack, mobile, and AI-powered products with a focus on practical delivery, clean user experiences, and research-backed engineering.',
    location: 'Muscat, 122, Oman',
    languages: ['Arabic', 'English'],
    contact: {
      email: 'albraa9021@gmail.com',
      phone: '+968 91262544',
      linkedin: 'https://www.linkedin.com/in/al-baraa-al-harthi-740340212',
      github: 'https://github.com/albaraa-prog',
      portfolio: 'https://albaraa-prog.github.io/portifolio/',
    },
  };

  const education = {
    institution: 'Middle East College, Muscat',
    degree: 'Bachelor of Science (Hons) in Computer Science Software Technology',
    university: 'Coventry University',
    period: '2021 - 2026',
    gpa: '3.5',
    activity: 'Google Developers Group: Technical Lead',
  };

  const experiences = [
    {
      organization: 'Digital Dimension',
      role: 'Software Development Manager',
      period: '2026 - Present',
      bullets: [
        'Leading software delivery and coordinating engineering execution across active product work.',
        'Supporting planning, architecture discussions, and implementation quality for production-ready applications.',
      ],
    },
    {
      organization: 'Omani Archive',
      role: 'Full-Stack Developer Team Lead',
      period: 'July 2025 - January 2026 · 5 months',
      bullets: [
        'Led full-stack delivery across React + Vite frontend work and backend service coordination.',
        'Managed team collaboration, implementation flow, and feature execution from planning to delivery.',
      ],
    },
    {
      organization: 'AL NAHDA Training Institute',
      role: 'Game Developer',
      period: 'August 2025 - January 2026 · 6 months',
      bullets: [
        'Built gameplay features and interactive experiences using Unity and C#.',
        'Worked on hands-on game development tasks aligned with practical training projects.',
      ],
    },
    {
      organization: 'Rihal',
      role: 'Software Engineer Intern',
      period: 'July 2025 - August 2025 · 2 months',
      bullets: [
        'Contributed during the Spark to Code internship program in a professional engineering environment.',
        'Strengthened delivery, collaboration, and modern software development workflow skills.',
      ],
    },
    {
      organization: 'Omani Archive',
      role: 'Full-Stack Developer Intern',
      period: 'April 2025 - June 2025 · 3 months',
      bullets: [
        'Supported application development across frontend and backend tasks before progressing into a team lead role.',
        'Helped implement features and maintain momentum on a growing full-stack product.',
      ],
    },
    {
      organization: 'Freelancer',
      role: 'Self-employed',
      period: '2024 - Present',
      bullets: [
        'Delivering independent software work across web, mobile, and automation-focused solutions.',
        'Exploring client-ready ideas that blend product design, implementation, and AI-assisted workflows.',
      ],
    },
  ];

  const projects = [
    {
      name: 'Appointment Booking System',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      description:
        'Collaborated on an appointment booking platform that allows users to schedule, manage, and track appointments efficiently.',
      url: 'https://github.com/mozaalismaili/AppointmentScheduler',
    },
    {
      name: 'Machine Learning Framework for Automated Lithology Recognition',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'ResNet34', 'ResNet50'],
      description:
        'Developed a machine learning framework for automated lithology recognition using deep CNN architectures for sustainable eco-engineering research.',
      url: '',
    },
    {
      name: 'Cross-Platform Mobile Application for Sports Facility Bookings',
      technologies: ['Dart', 'Flutter', 'MongoDB', 'Firebase', 'React', 'AI/ML'],
      description:
        'Built a sports facility booking app with booking flows, community interaction, chat, recommendations, and dashboard experiences.',
      url: '',
    },
    {
      name: 'Injaz Oman Competition 2023/2024',
      technologies: ['Research & Development', 'Product Strategy', 'Cross-Platform App'],
      description:
        'Led the research and development team and helped drive the creation of a cross-platform application during the competition.',
      url: '',
    },
  ];

  const publications = [
    {
      title:
        'A Hierarchical Deep Learning Framework for Automated Rock and Stone Classification: Architecture, Deployment, and Evaluation',
      venue: 'ICADAAI 2026',
      description:
        'Research publication focused on deep learning architecture, deployment strategy, and evaluation for automated geological material classification.',
    },
  ];

  const skillGroups = [
    {
      title: 'Programming Languages',
      items: ['Java', 'Python', 'Visual Basic', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#'],
    },
    {
      title: 'Development Tools',
      items: [
        'Flutter',
        'Android Studio',
        'React',
        'Django',
        'Firebase',
        'MongoDB',
        'Docker',
        'GitHub/Git',
        'StarUML',
        'Visual Studio',
        'Visual Studio Code',
        'Anaconda',
        'Cursor',
        'Unity',
      ],
    },
    {
      title: 'Design & Media',
      items: ['DaVinci Resolve', 'Blender', 'Inkscape', 'OBS', 'MS 365'],
    },
    {
      title: 'Languages',
      items: personalInfo.languages,
    },
  ];

  const certifications = [
    {
      recognizedBy: 'freeCodeCamp',
      name: 'JavaScript Algorithms and Data Structures',
      date: 'September 2025',
    },
    {
      recognizedBy: 'freeCodeCamp',
      name: 'Machine Learning with Python',
      date: 'July 2025',
    },
    {
      recognizedBy: 'freeCodeCamp',
      name: 'Responsive Web Design',
      date: 'February 2025',
    },
    {
      recognizedBy: 'LinkedIn',
      name: 'Start and Manage a Small Business',
      date: 'December 2024',
    },
    {
      recognizedBy: 'LinkedIn',
      name: 'Change Management Foundations',
      date: 'November 2024',
    },
    {
      recognizedBy: 'Forage',
      name: 'Electronic Arts Software Engineering Virtual Experience Program',
      date: 'November 2024',
    },
    {
      recognizedBy: 'Forage',
      name: 'Hewlett Packard Enterprise Software Engineering Job Simulation',
      date: 'December 2024',
    },
    {
      recognizedBy: 'NVIDIA Deep Learning Institute (DLI)',
      name: 'Fundamentals of Deep Learning',
      date: 'May 2025',
    },
    {
      recognizedBy: '6sigmastudy',
      name: 'Six Sigma Yellow Belt',
      date: 'September 2021',
    },
    {
      recognizedBy: 'Google',
      name: 'Foundations of Project Management',
      date: 'November 2021',
    },
    {
      recognizedBy: 'Moscow Institute of Physics and Technology',
      name: 'Technical Writing',
      date: 'November 2021',
    },
  ];

  const headerMeta = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: personalInfo.contact.phone,
      href: 'tel:+96891262544',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: personalInfo.contact.email,
      action: handleEmailCopy,
    },
    {
      icon: FaLanguage,
      label: 'Languages',
      value: personalInfo.languages.join(' | '),
    },
  ];

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2500);
  }

  function handleEmailCopy() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(personalInfo.contact.email);
      showToast('Email copied to clipboard!');
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = personalInfo.contact.email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Email copied to clipboard!');
  }

  useEffect(() => {
    function handleClick(event) {
      if (
        isNavOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsAppBarHidden(true);
      } else {
        setIsAppBarHidden(false);
      }
      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 1.5 + Math.random() * 2,
      })),
    [],
  );

  return (
    <>
      <SEOHead />

      <div className="space-bg">
        <div className="wave">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{ top: `${star.top}vh`, left: `${star.left}vw`, animationDuration: `${star.duration}s` }}
          />
        ))}
      </div>

      <div className="home-page dark">
        <Toast message={toast} onClose={() => setToast('')} />

        <button
          ref={toggleRef}
          className="nav-toggle mobile-only"
          onClick={() => setIsNavOpen((value) => !value)}
          aria-label={isNavOpen ? 'Close sidebar navigation' : 'Open sidebar navigation'}
          aria-expanded={isNavOpen}
        >
          {isNavOpen ? '✕' : '☰'}
        </button>

        <nav className={`app-bar desktop-only ${isAppBarHidden ? 'hidden' : ''}`} role="navigation" aria-label="Main navigation">
          <div className="app-bar-content">
            <a href="#header" className="nav-link">About</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#publication" className="nav-link">Publication</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#certifications" className="nav-link">Certifications</a>
          </div>
        </nav>

        <nav ref={sidebarRef} className={`sidebar mobile-only ${isNavOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
          <ul className="nav-links">
            <li><a href="#header" className="nav-link" onClick={() => setIsNavOpen(false)}>About</a></li>
            <li><a href="#education" className="nav-link" onClick={() => setIsNavOpen(false)}>Education</a></li>
            <li><a href="#experience" className="nav-link" onClick={() => setIsNavOpen(false)}>Experience</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setIsNavOpen(false)}>Projects</a></li>
            <li><a href="#publication" className="nav-link" onClick={() => setIsNavOpen(false)}>Publication</a></li>
            <li><a href="#skills" className="nav-link" onClick={() => setIsNavOpen(false)}>Skills</a></li>
            <li><a href="#certifications" className="nav-link" onClick={() => setIsNavOpen(false)}>Certifications</a></li>
          </ul>
        </nav>

        <main className="container" role="main">
          <header id="header" className="header liquid" itemScope itemType="https://schema.org/Person">
            <img src={photo} alt="Al Baraa Mohammed Al Harthi professional headshot" className="profile-photo" itemProp="image" />
            <h1 itemProp="name">{personalInfo.name}</h1>
            <p className="hero-title" itemProp="jobTitle">{personalInfo.title}</p>
            <p className="hero-summary">{personalInfo.summary}</p>

            <div className="header-meta" aria-label="Key profile details">
              {headerMeta.map(({ icon: Icon, label, value, href, action }) => (
                <div key={label} className="meta-pill">
                  <Icon aria-hidden="true" />
                  <span className="meta-copy">
                    <strong>{label}</strong>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {value}
                      </a>
                    ) : action ? (
                      <button type="button" className="meta-action" onClick={action}>
                        {value}
                      </button>
                    ) : (
                      <span>{value}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <nav className="social-links" aria-label="Professional links">
              <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link" aria-label="LinkedIn profile">LinkedIn</a>
              <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="link" aria-label="GitHub profile">GitHub</a>

              <a href={cvPdf} download="Al Baraa Al Harthi.pdf" className="link cv-download" aria-label="Download CV">
                <FaDownload size={16} style={{ marginRight: '0.5rem' }} />
                Download CV
              </a>
            </nav>

            <p className="location" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Muscat</span>, <span itemProp="postalCode">122</span>, <span itemProp="addressCountry">Oman</span>
            </p>
          </header>

          <section id="education" className="liquid" aria-labelledby="education-heading">
            <h2 id="education-heading"><FaBookOpen size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Education</h2>
            <div className="section-copy" itemScope itemType="https://schema.org/EducationalOrganization">
              <h3 itemProp="name">{education.degree}</h3>
              <p>{education.institution}</p>
              <p itemProp="parentOrganization">{education.university}</p>
              <p><strong>GPA:</strong> {education.gpa}</p>
              <p><strong>Period:</strong> {education.period}</p>
              <p><strong>Activities:</strong> {education.activity}</p>
            </div>
          </section>

          <section id="experience" className="liquid" aria-labelledby="experience-heading">
            <h2 id="experience-heading"><FaBriefcase size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Experience</h2>
            <div className="experience-cards">
              {experiences.map((experience, index) => (
                <article
                  key={`${experience.organization}-${experience.role}`}
                  className="exp-card liquid"
                  style={{ '--delay': index + 1 }}
                  itemScope
                  itemType="https://schema.org/OrganizationRole"
                >
                  <span className="exp-chip" itemProp="memberOf">{experience.organization}</span>
                  <span className="exp-role" itemProp="roleName">{experience.role}</span>
                  <time className="exp-date">{experience.period}</time>
                  <ul className="exp-details">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="liquid" aria-labelledby="projects-heading">
            <h2 id="projects-heading"><FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Projects & Participation</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article
                  key={project.name}
                  className="project-card liquid"
                  tabIndex={0}
                  style={{ '--delay': `${index * 0.2}s`, cursor: project.url ? 'pointer' : 'default' }}
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                  onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && project.url) {
                      window.open(project.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <h3 itemProp="name">{project.name}</h3>
                  <p itemProp="description">{project.description}</p>
                  <div className="tags-container" itemProp="programmingLanguage">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="tech-tag">{technology}</span>
                    ))}
                  </div>
                  {project.url ? (
                    <p className="project-link"><FaExternalLinkAlt size={16} aria-hidden="true" /> View project</p>
                  ) : (
                    <p className="project-link muted">Portfolio highlight</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="publication" className="liquid" aria-labelledby="publication-heading">
            <h2 id="publication-heading"><FaFileAlt size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Publication</h2>
            <div className="experience-cards publication-grid">
              {publications.map((publication, index) => (
                <article key={publication.title} className="exp-card publication-card liquid" style={{ '--delay': index + 1 }}>
                  <span className="exp-chip">{publication.venue}</span>
                  <h3 className="publication-title">{publication.title}</h3>
                  <p className="publication-description">{publication.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="liquid" aria-labelledby="skills-heading">
            <h2 id="skills-heading"><FaStar size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Languages & Tools</h2>
            <div itemScope itemType="https://schema.org/Person">
              {skillGroups.map((group) => (
                <div key={group.title} className="skills-group">
                  <h3>{group.title}</h3>
                  <div className="tags-container">
                    {group.items.map((item) => (
                      <span key={item} className="tool-tag" itemProp="knowsAbout">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="certifications" className="liquid" aria-labelledby="certifications-heading">
            <h2 id="certifications-heading"><FaCertificate size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Licenses & Certifications</h2>
            <div className="cert-cards">
              {certifications.map((certification, index) => (
                <article
                  key={`${certification.recognizedBy}-${certification.name}`}
                  className="cert-card liquid"
                  style={{ '--delay': index + 1 }}
                  itemScope
                  itemType="https://schema.org/EducationalOccupationalCredential"
                >
                  <span className="cert-chip" itemProp="recognizedBy">{certification.recognizedBy}</span>
                  <span className="cert-title" itemProp="name">{certification.name}</span>
                  <time className="cert-date" itemProp="datePublished">{certification.date}</time>
                </article>
              ))}
            </div>
          </section>
        </main>

        {isNavOpen && <div className="sidebar-overlay" onClick={() => setIsNavOpen(false)} aria-hidden="true"></div>}
      </div>
    </>
  );
};

export default HomePage;

