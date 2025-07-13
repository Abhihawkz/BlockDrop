import React, { useState, useEffect } from 'react';

const Aboutus = () => {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    files: 0,
    countries: 0,
    uptime: 0
  });

  // Animate numbers on component mount
  useEffect(() => {
    const targets = { users: 12000, files: 58000, countries: 57, uptime: 99.9 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = Object.keys(targets).map(key => {
      const target = targets[key];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(intervals.find(i => i === intervals[Object.keys(targets).indexOf(key)]));
        }
        setAnimatedStats(prev => ({
          ...prev,
          [key]: key === 'uptime' ? current.toFixed(1) : Math.floor(current)
        }));
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const team = [
    {
      name: "Abhishek Nalatawad",
      role: "CEO & Co-Founder",
      bio: "Former cybersecurity engineer at Google with 10+ years in data protection.",
      linkedin: "https://www.linkedin.com/in/abhisheknalatawad/"
    },
    {
      name: "Karthik B",
      role: "CTO & Co-Founder",
      bio: "Ex-Amazon architect specializing in scalable cloud infrastructure.",
      linkedin: "#"
    },
    {
      name: "Chandan G",
      role: "Head of Security",
      bio: "PhD in Cryptography, published researcher in quantum-resistant encryption.",
      linkedin: "#"
    }
  ];

  const timeline = [
    { year: "2020", title: "The Problem", desc: "Two engineers frustrated with insecure file sharing at work" },
    { year: "2021", title: "First Lines of Code", desc: "Built MVP with military-grade encryption in a garage" },
    { year: "2022", title: "First Million Users", desc: "Reached 1M users and launched enterprise features" },
    { year: "2023", title: "Global Expansion", desc: "Deployed servers across 6 continents" },
    { year: "2024", title: "Industry Recognition", desc: "Named 'Best Security Innovation' by TechCrunch" },
    { year: "2025", title: "The Future", desc: "Pioneering quantum-resistant encryption for tomorrow" }
  ];

  const values = [
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your data belongs to you. We built our entire architecture around zero-knowledge principles."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We're constantly pushing boundaries in encryption technology and user experience."
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Secure file sharing should be available to everyone, everywhere, anytime."
    },
    {
      icon: "🤝",
      title: "Trust",
      description: "Transparency in our processes and commitment to user security builds lasting relationships."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 max-md:text-4xl">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Born from a simple belief: everyone deserves secure, private file sharing without compromise. 
              Here's how we're making that vision a reality.
            </p>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-bounce"></div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                It Started with a Problem
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  In 2020, Abhishek and Karthik were working at different tech companies when they both experienced the same frustration: 
                  <strong className="text-blue-600 dark:text-blue-400"> sharing sensitive files securely was unnecessarily complicated</strong>.
                </p>
                <p>
                  Existing solutions either compromised on security or were too complex for everyday use. 
                  They believed there had to be a better way—one that didn't force users to choose between convenience and privacy.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">That weekend, they started coding.</strong> 
                  What began as a weekend project in Chandans's garage has grown into a platform trusted by over a million users worldwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Impact Today</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{animatedStats.users.toLocaleString()}+</div>
                    <div className="text-blue-100">Trusted Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{animatedStats.files.toLocaleString()}+</div>
                    <div className="text-blue-100">Files Shared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{animatedStats.countries}+</div>
                    <div className="text-blue-100">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{animatedStats.uptime}%</div>
                    <div className="text-blue-100">Uptime</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl animate-spin-slow">
                ⚡
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 max-lg:left-8"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} max-lg:flex-row`}>
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} max-lg:ml-16`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 max-lg:left-8"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            The principles that guide every decision we make and every line of code we write.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            The passionate people behind EncryptShare, dedicated to making secure file sharing accessible to everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div> */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <a 
                    href={member.linkedin}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="mr-2">Connect</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              To democratize secure file sharing by making enterprise-grade encryption accessible, 
              affordable, and effortless for individuals and organizations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Join Our Mission
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;