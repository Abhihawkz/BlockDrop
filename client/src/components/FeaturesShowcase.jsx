import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SignUpButton } from "@clerk/clerk-react";



const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [particleAnimation, setParticleAnimation] = useState(false);
  const containerRef = useRef(null);



  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % mainFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Trigger particle animation
  useEffect(() => {
    const timer = setTimeout(() => setParticleAnimation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const mainFeatures = [
    {
      icon: "🔒",
      title: "AES-GCM Encryption",
      description:
        "Files are encrypted client-side using military-grade AES-GCM encryption with PBKDF2 key derivation (1000 iterations) before upload.",
      highlight: "Client-side encryption",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
    },
    {
      icon: "🛡️",
      title: "Strong Password Policy",
      description:
        "Enforces minimum 20-character passwords with uppercase requirements, plus SHA-256 hashing for secure storage.",
      highlight: "20+ char minimum",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500",
    },
    {
      icon: "📤",
      title: "Drag & Drop Upload",
      description:
        "Intuitive file upload with drag-and-drop support, visual progress tracking, and 20MB file size limit for optimal performance.",
      highlight: "20MB max size",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500",
    },
    {
      icon: "📧",
      title: "Email-Based Sharing",
      description:
        "Secure file sharing through validated email addresses with built-in verification - passwords never sent via email.",
      highlight: "Privacy first",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500",
    },
  ];

  const stats = [
    {
      number: "25+",
      label: "File Formats",
      icon: "📁",
      color: "from-orange-400 to-red-500",
    },
    {
      number: "AES-256",
      label: "Encryption",
      icon: "🔐",
      color: "from-blue-400 to-purple-500",
    },
    {
      number: "20MB",
      label: "Max Upload",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500",
    },
    {
      number: "SHA-256",
      label: "Password Hash",
      icon: "🛟",
      color: "from-green-400 to-blue-500",
    },
  ];

  const securityFeatures = [
    {
      title: "Client-Side Encryption",
      desc: "Files encrypted before leaving your device",
      icon: "🔐",
    },
    {
      title: "PBKDF2 Key Derivation",
      desc: "1000 iterations for secure key generation",
      icon: "🔑",
    },
    {
      title: "Password Never Shared",
      desc: "Copy-paste passwords manually for security",
      icon: "🔒",
    },
    {
      title: "Format Validation",
      desc: "Automatic file type and size checking",
      icon: "✅",
    },
  ];

  const supportedFormats = [
    "PDF",
    "DOCX",
    "DOC",
    "XLS",
    "XLSX",
    "CSV",
    "TXT",
    "RTF",
    "HTML",
    "ZIP",
    "MP3",
    "M4A",
    "WMA",
    "MPG",
    "FLV",
    "AVI",
    "JPG",
    "JPEG",
    "PNG",
    "GIF",
    "PPT",
    "PPTX",
    "WAV",
    "MP4",
    "M4V",
    "WMV",
    "EPUB",
  ];

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  const GlowingOrb = ({ size = "w-4 h-4", delay = "0s" }) => (
    <div
      className={`${size} rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 animate-ping`}
      style={{ animationDelay: delay }}
    />
  );

  return (
    <div
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 overflow-hidden"
    >
      <FloatingParticles />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Spectacular Header Section */}
        <div className="text-center mb-20" data-animate id="header">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.header
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-7xl font-bold mb-6 max-sm:text-4xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent animate-pulse">
              Why Choose{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  EncryptShare
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-25 animate-pulse"></div>
              </span>
              ?
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade file sharing with client-side encryption and
              zero-knowledge architecture
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {[...Array(4)].map((_, i) => (
                <GlowingOrb key={i} delay={`${i * 0.5}s`} />
              ))}
            </div>
          </div>
        </div>

        {/* Spectacular Stats Section */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          data-animate
          id="stats"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative text-center p-8 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 cursor-pointer transform ${
                isVisible.stats
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } ${
                hoveredStat === index ? "scale-110 rotate-1" : "hover:scale-105"
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
                transform: `translateY(${isVisible.stats ? 0 : 40}px) scale(${
                  hoveredStat === index ? 1.1 : 1
                }) rotateY(${mousePosition.x / 100}deg)`,
              }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl"
                style={{ background: `linear-gradient(135deg, ${stat.color})` }}
              ></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div
                  className="text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                  {stat.label}
                </div>
              </div>

              {/* Animated border */}
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                style={{
                  background: `linear-gradient(135deg, ${stat.color})`,
                  padding: "2px",
                }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mind-blowing Interactive Features Section */}
        <div
          className="grid lg:grid-cols-2 gap-16 mb-20"
          data-animate
          id="features"
        >
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.features
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h3 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white flex items-center">
              <span className="mr-4 text-5xl animate-pulse">🛡️</span>
              Security Features
            </h3>
            <div className="space-y-6">
              {mainFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-2xl scale-105 rotate-1`
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${
                      isVisible.features ? 0 : 20
                    }px) scale(${activeFeature === index ? 1.05 : 1}) rotateY(${
                      mousePosition.x / 200
                    }deg)`,
                  }}
                >
                  {/* Glowing effect for active feature */}
                  {activeFeature === index && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-50 animate-pulse"></div>
                  )}

                  <div className="relative z-10 flex items-center space-x-6">
                    <div
                      className={`text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ${
                        activeFeature === index ? "animate-bounce" : ""
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold mb-2 flex items-center">
                        {feature.title}
                        {activeFeature === index && (
                          <span className="ml-2 animate-pulse">✨</span>
                        )}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${
                          activeFeature === index
                            ? "text-blue-100"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold transform group-hover:scale-110 transition-transform duration-300 ${
                        activeFeature === index
                          ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                          : "bg-blue-100 text-blue-600 border border-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:border-blue-800"
                      }`}
                    >
                      {feature.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spectacular Visual Demo Area */}
          <div
            className={`flex items-center justify-center transform transition-all duration-1000 ${
              isVisible.features
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Main feature display */}
              <div
                className={`w-96 h-96 bg-gradient-to-br ${mainFeatures[activeFeature].color} rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-1000 hover:scale-110`}
                style={{
                  transform: `rotateY(${mousePosition.x / 50}deg) rotateX(${
                    mousePosition.y / 50
                  }deg) scale(${isVisible.features ? 1 : 0.8})`,
                }}
              >
                <div className="text-center text-white relative z-10">
                  <div className="text-8xl mb-6 animate-pulse transform hover:scale-125 transition-transform duration-300">
                    {mainFeatures[activeFeature].icon}
                  </div>
                  <h4 className="text-3xl font-bold mb-4">
                    {mainFeatures[activeFeature].title}
                  </h4>
                  <div className="w-20 h-1 bg-white/50 mx-auto rounded-full"></div>
                </div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floating orbital elements */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute -top-6 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-lg">
                  🚀
                </div>
                <div className="absolute top-1/2 -right-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-2xl animate-pulse shadow-lg">
                  ✨
                </div>
                <div
                  className="absolute -bottom-6 left-1/2 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-lg"
                  style={{ animationDelay: "0.5s" }}
                >
                  💎
                </div>
                <div
                  className="absolute top-1/2 -left-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl animate-pulse shadow-lg"
                  style={{ animationDelay: "1s" }}
                >
                  🔮
                </div>
              </div>

              {/* Progress indicators */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {mainFeatures.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeFeature === index
                        ? "bg-white scale-125"
                        : "bg-white/30"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stunning Security Features Grid */}
        <div className="mb-20" data-animate id="security">
          <h3
            className={`text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center transform transition-all duration-1000 ${
              isVisible.security
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span
              className="mr-4 text-5xl animate-spin"
              style={{ animationDuration: "3s" }}
            >
              🔐
            </span>
            Advanced Security Architecture
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 ${
                  isVisible.security
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  transform: `translateY(${
                    isVisible.security ? 0 : 40
                  }px) rotateY(${mousePosition.x / 200}deg)`,
                }}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                        {feature.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-900 dark:text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover effect particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spectacular File Formats Section */}
        <div className="mb-20" data-animate id="formats">
          <h3
            className={`text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center transform transition-all duration-1000 ${
              isVisible.formats
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="mr-4 text-5xl animate-bounce">📁</span>
            Supported File Formats
          </h3>
          <div
            className={`bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-1000 ${
              isVisible.formats
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-xl">
              Upload and share{" "}
              <span className="text-blue-600 font-bold">
                25+ different file types
              </span>{" "}
              securely
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {supportedFormats.map((format, index) => (
                <span
                  key={index}
                  className="group inline-block px-4 py-2 text-sm font-medium bg-blue-100 text-blue-600 rounded-full border border-blue-200 hover:border-blue-400 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-800 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-rotate-1"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    transform: `scale(${isVisible.formats ? 1 : 0.8})`,
                  }}
                >
                  {format}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Epic Call-to-Action */}
        <div
          className={`text-center relative overflow-hidden rounded-3xl p-16 transform transition-all duration-1000 ${
            isVisible.formats
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          data-animate
          id="cta"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-500/90 to-blue-700/90"></div>

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-white/20 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 text-white">
            <h3 className="text-5xl font-bold mb-6 animate-pulse">
              Ready to Experience Secure Sharing?
            </h3>
            <p className="text-2xl mb-12 opacity-90 leading-relaxed">
              Your files are encrypted before they leave your device - we never
              see your data
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <SignUpButton>
                  <button className="group relative px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 text-lg">
                    <span className="flex items-center justify-center space-x-3">
                    <span className="text-2xl group-hover:animate-bounce">🚀</span>
                    <span>Start Sharing Now</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
               </SignUpButton>

              <Link to="/Aboutus">
                <button className="group relative px-10 py-5 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 text-lg">
                  <span className="flex items-center justify-center space-x-3">
                    <span className="text-2xl group-hover:animate-spin">
                      📖
                    </span>
                    <span>Learn More</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;
