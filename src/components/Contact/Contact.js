"use client";

import styles from "./Contact.module.css";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <footer id="contact" ref={sectionRef} className={`section ${styles.contact} ${isVisible ? styles.visible : ""}`}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Get In Touch</h2>
                <p className={styles.text}>
                    Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <a href="mailto:hello@example.com" className={styles.button}>
                    Say Hello
                </a>

                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/in/thuongnguyen-it78/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Thuong Nguyen. Built with Next.js.
                </div>
            </div>
        </footer>
    );
}
