import React, { useEffect, useState } from 'react';
import { FaBookOpen, FaBriefcase, FaCertificate, FaCode, FaStar } from 'react-icons/fa';
import photo from '../assets/photo.png';
import './Style.css';

// Toast component
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="toast-message" onClick={onClose}>
      {message}
    </div>
  );
}

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Preloader state
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [toast, setToast] = useState("");

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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Copy Email to Clipboard
  const handleEmailCopy = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    showToast('Email copied to clipboard!');
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
    <>
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
        {/* Preloader Animation */}
        {isLoading && (
          <div className="preloader">
            <h1 className="preloader-text">Jack of all cards, master of one</h1>
          </div>
        )}

        {!isLoading && (
          <>
            <div className={`content ${isContentVisible ? 'fade-up' : ''}`}></div>
            <Toast message={toast} onClose={() => setToast("")} />
            {/* Sidebar */}
            <nav className={`sidebar ${isNavOpen ? 'open' : ''}`}>
              <ul className="nav-links">
                <li>
                  <a href="portifolio/#header" className="nav-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="portifolio/#education" className="nav-link">
                    Education
                  </a>
                </li>
                <li>
                  <a href="portifolio/#experience" className="nav-link">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="portifolio/#projects" className="nav-link">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="portifolio/#skills" className="nav-link">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="portifolio/#certifications" className="nav-link">
                    Licenses & Certifications
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
                <img src={photo} alt="Profile" className="profile-photo" />
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
                <h2><FaBookOpen size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Education</h2>
                <div>
                  <h3>{education.degree}</h3>
                  <p>{education.institution}</p>
                  <p>{education.university}</p>
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience">
                <h2><FaBriefcase size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Experience</h2>
                <div className="experience-cards">
                  <div className="exp-card">
                    <span className="exp-chip">Oman Archive</span>
                    <span className="exp-role">Full-Stack developer Intern</span>
                    <span className="exp-date">2025 - present</span>
                  </div>
                  <div className="exp-card">
                    <span className="exp-chip">Google Developers Group</span>
                    <span className="exp-role">Technical Lead</span>
                    <span className="exp-date">2024 - present</span>
                  </div>
                  <div className="exp-card">
                    <span className="exp-chip">Buslah</span>
                    <span className="exp-role">Manager of Research and Development, Part-time</span>
                    <span className="exp-date">2024 - 2025 (1 year)</span>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects">
                <h2><FaCode size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Projects</h2>
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
                <h2><FaStar size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Skills</h2>
                <h3>Programming Languages</h3>
                <div className="tags-container">
                  {skills.programmingLanguages.map((lang, index) => (
                    <span key={index} className="tool-tag">{lang}</span>
                  ))}
                </div>
                <h3>Development Tools</h3>
                <div className="tags-container">
                  {skills.developmentTools.map((tool, index) => (
                    <span key={index} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </section>

              {/* Licenses & Certifications Section */}
              <section id="certifications">
                <h2><FaCertificate size={48} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />Licenses & Certifications</h2>
                <div className="cert-cards">
                  <div className="cert-card">
                    <span className="cert-chip">Electronic Arts</span>
                    <span className="cert-title">Software Engineering virtual experience program on Forage</span>
                    <span className="cert-date">Nov 2024</span>
                    <ul>
                      <li>Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders.</li>
                      <li>Built a class diagram and created a header file in C++ with class definitions for each object.</li>
                      <li>Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.</li>
                    </ul>
                  </div>
                  <div className="cert-card">
                    <span className="cert-chip">Hewlett Packard Enterprise</span>
                    <span className="cert-title">Software Engineering Job Simulation on Forage</span>
                    <span className="cert-date">Dec 2024</span>
                    <ul>
                      <li>Wrote a proposal for a RESTful web service to manage a list of employees.</li>
                      <li>Built a web server application in Java Spring Boot that can accept and respond to HTTP requests as well as support uploading JSON data.</li>
                      <li>Developed and ran a set of unit tests to assess my Java Spring Boot application's performance.</li>
                    </ul>
                  </div>
                  <div className="cert-card">
                    <span className="cert-chip">NVIDIA DLI</span>
                    <span className="cert-title">Fundamentals of Deep Learning</span>
                    <span className="cert-date">May 2025</span>
                    <ul>
                      <li>Gained hands-on experience in training and deploying deep neural networks using TensorFlow and PyTorch.</li>
                      <li>Learned the fundamentals of convolutional neural networks (CNNs), backpropagation, and performance optimization.</li>
                      <li>Completed lab exercises focused on image classification, data augmentation, and model evaluation.</li>
                    </ul>
                  </div>
                  <div className="cert-card">
                    <span className="cert-chip">Six Sigma</span>
                    <span className="cert-title">Yellow Belt</span>
                    <ul>
                      <li>Entry-level certification within the Six Sigma methodology</li>
                    </ul>
                  </div>
                  <div className="cert-card">
                    <span className="cert-chip">Project Management</span>
                    <span className="cert-title">Foundations of Project Management</span>
                    <ul>
                      <li>Describe project management skills, roles, and responsibilities across a variety of industries</li>
                      <li>Explain the project management life cycle and compare different program management methodologies</li>
                      <li>Define organizational structure and organizational culture and explain how it impacts project management.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
