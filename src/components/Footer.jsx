import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-400 via-green-200 to-green-100 text-gray-800 py-6 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        
        {/* Branding */}
        <div className="text-xl font-bold text-green-700 flex items-center gap-2">
          ♻️ Recyclify
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-gray-800">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:youremail@example.com"
            className="hover:text-yellow-500 transition-colors"
          >
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-600 text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} Recyclify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
