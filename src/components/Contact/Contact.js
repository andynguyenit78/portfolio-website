"use client";

import styles from "./Contact.module.css";
import { motion } from "framer-motion";

export default function Contact() {

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="contact" className={`section ${styles.contact}`}>
            <motion.div
                className={`container ${styles.container}`}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2 className={styles.title}>Get In Touch</h2>
                <p className={styles.text}>
                    Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:hello@example.com"
                    className={styles.button}
                >
                    Say Hello
                </motion.a>

                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/in/thuongnguyen-it78/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Thuong Nguyen. Built with Next.js & Framer Motion.
                </div>
            </motion.div>
        </section>
    );
}
