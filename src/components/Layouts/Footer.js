import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2030 <Link to="/" className="hover:underline">CodeBook™</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* eslint-disable-next-line */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"> 
              <FaFacebook className="w-4 h-4"/>
              <span className="sr-only">Facebook page</span>
            </a>
             {/* eslint-disable-next-line */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaTwitter className="w-4 h-4"/>
              <span className="sr-only">Twitter page</span>
            </a>
             {/* eslint-disable-next-line */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaLinkedin className="w-4 h-4"/>
              <span className="sr-only">Linkedin</span>
            </a>
             {/* eslint-disable-next-line */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaGithub className="w-4 h-4"/>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>

  )
}
