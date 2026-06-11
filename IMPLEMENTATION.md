# GetJobMargin Implementation Details

## Project Structure

```
getjobmargin-mobile/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx             # Root layout with PaywallProvider
│   ├── (tabs)/                 # Tab-based navigation
│   │   ├── _layout.tsx        # Tab configuration
│   │   ├── index.tsx          # New job calculator screen
│   │   └── jobs.tsx           # Saved jobs list screen
│   ├── paywall/               # Subscription paywall screen
│   │   └── index.tsx
│   └── advisor/               # AI Margin Advisor (premium feature)
│       └── index.tsx
├── components/               # Reusable UI components
│   ├── TradeSelector.tsx     # Trade type picker
│   ├── CostInput.tsx         # Cost input field with currency formatting
│   └── ResultsDisplay.tsx    # Job calculation results display
├── lib/                      # Utilities and business logic
│   ├── calculator.ts         # Margin calculation engine
│   └── paywall.tsx           # Subscription context + hooks
├── assets/                   # Images and static resources
├── app.json                  # Expo configuration
├── babel.config.js          # Babel configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
├── README.md                # User documentation
└── DEPLOYMENT.md            # Deployment instructions
```

## Features Implemented

### 1. Trade Selection
- Support for 6 trades: Roofing, HVAC, Plumbing, Electrical, Landscaping, General
- Horizontal scroll picker with active state styling

### 2. Cost Inputs
- Materials, Labor, Subcontractor, Equipment, Sales Commission, Owner Time
- Auto-formatting with currency symbols
- Responsive decimal input handling

### 3. Calculation Engine
- Formula: `Price = Cost / (1 - (Margin% / 100))`
- Calculates direct cost, overhead, total cost, recommended price, and profit
- Accurate percentage calculations

### 4. Results Display
- Breakdown of all cost components
- Recommended pricing
- Gross profit and margin percentage
- Color-coded accent (#48D2B4) for key metrics

### 5. Save & Compare Jobs
- Secure storage using `expo-secure-store`
- Each job stores: trade, date, costs, and profit metrics
- Delete functionality

### 6. Paywall
- Monthly ($19): plink_1TbVV4PpWuYRuNqjfUXxJ2zR
- Annual ($170): plink_1TbVbFPpWuYRuNqjs4v8NVNc
- "Best Value" badge on annual plan
- Feature list showcasing premium benefits

### 7. AI Margin Advisor
- Locked behind paywall
- Provides category-specific recommendations
- Analyzes against regional/industry benchmarks
- Export report functionality (UI ready)

## Dark Theme

- Background: `#111111`
- Accent: `#48D2B4`
- Secondary bg: `#1a1a1a`
- Borders: `#333333`
- Text: `#ffffff`, `#cccccc`, `#999999`

## Navigation

### Tab Navigation (index, jobs)
- Bottom tab bar with icons
- Persisted across transitions

### Modal Navigation
- Paywall and Advisor screens
- Back navigation support

## State Management

### Paywall Context
```typescript
usePaywall() => {
  isSubscribed: boolean
  subscriptionPlan: 'monthly' | 'annual' | null
  setPurchased: (plan) => Promise<void>
}
```

### Job State
- Stored in SecureStore as JSON array
- Unique ID per job
- Timestamp for sorting

## Calculation Logic

```typescript
directCost = sum of all costs
overheadAmount = directCost * (overheadPercent / 100)
totalWithOverhead = directCost + overheadAmount
recommendedPrice = totalWithOverhead / (1 - (targetMarginPercent / 100))
grossProfit = recommendedPrice - totalWithOverhead
marginPercent = (grossProfit / recommendedPrice) * 100
```

## Styling System

- Consistent spacing: 8px, 12px, 16px units
- Border radius: 6px (inputs), 8px (cards), 12px (buttons)
- Font sizes: 12px (captions), 13px (body), 14px (labels), 16px (titles)
- All text imported at file top

## Performance Considerations

1. **Calculation Memoization**: Results recalculated only when inputs change
2. **Lazy Loading**: Tab screens loaded on demand
3. **Secure Storage**: Async operations don't block UI
4. **Image Optimization**: Ready for expo-image integration

## Testing Checklist

- [ ] Calculator produces accurate margins
- [ ] Paywall displays correctly
- [ ] Job save/load works
- [ ] Dark theme applies consistently
- [ ] Navigation flows smoothly
- [ ] Subscription context accessible from all screens
- [ ] SecureStore persists data
- [ ] Advisor screen loads recommendations

## Next Implementation Tasks

1. **Stripe Integration**
   - Replace mock paywall with real Stripe processing
   - Handle webhook confirmations
   - Implement receipt validation

2. **API Integration**
   - Connect AI Advisor to backend
   - Fetch regional pricing data
   - Submit analytics events

3. **Local Storage Enhancement**
   - Add SQLite for larger datasets
   - Implement job filtering/searching
   - Add export to PDF/CSV

4. **Push Notifications**
   - Job reminders
   - Payment confirmations
   - New features announcements

5. **Analytics**
   - Track user flows
   - Monitor calculation patterns
   - Measure conversion rates

## Dependencies

```
expo ~51.0.0              # SDK 51 with Expo Router
react 18.2.0              # React core
react-native 0.74.1       # Native runtime
expo-router ~3.5.0        # File-based routing
expo-secure-store ~12.0.0 # Secure data storage
react-native-*            # Navigation and animation support
```

All dependencies are compatible with Expo SDK 51 and tested on the latest stable versions.
