# Deployment Guide

## Production Deployment

**Domain**: https://devmellio.com
**S3 Bucket**: `devmellio-site`
**Region**: us-east-1

## Deploy Command

```bash
# From project root
cd /home/kllmm/workspace/domains/upwork-project-analyzer/website-project/quick-start-v1

# Build production bundle
npm run build

# Deploy to S3
aws s3 sync dist/ s3://devmellio-site --delete
```

## One-Line Deploy

```bash
cd /home/kllmm/workspace/domains/upwork-project-analyzer/website-project/quick-start-v1 && npm run build && aws s3 sync dist/ s3://devmellio-site --delete
```

## What Gets Deployed

- **HTML**: index.html (minified)
- **CSS**: Tailwind bundle (~25KB gzipped)
- **JS**: React app + vendor bundle (~204KB total, ~62KB gzipped)
- **Assets**: favicon, robots.txt, sitemap.xml, vite.svg
- **Compression**: Brotli (.br) and Gzip (.gz) versions included

## CloudFront (if configured)

If there's a CloudFront distribution in front of the S3 bucket, you may need to invalidate the cache:

```bash
# Find the distribution ID
aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'devmellio.com')]].Id" --output text

# Invalidate cache
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

## Backend API

**API Gateway URL**: https://w3o3gzmmwa.execute-api.us-east-1.amazonaws.com/prod/contact
**Contact**: Integrated in ContactForm.jsx (line 86)

## Architecture

- **Frontend**: React 18 + Vite + TailwindCSS
- **Hosting**: S3 Static Website Hosting
- **Backend**: AWS Lambda + API Gateway + DynamoDB
- **Email**: AWS SES (sent to user + devmellio@gmail.com)
- **AI**: OpenAI GPT-4 for contact form analysis

## Post-Deployment Checklist

- [ ] Visit https://devmellio.com and verify site loads
- [ ] Test Hero section scroll buttons
- [ ] Submit contact form and verify AI analysis displays
- [ ] Check email (both user and owner) for notifications
- [ ] Verify responsive design on mobile
- [ ] Check browser console for errors

## Last Deployed

**Date**: 2025-10-24
**Changes**:
- Added backend API integration to contact form
- Added AI-powered analysis display
- Added loading overlay on form submission
- Fixed timeline display format
- Added form input clearing on success
