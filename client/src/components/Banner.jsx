import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; 

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated SVG component
  const AnimatedShareSVG = () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-50 to-indigo-100 rounded-full blur-2xl opacity-60 animate-pulse"></div>
      <svg
        width="400"
        height="384"
        viewBox="0 0 400 384"
        className="relative z-10 drop-shadow-lg animate-float max-sm:w-80 max-sm:h-80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Central sharing hub */}
        <circle
          cx="200"
          cy="192"
          r="35"
          fill="url(#shareGradient)"
          filter="url(#glow)"
          className="animate-pulse-gentle"
        />
        
        {/* File icons around the hub */}
        <g className="animate-rotate-slow origin-center">
          {/* Document icon */}
          <g transform="translate(200, 100)">
            <rect x="-12" y="-15" width="24" height="30" rx="3" fill="#3B82F6" opacity="0.9" className="animate-bounce-gentle">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
            </rect>
            <rect x="-8" y="-10" width="16" height="2" fill="white" opacity="0.8"/>
            <rect x="-8" y="-6" width="12" height="2" fill="white" opacity="0.8"/>
            <rect x="-8" y="-2" width="14" height="2" fill="white" opacity="0.8"/>
          </g>
          
          {/* Image icon */}
          <g transform="translate(300, 192)">
            <rect x="-12" y="-12" width="24" height="24" rx="3" fill="#1D4ED8" opacity="0.9" className="animate-bounce-gentle delay-700">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
            </rect>
            <circle cx="-4" cy="-4" r="3" fill="white" opacity="0.8"/>
            <path d="M-10,4 L-2,-4 L6,4 Z" fill="white" opacity="0.6"/>
          </g>
          
          {/* Video icon */}
          <g transform="translate(200, 284)">
            <rect x="-12" y="-10" width="24" height="20" rx="3" fill="#1E40AF" opacity="0.9" className="animate-bounce-gentle delay-1400">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
            </rect>
            <polygon points="-4,-4 -4,4 4,0" fill="white" opacity="0.8"/>
          </g>
          
          {/* Music icon */}
          <g transform="translate(100, 192)">
            <circle cx="0" cy="0" r="12" fill="#2563EB" opacity="0.9" className="animate-bounce-gentle delay-2100">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
            </circle>
            <path d="M-4,-8 L4,-6 L4,2 C4,5 2,6 0,6 C-2,6 -4,5 -4,2 C-4,-1 -2,-2 0,-2 L4,-2" 
                  stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
          </g>
        </g>
        
        {/* Connecting lines with animation */}
        <g className="animate-pulse-gentle">
          <line x1="200" y1="157" x2="200" y2="135" stroke="#3B82F6" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
          </line>
          <line x1="235" y1="192" x2="265" y2="192" stroke="#3B82F6" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
          </line>
          <line x1="200" y1="227" x2="200" y2="249" stroke="#3B82F6" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
          </line>
          <line x1="165" y1="192" x2="135" y2="192" stroke="#3B82F6" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
          </line>
        </g>
        
        {/* Subtle particles */}
        <g className="animate-float-gentle">
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={120 + (i * 32)}
              cy={80 + Math.sin(i * 0.8) * 20}
              r="1.5"
              fill="#3B82F6"
              opacity="0.4"
              className="animate-ping-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="flex justify-center items-center max-w-7xl mx-auto pt-5 max-sm:flex-col max-sm:px-5 max-sm:gap-y-5">
        {/* Image Section */}
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <AnimatedShareSVG />
        </div>

        {/* Content Section */}
        <div className={`flex flex-col gap-y-5 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <h1 className="text-5xl font-bold max-lg:text-4xl max-sm:text-3xl text-gray-900 animate-fade-in-up">
            The Only Tool You Need To Send Your Files{" "}
            <span className="text-blue-500 animate-color-pulse">Securely</span>
          </h1>
          
          <p className="text-xl font-bold text-gray-600 animate-fade-in-up delay-500">
            Send your files and photos{" "}
            <span className="uppercase text-blue-500 animate-bounce-text">securely</span>{" "}
            with EncryptShare{" "}
            <span className="uppercase text-blue-500 animate-bounce-text delay-200">anytime</span>{" "}
            and{" "}
            <span className="uppercase text-blue-500 animate-bounce-text delay-400">anywhere</span>{" "}
            in the world.
          </p>

          {/* Feature highlights */}
          <div className="flex items-center gap-4 text-sm text-gray-600 animate-fade-in-up delay-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
              <span>No file size limits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
              <span>Instant sharing</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes color-pulse {
          0%, 100% { color: #3B82F6; }
          50% { color: #1D4ED8; }
        }
        
        @keyframes bounce-text {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.4; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 30s linear infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-color-pulse { animation: color-pulse 2s ease-in-out infinite; }
        .animate-bounce-text { animation: bounce-text 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1400 { animation-delay: 1400ms; }
        .delay-2100 { animation-delay: 2100ms; }
      `}</style>
    </div>
  );
};

export default Banner;