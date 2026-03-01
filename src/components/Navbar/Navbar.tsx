"use client";

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // useEffect only runs on the client, so now we can safely show the UI
    // This prevents hydration mismatch errors with next-themes
    useEffect(() => {
        setMounted(true);
    }, []);

    const changeLocale = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) {
        return null; // Return nothing on server to avoid hydration mismatch
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.buttonWrapper}>
                <button
                    onClick={() => changeLocale('en')}
                    className={`${styles.button} ${locale === 'en' ? styles.activeLocale : ''}`}
                >
                    EN
                </button>
                <button
                    onClick={() => changeLocale('vi')}
                    className={`${styles.button} ${locale === 'vi' ? styles.activeLocale : ''}`}
                >
                    VI
                </button>
            </div>

            <button className={styles.button} onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
        </nav>
    );
}
