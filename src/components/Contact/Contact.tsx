"use client";

import styles from "./Contact.module.css";
import { motion, Variants } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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
                <h2 className={styles.title}>{t('title')}</h2>
                <p className={styles.text}>
                    {t('text')}
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:hello@example.com"
                    className={styles.button}
                >
                    {t('button')}
                </motion.a>

                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/in/thuongnguyen-it78/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} {t('copyright')}
                </div>
            </motion.div>
        </section>
    );
}
