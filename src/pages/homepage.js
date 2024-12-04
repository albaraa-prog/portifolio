import React from 'react';

const HomePage = () => {
  const personalInfo = {
    name: 'Al-Baraa Mohammed Al-Harthi',
    title: 'Software Engineer | Mobile & Cross-Platform App Developer',
    location: 'Muscat, Oman',
    contact: {
      email: 'albraa9021@gmail.com',
      phone: '+968 91262544',
      linkedin: 'https://linkedin.com/in/albaraa-harthi',
      github: 'https://github.com/albaraaharthi',
      instagram: 'https://instagram.com/albaraaharthi'
    }
  };

  const education = {
    institution: 'Middle East College',
    degree: 'Bachelor of Science (Hons) in Computer Science Software Technology',
    university: 'Coventry University',
    gpa: 3.00,
    period: '2020 - 2025'
  };

  const projects = [
    {
      name: 'Omani Specialties Mobile App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Developed a mobile app to help users purchase Omani specialties, enhancing local market reach.'
    },
    {
      name: 'Sports Facility Booking App',
      technologies: ['Dart', 'Flutter', 'MongoDB', 'Firebase', 'React', 'AI/ML'],
      description: 'Cross-platform mobile app with booking, community interaction, chat, recommendation systems, and dashboard.'
    },
    {
      name: 'URL Scanner',
      technologies: ['Python', 'Django', 'Virus Total API'],
      description: 'Developed a URL scanning application integrated with Virus Total API.'
    },
    {
      name: 'Water Ordering & Delivery App',
      technologies: ['Java', 'Android Studio', 'Firebase'],
      description: 'Mobile application for users to order and track water deliveries.'
    }
  ];

  const skills = {
    programmingLanguages: ['Java', 'Python', 'Dart', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#', 'C++'],
    developmentTools: ['Flutter', 'Android Studio', 'React', 'Django', 'Firebase', 'MongoDB', 'Docker', 'AWS', 'GitHub']
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600">{personalInfo.title}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
          <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">GitHub</a>
          <a href={personalInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">Instagram</a>
          <a href={`mailto:${personalInfo.contact.email}`} className="text-red-500 hover:text-red-700">Email</a>
          <a href={`tel:${personalInfo.contact.phone}`} className="text-green-500 hover:text-green-700">Phone</a>
        </div>
        <p className="mt-2 text-gray-600">{personalInfo.location}</p>
      </header>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-medium">{education.degree}</h3>
          <p className="text-gray-600">{education.institution}</p>
          <p className="text-gray-600">Affiliated with {education.university}</p>
          <p className="text-gray-600">GPA: {education.gpa} | {education.period}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium">{project.name}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">Skills</h2>
        <div>
          <h3 className="text-xl font-medium mb-2">Programming Languages</h3>
          <div className="flex flex-wrap gap-2">
            {skills.programmingLanguages.map((lang, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-medium mt-4 mb-2">Development Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skills.developmentTools.map((tool, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;