import React from "react"
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="w-full bg-white text-black py-5 px-8 gap-4 flex-col sm:flex-row flex justify-between items-center border-t border-b-[#e6ebf4]">
            <div className="text-[1.4rem] sm:text-2xl flex gap-6 cursor-pointer">
                <FaGithub
                    className="opacity-80 hover:opacity-100 active:opacity-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        window.open("https://github.com/KingShivamX", "_blank")
                    }
                />
                <FaLinkedin
                    className="opacity-80 hover:opacity-100 active:opacity-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        window.open(
                            "https://www.linkedin.com/in/shivamhippalgave",
                            "_blank"
                        )
                    }
                />
                <FaYoutube
                    className="opacity-80 hover:opacity-100 active:opacity-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        window.open(
                            "https://www.youtube.com/@KingShivamX/featured",
                            "_blank"
                        )
                    }
                />
                <FaTwitter
                    className="opacity-80 hover:opacity-100 active:opacity-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        window.open(
                            "https://www.twitter.com/KingShivamX",
                            "_blank"
                        )
                    }
                />
                <FaInstagram
                    className="opacity-80 hover:opacity-100 active:opacity-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        window.open(
                            "https://www.instagram.com/sivazx",
                            "_blank"
                        )
                    }
                />
            </div>
            <p className="text-[0.9rem] sm:text-base text-[#383b3d]">
                © {new Date().getFullYear()} Closed AI. No rights reserved sad.
            </p>
        </footer>
    )
}

export default Footer
