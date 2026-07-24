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
const cvPdf = `${import.meta.env.BASE_URL}Al_Baraa_Al_Harthi.pdf`;

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
    document.title = 'AL-BARAA MOHAMMED AL-HARTHI - Software Engineer | B.Sc. | AI/ML';

    const pageUrl = window.location.href.split('#')[0];
    const imageUrl = new URL(photo, window.location.origin).href;

    const metaTags = [
      {
        name: 'description',
        content:
          'AL-BARAA MOHAMMED AL-HARTHI is a Software Engineer with a B.Sc. in Computer Science (Coventry University) and AI/ML practitioner based in Muscat, Oman with expertise in React, Unity, Flutter, Spring Boot, PHP, and applied Deep Learning.',
      },
      {
        name: 'keywords',
        content:
          'AL-BARAA MOHAMMED AL-HARTHI, Software Engineer, AI ML, B.Sc. Computer Science, React Developer, Flutter Developer, Spring Boot, Unity, Muscat Oman, Middle East College, Digital Dimension',
      },
      { name: 'author', content: 'AL-BARAA MOHAMMED AL-HARTHI' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'en' },
      { property: 'og:title', content: 'AL-BARAA MOHAMMED AL-HARTHI - Software Engineer | B.Sc. | AI/ML' },
      {
        property: 'og:description',
        content:
          'Portfolio of AL-BARAA MOHAMMED AL-HARTHI featuring full-stack software engineering, high-scale cross-platform applications, mobile development, and AI/ML research.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'AL-BARAA MOHAMMED AL-HARTHI Portfolio' },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'AL-BARAA MOHAMMED AL-HARTHI' },
      {
        name: 'twitter:description',
        content:
          'Software Engineer with a B.Sc. in Computer Science and AI/ML practitioner focused on scalable software products and applied machine learning.',
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
      name: 'AL-BARAA MOHAMMED AL-HARTHI',
      jobTitle: 'Software Engineer',
      description:
        'Software Engineer with a B.Sc. in Computer Science and AI/ML practitioner experienced in React, Unity, Flutter, Spring Boot, PHP, and Deep Learning.',
      url: pageUrl,
      image: imageUrl,
      email: 'albraa9021@gmail.com',
      telephone: '+968 91262544',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Muscat',
        postalCode: '122',
        addressCountry: 'OM',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Middle East College, Muscat',
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
    name: 'AL-BARAA MOHAMMED AL-HARTHI',
    title: 'Software Engineer | B.Sc. | AI/ML',
    summary:
      'Software Engineer with a B.Sc. (Hons) in Computer Science, specializing in high-concurrency cross-platform applications, full-stack ecosystems, multimedia streaming platforms, and applied AI/ML deep learning frameworks.',
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
    period: '2021 – 2026',
    gpa: '3.5',
    activity: 'Google Developers Group: Technical Lead',
  };

  const experiences = [
    {
      organization: 'Digital Dimension',
      role: 'Software Development Manager',
      period: '2026 – Present',
      bullets: [
        'Leading software development operations and managing engineering execution across active projects.',
        'Directing team workflows, architecture standards, and production release delivery.',
      ],
    },
    {
      organization: 'Omani Archive',
      role: 'Full-stack Developer Team Lead',
      period: '2025 – 2026',
      bullets: [
        'Spearheaded full-stack engineering teams in delivering archive platform features and user services.',
        'Managed frontend and backend service integration, architecture flow, and feature delivery.',
      ],
    },
    {
      organization: 'AL NAHDA Training Institute',
      role: 'Game Developer',
      period: '2025 – 2026',
      bullets: [
        'Designed and engineered interactive gameplay features using Unity and C#.',
        'Worked on hands-on game development modules aligned with practical training programs.',
      ],
    },
    {
      organization: 'Rihal',
      role: 'Software Engineer (Intern)',
      period: '2025 – 2025',
      bullets: [
        'Contributed during the Spark to Code internship program in a professional engineering environment.',
        'Strengthened software delivery, team collaboration, and modern development workflows.',
      ],
    },
    {
      organization: 'Omani Archive',
      role: 'Full-Stack Developer (Intern)',
      period: '2025 – 2025',
      bullets: [
        'Developed responsive web interfaces and backend API components for archival document management.',
        'Supported platform implementation and feature maintenance before advancing to Team Lead.',
      ],
    },
    {
      organization: 'Freelancer',
      role: 'Self-Employed',
      period: '2024 – Present',
      bullets: [
        'Delivering independent software work across web, mobile, LMS, and AI-assisted workflows.',
        'Executing client projects with a focus on usability, scalable backend integrations, and clean design.',
      ],
    },
    {
      organization: 'Injaz Oman',
      role: 'Head of Research & Development',
      period: '2024 – 2025',
      bullets: [
        'Spearheaded research and development strategy for cross-platform innovation products.',
        'Led technical execution and product design throughout national competition entries.',
      ],
    },
  ];

  const projects = [
    {
      name: 'High-Scale Cross-Platform Application (Maintenance & Operations)',
      category: 'Professional Project',
      technologies: ['Unity', 'C#', 'Flutter', 'React', 'Firebase', 'Google Play & App Store'],
      description:
        'Managed the end-to-end maintenance and optimization of a high-concurrency production application serving over 100,000 users. Spearheaded infrastructure stability and feature deployment across mobile and web environments.',
      url: '',
    },
    {
      name: 'Multimedia Streaming Ecosystem',
      category: 'Professional Project',
      technologies: ['Flutter', 'Firebase', 'Google Play & App Store'],
      description:
        'Engineered a comprehensive multimedia streaming platform for a local media entity, ensuring low-latency delivery and cross-platform accessibility.',
      url: '',
    },
    {
      name: 'Islamic Education Learning Management System (LMS)',
      category: 'Professional Project',
      technologies: ['PHP', 'Yii2', 'Hostinger', 'Thawani Payment Gateway'],
      description:
        'Architected a scalable Udemy-style web application for course management, integrating secure third-party payment processing for subscription and content delivery.',
      url: '',
    },
    {
      name: 'Loyalty & Discount Platform',
      category: 'Professional Project',
      technologies: ['Flutter', 'Hostinger'],
      description:
        'Developed a location-aware point-collection mobile application, implementing automated logic for real-time voucher generation and redemption.',
      url: '',
    },
    {
      name: 'Machine Learning Framework for Automated Lithology Recognition',
      category: 'Research & Academic Project',
      technologies: ['TensorFlow', 'PyTorch', 'ResNet34', 'ResNet50', 'Python'],
      description:
        'Developed an automated classification framework for geological analysis using deep CNN architectures, focusing on sustainable eco-engineering applications.',
      url: '',
    },
    {
      name: 'Appointment Booking System',
      category: 'Research & Academic Project',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      description:
        'Collaborative development of a robust scheduling ecosystem to streamline user appointment management.',
      url: 'https://github.com/mozaalismaili/AppointmentScheduler',
    },
  ];

  const publications = [
    {
      title:
        'A Hierarchical Deep Learning Framework for Automated Rock and Stone Classification: Architecture, Deployment, and Evaluation',
      venue: 'ICADAAI 2026',
      description:
        'Peer-reviewed research publication presenting deep learning architecture, edge deployment strategy, and performance evaluation for automated geological material classification.',
    },
  ];

  const skillGroups = [
    {
      title: 'Programming Languages',
      items: ['Java', 'Python', 'Visual Basic', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#', 'PHP'],
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
        'Unreal Engine',
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
      recognizedBy: 'AL NAHDA Training Institute',
      name: 'Video Games with Unity Engine',
      date: 'February 2026',
    },
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
    []
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
            <img src={photo} alt="AL-BARAA MOHAMMED AL-HARTHI professional headshot" className="profile-photo" itemProp="image" />
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
            <h2 id="projects-heading"><FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />Professional & Academic Projects</h2>
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
                  <span className="exp-chip" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{project.category}</span>
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
                    <p className="project-link muted">Featured Project</p>
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
