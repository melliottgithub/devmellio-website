# AWS Deployment Guide for DevMellio

## 📦 Prerequisites

- AWS account with S3 and CloudFront access
- AWS CLI configured
- Domain: devmellio.com already set up in AWS

## 🚀 Deployment Methods

### Option 1: Manual Deployment (Quick)

```bash
# 1. Build the production bundle
npm run build

# 2. Sync to S3 bucket
aws s3 sync dist/ s3://devmellio.com --delete

# 3. Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 2: GitHub Actions CI/CD (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS S3

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://devmellio.com --delete

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

## 🔑 GitHub Secrets Setup

Using GitHub CLI:

```bash
# Set AWS credentials
gh secret set AWS_ACCESS_KEY_ID
gh secret set AWS_SECRET_ACCESS_KEY
gh secret set CLOUDFRONT_DISTRIBUTION_ID

# Or manually in GitHub:
# Settings → Secrets and variables → Actions → New repository secret
```

## 📋 S3 Bucket Configuration

### Static Website Hosting Settings:

```json
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "index.html"
  }
}
```

### Bucket Policy (Public Read):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::devmellio.com/*"
    }
  ]
}
```

## 🌐 CloudFront Configuration (Recommended)

### Distribution Settings:

- **Origin:** devmellio.com.s3-website-us-east-1.amazonaws.com
- **Viewer Protocol Policy:** Redirect HTTP to HTTPS
- **Compress Objects:** Yes
- **Cache Policy:** CachingOptimized
- **Alternate Domain Names (CNAMEs):** devmellio.com, www.devmellio.com

### Custom Error Responses:

- **Error Code:** 403, 404
- **Response Page Path:** /index.html
- **Response Code:** 200
- **TTL:** 0

## 🔐 SSL Certificate

- Use AWS Certificate Manager (ACM)
- Request certificate for: devmellio.com, *.devmellio.com
- Region: us-east-1 (for CloudFront)
- Validate via DNS (Route 53)

## 📊 Performance Optimizations

### CloudFront Cache Behaviors:

```
Pattern: *.js, *.css, *.png, *.jpg, *.svg, *.woff, *.woff2
TTL: 1 year (31536000 seconds)

Pattern: index.html
TTL: 0 seconds (no cache)
```

### S3 Metadata for Caching:

```bash
# Set cache headers during sync
aws s3 sync dist/ s3://devmellio.com \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html"

aws s3 cp dist/index.html s3://devmellio.com/index.html \
  --cache-control "public,max-age=0,must-revalidate"
```

## 🚦 Deployment Checklist

- [ ] AWS S3 bucket created: devmellio.com
- [ ] Static website hosting enabled
- [ ] Bucket policy allows public read
- [ ] CloudFront distribution created
- [ ] SSL certificate issued and attached
- [ ] DNS (Route 53) points to CloudFront
- [ ] GitHub secrets configured
- [ ] GitHub Actions workflow added
- [ ] Test deployment successful
- [ ] Cache invalidation working
- [ ] HTTPS redirect working
- [ ] www redirect configured

## 📈 Monitoring

### CloudWatch Metrics:
- CloudFront requests
- S3 GET requests
- Error rates
- Data transfer

### Cost Estimation:
- S3: ~$0.023/GB storage
- CloudFront: ~$0.085/GB transfer (first 10TB)
- Route 53: $0.50/hosted zone/month

**Expected monthly cost:** $2-5 for low traffic

## 🔄 Update Process

After making changes:

```bash
# 1. Test locally
npm run dev

# 2. Build
npm run build

# 3. Push to GitHub (auto-deploys via Actions)
git add .
git commit -m "Update: ..."
git push origin main

# OR manual deploy
aws s3 sync dist/ s3://devmellio.com --delete
```

## 🐛 Troubleshooting

### 403 Forbidden Error:
- Check bucket policy
- Verify index.html exists
- Check CloudFront error responses

### Old content showing:
- Invalidate CloudFront cache
- Check cache-control headers
- Clear browser cache

### Build fails:
- Run `npm run build` locally
- Check Node version (should be 18+)
- Verify all dependencies installed

---

**Repository:** https://github.com/melliottgithub/devmellio-website
**Live Site:** https://devmellio.com
