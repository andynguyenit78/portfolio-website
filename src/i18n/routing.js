import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'vi'];
export const defaultLocale = 'en';

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'as-needed' // Only adds /vi prefix, leaves /en as default without prefix
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
