import React, { useEffect, useState } from 'react';
import './Home.css';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const personalInfo = {
    name: 'Al-Baraa Mohammed Al-Harthi',
    title: 'Software Engineer | Mobile & Cross-Platform App Developer',
    location: 'Muscat, Oman',
    contact: {
      email: 'albraa9021@gmail.com',
      linkedin: 'https://linkedin.com/in/albaraa-harthi',
      github: 'https://github.com/albaraaharthi',
      instagram: 'https://instagram.com/albaraaharthi',
    },
  };

  const education = {
    institution: 'Middle East College',
    degree: 'Bachelor of Science (Hons) in Computer Science (Software Technology)',
    university: 'Coventry University',
    gpa: 3.00,
    period: '2020 - 2025',
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
    developmentTools: ['Flutter', 'Android Studio', 'React', 'Django', 'Firebase', 'MongoDB', 'GitHub'],
  };

  useEffect(() => {
    // Add animation to project cards
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">Al Baraa Al Harthi</div>
          <div className="nav-links">
            <a href="#header" className="nav-link">Home</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#Games" className="nav-link">Games</a>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      <div className="container">
        {/* Header */}
        <header id="header" className="header">
          <h1>{personalInfo.name}</h1>
          <p>{personalInfo.title}</p>
          <div className="social-links">
            <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
            <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
            <a href={personalInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="link">Instagram</a>
            <a href={`mailto:${personalInfo.contact.email}`} className="link">Email</a>
          </div>
          <p className="location">{personalInfo.location}</p>
        </header>

        {/* Education */}
        <section id="education">
          <h2>Education</h2>
          <div>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
            <p>Affiliated with {education.university}</p>
            <p>GPA: {education.gpa} | {education.period}</p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                style={{
                  "--delay": `${index * 0.2}s`, // Stagger animation by 0.2s for each card
                }}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tags-container">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills">
          <h2>Skills</h2>
          <div>
            <h3>Programming Languages</h3>
            <div className="tags-container">
              {skills.programmingLanguages.map((lang, index) => (
                <span key={index} className="tech-tag">
                  {lang}
                </span>
              ))}
            </div>
            <h3>Development Tools</h3>
            <div className="tags-container">
              {skills.developmentTools.map((tool, index) => (
                <span key={index} className="tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Games */}
        <section id="Games">
          <h2>Play a Game</h2>
          <p>Want to play Tic Tac Toe?</p>
          <a href="/tictac" className="link">Play Tic Tac Toe</a>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
