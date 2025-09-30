# Perplexity-Style Chat Interface

A production-level, industry-standard chat interface inspired by Perplexity, built with React, TypeScript, Vite, and Tailwind CSS.

## How It Works

This chat interface simulates an AI-powered campaign generator that creates personalized marketing campaigns based on:

1. **Data Sources**: Connect to customer data from Shopify (e-commerce), Google Ads Tag (advertising insights), or Facebook Page (social media metrics)
2. **Channels**: Choose delivery methods like Email, SMS, WhatsApp, or Ads
3. **Campaign Idea**: Describe your marketing campaign concept
4. **AI Generation**: The system generates a JSON payload with the right audience, right channel, right message, and right time

### Workflow:
1. Select one or more data sources from the left sidebar
2. Choose one or more channels for campaign delivery
3. Type your campaign idea in the chat input
4. Click "Generate" to see the streaming JSON payload
5. The JSON shows how the AI would target the campaign

## Features
- Modern chat UI with streaming JSON output
- Connect to 3 data sources: Shopify, Google Ads Tag, Facebook Page
- Select 4 channels: Email, SMS, WhatsApp, Ads
- Simulate campaign payload: right time, right channel, right message, right audience
- Reusable components, hooks, and context
- Production best practices

## UI Testing Instructions

### 1. Initial Load Test
- ✅ Page loads at http://localhost:5173/
- ✅ Header shows "Perplexity Chat" with sparkles icon
- ✅ "AI-Powered Campaign Generator" subtitle visible
- ✅ "Production Ready" badge in green
- ✅ Sidebar shows "Data Sources" and "Channels" sections
- ✅ Chat area shows welcome message with CPU icon
- ✅ Input field shows "Describe your campaign idea..." placeholder

### 2. Data Source Selection Test
- ✅ Click on "Shopify" card
- ✅ Card highlights with blue background and checkmark
- ✅ Icon changes to blue
- ✅ Hover effects work (shadow and background change)
- ✅ Select multiple sources (Google Ads Tag, Facebook Page)
- ✅ All selected sources show checkmarks

### 3. Channel Selection Test
- ✅ Click on "Email" card
- ✅ Card highlights with green background and checkmark
- ✅ Icon changes to green
- ✅ Select multiple channels (SMS, WhatsApp, Ads)
- ✅ All selected channels show checkmarks

### 4. Message Input Test
- ✅ Type "Test campaign" in input field
- ✅ "Generate" button becomes enabled
- ✅ Button shows gradient background and airplane icon
- ✅ Press Enter or click "Generate" to send

### 5. JSON Streaming Test
- ✅ User message appears in blue bubble on right
- ✅ System starts streaming JSON character by character
- ✅ JSON builds progressively in white bubble on left
- ✅ Final JSON structure includes:
  - `audience`: Based on selected data sources
  - `channel`: First selected channel
  - `message`: "Special offer for you! 🎉"
  - `time`: Current ISO timestamp
  - `dataSources`: Array of selected sources

### 6. Payload Logic Test
- ✅ Select only "Google Ads Tag" → `audience`: "Google Ads Tag audience"
- ✅ Select "Shopify" + "Facebook Page" → `audience`: "Shopify, Facebook Page audience"
- ✅ Select "SMS" as first channel → `channel`: "SMS"
- ✅ `dataSources` array matches selected sources

### 7. UI Responsiveness Test
- ✅ Resize window to mobile size
- ✅ Sidebar collapses appropriately
- ✅ Chat bubbles adjust width
- ✅ Touch interactions work on mobile

### 8. Animation & Premium Features Test
- ✅ Smooth slide-in animations for messages
- ✅ Gradient backgrounds and backdrop blur
- ✅ Hover effects on cards
- ✅ Loading spinner during generation
- ✅ Streaming pulse animation on JSON

### 9. Accessibility Test
- ✅ Keyboard navigation works (Tab through elements)
- ✅ Screen reader labels present (sr-only classes)
- ✅ Color contrast meets WCAG standards
- ✅ Focus indicators visible

### 10. Error Handling Test
- ✅ Try sending empty message → Button disabled
- ✅ No data sources selected → Uses "General audience"
- ✅ No channels selected → Uses "Email" as default

## Getting Started
1. Clone this repo
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Follow UI testing instructions above

## Folder Structure
- `src/components` - UI components
- `src/hooks` - Custom hooks
- `src/context` - React context for state
- `src/utils` - Utility functions
- `src/types` - TypeScript types

## License
MIT
