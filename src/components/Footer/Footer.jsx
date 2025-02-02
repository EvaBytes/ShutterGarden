import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">© {new Date().getFullYear()} My ShutterGarden. All rights reserved.</p>
            <div className="social-icons">
                <a
                    href="https://www.linkedin.com/in/eva-sevillano-plata-664043153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin className="social-icon" />
                </a>
                <a
                    href="https://github.com/EvaBytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <FaGithub className="social-icon" />
                </a>
            </div>
        </footer>
    );
};
