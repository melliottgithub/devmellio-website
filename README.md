# DevMellio - AI-Enhanced Business Automation Services

**Live Site:** https://devmellio.com

Modern, elegant landing page for automation services built with 2026 design trends.

## 🚀 Tech Stack

- **Framework:** Vite + React 18
- **Styling:** Tailwind CSS v3
- **Deployment:** AWS S3 + CloudFront
- **CI/CD:** Manual deployment

## 🎨 Design System

- **Resonant Stark** - Calm, elegant, minimal
- **Glassmorphism** - Frosted glass effects
- **Mobile-First** - Optimized for all devices
- **2026 Trends** - Kinetic typography, micro-interactions

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🔧 Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🚀 Deployment

\`\`\`bash
# Build production bundle
npm run build

# Deploy to S3
aws s3 sync dist/ s3://devmellio-site/ --delete
\`\`\`

CloudFront CDN automatically serves the updated files.

---

Built with ❤️ using 2026 design principles
