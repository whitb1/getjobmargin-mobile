# GetJobMargin Mobile - Deployment Guide

## Build for Production

### Prerequisites
- Node.js 18+ 
- Expo CLI: `npm install -g expo-cli@latest`
- EAS CLI: `npm install -g eas-cli@latest`
- iOS/Android development tools (for local builds)

### Step 1: Configure Credentials

```bash
# Create .env file with production keys
cp .env.example .env
# Edit .env with your Stripe API keys
```

### Step 2: Set Up Expo Application Services (EAS)

```bash
# Link project to Expo
npx eas-cli@latest init

# Configure EAS build
npx eas-cli@latest build --platform all
```

### Step 3: Build APK (Android) / IPA (iOS)

#### Android APK Build
```bash
npx eas-cli@latest build --platform android --type apk
```

#### iOS Build
```bash
npx eas-cli@latest build --platform ios
```

### Step 4: Submit to App Stores

#### Google Play Store
```bash
eas submit --platform android --latest
```

#### Apple App Store
```bash
eas submit --platform ios --latest
```

## Development Build

For testing with Expo Go:

```bash
npm start

# Scan QR code with Expo Go app on phone
```

## Stripe Configuration

### 1. Add Stripe Keys to EAS Secrets

```bash
eas secret:create --scope project --name STRIPE_PUBLIC_KEY
eas secret:create --scope project --name STRIPE_SECRET_KEY
```

### 2. Update app.json to use secrets

```json
{
  "expo": {
    "plugins": [
      ["@stripe/stripe-react-native", {
        "publishableKey": "$STRIPE_PUBLIC_KEY"
      }]
    ]
  }
}
```

## Architecture Notes

- **Dark Theme**: Primary bg #111111, accent #48D2B4
- **Navigation**: Expo Router (file-based routing)
- **Storage**: Expo SecureStore for subscription data
- **State**: React Context for paywall state
- **Calculations**: Pure TypeScript utility functions

## Testing Stripe Payments

Use Stripe test mode credentials:
- Test card: `4242 4242 4242 4242`
- Any future date for expiry
- Any 3-digit CVC

## Performance Optimization

- Lazy-load route screens with `React.lazy()`
- Use `useMemo` for calculation results
- Optimize images with `expo-image`
- Monitor bundle size: `expo build:web --analyze`

## Troubleshooting

### Build Fails with "package not found"
Run `npm install` and ensure package-lock.json is not outdated

### Stripe integration issues
Verify Stripe keys are correct in `.env` and EAS secrets

### Navigation not working
Clear cache: `expo start -c`

## Next Steps

1. Complete Stripe integration with payment processing
2. Add local job storage with SQLite
3. Implement AI advisor API integration
4. Add analytics tracking
5. Set up continuous deployment with GitHub Actions
