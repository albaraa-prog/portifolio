import React, { useEffect, useState } from 'react';
import './Style.css';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Preloader state
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 300); // Small delay to ensure smooth transition
    }, 3000);
  }, []);
  // Toggle Sidebar Navigation
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Copy Email to Clipboard
  const handleEmailCopy = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    alert('Email copied to clipboard!');
  };

  const personalInfo = {
    name: 'Al Baraa Mohammed Al Harthi',
    title: 'Software Engineer | AI/ML |Mobile & Cross-Platform App Developer',
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
  };

  const projects = [
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
      name: 'URL Scanner',
      technologies: ['Python', 'Django', 'Virus Total API'],
      description: 'Developed a URL scanning application integrated with Virus Total API.',
    },
    {
      name: 'Water Ordering & Delivery App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Mobile application for users to order and track water deliveries.',
    },
  ];

  const skills = {
    programmingLanguages: ['Java', 'Python', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#'],
    developmentTools: ['Flutter', 'Android Studio', 'VS Code', 'React', 'Django', 'Firebase', 'MongoDB', 'GitHub', 'TenserFlow', '.Net'],
  };

  return (
    <div className={`home-page ${isDarkMode ? 'dark' : ''}`}>
      {/* Preloader Animation */}
      {isLoading && (
        <div className="preloader">
          <h1 className="preloader-text">Jack of all cards, master of one</h1>
        </div>
      )}

      {!isLoading && (
        <>
         <div className={`content ${isContentVisible ? 'fade-up' : ''}`}></div>
          {/* Sidebar */}
          <nav className={`sidebar ${isNavOpen ? 'open' : ''}`}>
  <ul className="nav-links">
    <li>
      <button onClick={toggleTheme} className="nav-link" aria-label="Toggle theme">
        {isDarkMode ? 'Light Mode ☀' : 'Dark Mode 🌙'}
      </button>
    </li>
    <li>
      <a href="#header" className="nav-link" role="link">
        Home
      </a>
    </li>
    <li>
      <a href="#education" className="nav-link" role="link">
        Education
      </a>
    </li>
    <li>
      <a href="#projects" className="nav-link" role="link">
        Projects
      </a>
    </li>
    <li>
      <a href="#skills" className="nav-link" role="link">
        Skills
      </a>
    </li>
    <li>
      <a href="#Games" className="nav-link" role="link">
        Games
      </a>
    </li>
  </ul>
</nav>


          {/* Navbar Toggle Button */}
          <button className="nav-toggle" onClick={toggleNav}>
            {isNavOpen ? '✖' : '☰'}
          </button>

          {/* Main Content */}
          <div className="container">
            {/* Header */}
            <header id="header" className="header">
              <h1>{personalInfo.name}</h1>
              <p>{personalInfo.title}</p>
              <div className="social-links">
                <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
                <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
                <a href={personalInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="link">Instagram</a>
                <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleEmailCopy(); }}>
                  {personalInfo.contact.email}
                </a>
              </div>
              <p className="location">{personalInfo.location}</p>
            </header>

            {/* Education Section */}
            <section id="education">
              <h2>Education</h2>
              <div>
                <h3>{education.degree}</h3>
                <p>{education.institution}</p>
                <p>{education.university}</p>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects">
              <h2>Projects</h2>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={index} className="project-card" style={{ "--delay": `${index * 0.2}s` }}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="tags-container">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills">
              <h2>Skills</h2>
              <h3>Programming Languages</h3>
              <div className="tags-container">
                {skills.programmingLanguages.map((lang, index) => (
                  <span key={index} className="tech-tag">{lang}</span>
                ))}
              </div>
              <h3>Development Tools</h3>
              <div className="tags-container">
                {skills.developmentTools.map((tool, index) => (
                  <span key={index} className="tool-tag">{tool}</span>
                ))}
              </div>
            </section>

            {/* Games Section */}
            <section id="Games">
              <h2>Play A Game</h2>
              <h3>2D</h3>
              
              <a href="/snake" className="tech-tag">Play Snake Game</a>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
