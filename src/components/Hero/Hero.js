"use client";

import styles from "./Hero.module.css";
import { useEffect, useState } from "react";

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={`section ${styles.hero} ${mounted ? styles.mounted : ""}`}>
            <div className="container">
                <p className={styles.greeting}>Hi, I am</p>
                <h1 className={styles.name}>Thuong Nguyen.</h1>
                <h2 className={styles.title}>Front-End Developer.</h2>
                <p className={styles.description}>
                    I build clean, modern, and engaging digital experiences. Currently crafting solutions at FPT Software.
                </p>
                <div className={styles.ctaGroup}>
                    <a href="#projects" className={styles.primaryBtn}>View My Work</a>
                    <a href="#contact" className={styles.secondaryBtn}>Get In Touch</a>
                </div>
            </div>
        </section>
    );
}
