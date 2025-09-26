import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-300 via-green-200 to-green-100 text-gray-800 py-6 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">

        {/* Branding */}
        <div className="flex items-center gap-2 text-xl font-bold text-green-700">
          ♻️ Recyclify
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/SambhavJI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-110"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/sambhav-trivedi-9918792b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 transition-transform transform hover:scale-110"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:sambhavtrivedi84@gmail.com"
            className="text-gray-800 hover:text-yellow-500 transition-transform transform hover:scale-110"
          >
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/trivedi_sambhav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-600 text-sm mt-4 md:mt-0 text-center md:text-left">
          © {new Date().getFullYear()} Recyclify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
