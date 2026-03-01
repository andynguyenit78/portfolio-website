"use client";

import styles from "./Hero.module.css";
import { motion, Variants } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger reveal for each child
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 12 }
        }
    };

    return (
        <section className={`section ${styles.hero}`}>
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p variants={itemVariants} className={styles.greeting}>{t('greeting')}</motion.p>
                <motion.h1 variants={itemVariants} className={styles.name}>{t('name')}</motion.h1>
                <motion.h2 variants={itemVariants} className={styles.title}>{t('title')}</motion.h2>
                <motion.p variants={itemVariants} className={styles.description}>
                    {t('description')}
                </motion.p>

                <motion.div variants={itemVariants} className={styles.ctaGroup}>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className={styles.primaryBtn}
                    >
                        {t('viewWork')}
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className={styles.secondaryBtn}
                    >
                        {t('getInTouch')}
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
