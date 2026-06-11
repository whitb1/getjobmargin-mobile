# GetJobMargin Mobile App

A React Native mobile application built with Expo SDK 51 for contractors to calculate job margins and get AI-powered pricing recommendations.

## Features

- **Trade Selection**: Roofing, HVAC, Plumbing, Electrical, Landscaping, General
- **Cost Breakdown**: Materials, labor, subcontractor, equipment, sales commission, owner time
- **Overhead & Margin Calculation**: Customizable overhead and target margin percentages
- **Save & Compare Jobs**: Store job calculations for future reference
- **AI Margin Advisor**: Locked behind paywall - get smart pricing recommendations
- **Token-Gated Paywall**: Monthly ($19) and Annual ($170) subscription options
- **Dark Theme**: Custom dark theme with accent color #48D2B4
- **Offline Support**: Works without internet connection

## Tech Stack

- React Native with Expo SDK 51
- TypeScript
- Expo Router for navigation
- Stripe for payment processing
- Secure storage for subscription data

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Environment Setup

Create a `.env` file with your Stripe keys:

```
STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
```

## Project Structure

```
getjobmargin/
├── app/
│   ├── _layout.tsx          # Root layout
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── index.tsx       # New job calculator
│   │   └── jobs.tsx        # Saved jobs list
│   ├── paywall/            # Subscription paywall
│   └── advisor/            # AI margin advisor (premium)
├── components/             # Reusable components
├── lib/                    # Utilities and contexts
└── assets/                 # Images and static files
```

## Subscription Plans

- **Monthly**: $19/month (plink_1TbVV4PpWuYRuNqjfUXxJ2zR)
- **Annual**: $170/year (plink_1TbVbFPpWuYRuNqjs4v8NVNc)

## License

Proprietary - All rights reserved
