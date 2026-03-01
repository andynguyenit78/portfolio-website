# Thuong Nguyen - Portfolio Website

A modern, high-performance portfolio website built with **Next.js 15 (App Router)**, **TypeScript**, and **Framer Motion**. Features a custom 3D spherical particle background using the HTML5 Canvas API and full internationalization (i18n) support.

## 🚀 Key Features

- **Next.js App Router**: Optimized routing and server-side rendering.
- **Strict TypeScript**: 100% type-safe codebase with zero explicit `any` types.
- **Internationalization (i18n)**: Seamless English (`/en`) and Vietnamese (`/vi`) locale switching mapped to localized JSON dictionaries.
- **Dynamic Dark/Light Mode**: Integrated `next-themes` that intelligently flips color variables and updates the 3D particle Canvas real-time.
- **Interactive 3D Background**: A fully custom sphere of particles mathematically distributed via the Fibonacci algorithm that rotates based on mouse proximity.
- **Framer Motion Animations**: Smooth orchestrations, staggered reveals, and interactive hover states.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19, App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (CSS-in-JS scoped specifically for component isolation) & CSS Variables
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas API
- **i18n**: [`next-intl`](https://next-intl-docs.vercel.app/)
- **Theming**: [`next-themes`](https://github.com/pacocoursey/next-themes)

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andynguyenit78/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The app will automatically redirect you to `/en` or `/vi` based on your system preferences.

## 📋 Development Conventions

### Strict Typing Requirements
Every `.js` file has been migrated to `.tsx` or `.ts`. When adding new components:
- Do not use implicit `any`. 
- Define robust `interface` types for all component props.
- When relying on `useTranslations('Key').raw`, explicitly cast the returned arrays to a defined interface type (e.g. `as ProjectItem[]`).

### Commit Messaging
This repository adheres to the **Conventional Commits** specification. Please format your commit messages appropriately to ensure clear repository histories:
- `feat:` for new features (e.g., `feat(ui): add new contact form`)
- `fix:` for bug fixes (e.g., `fix(i18n): resolve hydration mismatch on theme toggle`)
- `chore:` for maintenance logic (e.g., `chore: update dependencies`)
- `docs:` for documentation updates (e.g., `docs: update README conventions`)
- `style:` for formatting/CSS tweaks (e.g., `style: adjust hero typography weight`)

### CSS Architecture
We rely entirely on `.module.css` for scoping Component styles and `globals.css` for root variables. Let's avoid installing heavy frameworks like Tailwind; stick to standard CSS to maintain precision over layout mechanics, specifically for `z-index` and complex CSS Grid behaviors. 

## 🌐 Deploy on Vercel
The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Any pushes to the `main` branch trigger a production deployment automatically.
