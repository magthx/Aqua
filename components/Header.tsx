import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
export default function Header() {
  return (
    <>
      <header className="flex justify-center p-2 items-center">
        <div className="bg-white/20 backdrop-blur-md border border-white/10 shadow-lg p-2 rounded-full ">

          <ul className="flex gap-5 items-center">
            <li>
              <a
                href="https://github.com/magthx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 
               hover:bg-blue-500 hover:text-white transition-colors duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/dylanthx/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 
               hover:bg-blue-500 hover:text-white transition-colors duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
            </li>

            <li>
              <a href="https://www.linkedin.com/in/dylan-magall%C3%B3n-565bb5326/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 
               hover:bg-blue-500 hover:text-white transition-colors duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </li>

            <li>
              <a href="https://www.linkedin.com/in/dylan-magall%C3%B3n-565bb5326/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 
               hover:bg-blue-500 hover:text-white transition-colors duration-300">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </li>

          </ul>

        </div>
      </header>
    </>
  )
}