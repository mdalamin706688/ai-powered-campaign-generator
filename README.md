# AI-Powered Campaign Generator

<a href="https://mdalamin706688.github.io/markopolo-ai-full-stack-challenge/" target="_blank"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=github" alt="Live Demo"></a>

A production-ready, dynamic AI-powered campaign generator with persistent chat history, built with React, TypeScript, Vite, and Tailwind CSS. Simulates streaming JSON payloads for marketing campaigns based on data sources, channels, and user prompts.

## 🚀 Quick Test Prompts

Try these 5 diverse prompts with their sidebar selections to see the dynamic explanation system in action:

### 🧪 Test Prompt 1: Re-engagement Campaign
**Sidebar Selections:**
- Data Source: Shopify
- Channel: Email

**Prompt:** "Create a re-engagement campaign for customers who haven't purchased in 30 days, offering 15% off their next order"

### 🎯 Test Prompt 2: Promotional Flash Sale
**Sidebar Selections:**
- Data Source: Facebook Page
- Channel: WhatsApp

**Prompt:** "Launch a flash sale announcement for our new product line targeting engaged followers with a limited-time 20% discount"

### 🎄 Test Prompt 3: Seasonal Holiday Campaign
**Sidebar Selections:**
- Data Source: Shopify
- Channel: Email, SMS

**Prompt:** "Create a holiday promotion campaign for Black Friday with tiered discounts: 10% for email subscribers, 15% for SMS opt-ins"

### 🆕 Test Prompt 4: New Customer Acquisition
**Sidebar Selections:**
- Data Source: Google Ads Tag
- Channel: Ads

**Prompt:** "Run an acquisition campaign to attract new customers interested in eco-friendly products with a welcome discount"

### 💎 Test Prompt 5: Customer Retention Program
**Sidebar Selections:**
- Data Source: Shopify
- Channel: Email, WhatsApp

**Prompt:** "Build a loyalty retention program for our top 10% customers with exclusive early access and personalized recommendations"

## How It Works

This chat interface generates professional marketing campaign payloads by analyzing:

1. **Data Sources**: Customer data from Shopify (e-commerce), Google Ads Tag (advertising insights), or Facebook Page (social media metrics)
2. **Channels**: Delivery methods like Email, SMS, WhatsApp, or Ads
3. **Campaign Idea**: Natural language description of your marketing campaign
4. **AI Generation**: Creates a structured JSON payload with audience segments, workflow steps, tracking, compliance, and success criteria

### Workflow:
1. Select one or more data sources from the left sidebar
2. Choose one or more channels for campaign delivery
3. Type your campaign idea in the chat input
4. Click "Generate" to see the streaming JSON payload
5. The JSON includes campaign details, audience filters, workflow, tracking, and more

## Features
- Dynamic campaign naming and offer injection
- Parameterized audience filters and reusable templates
- Centralized offer library and experiment support
- Channel-level message limits and success criteria overrides
- Persistent chat history with session management
- Modern UI with streaming JSON output
- Production best practices and accessibility

## Testing the App

Here are 5 comprehensive test prompts with sidebar selections to verify the dynamic campaign generation:

### 1. Winback Campaign (Multi-Channel, Discount)
- **Sidebar Selections:**
  - Data Sources: Shopify
  - Channels: Email, SMS, Ads
- **Prompt:**  
  Create a winback campaign for lapsed customers using Email, SMS, and Ads. Offer a 15% discount code SAVE15. Track open, click, and conversion rates.

**Expected Output:** Campaign named "Winback: Email + SMS + Ads", with workflow for all channels, offer library containing SAVE15, parameterized tracking.

### 2. VIP Early Access (Email Only, No Discount)
- **Sidebar Selections:**
  - Data Sources: Facebook Page
  - Channels: Email
- **Prompt:**  
  Send an exclusive VIP early access invite to our top customers via Email only. No discount, just early access to the new product launch. Track open rates.

**Expected Output:** Campaign named "Product Launch: Email", no offer, audience from Facebook Page, tracking focused on open rates.

### 3. Cart Abandonment (WhatsApp + SMS, Multi-Region)
- **Sidebar Selections:**
  - Data Sources: Google Ads Tag
  - Channels: WhatsApp, SMS
- **Prompt:**  
  Target users who abandoned their cart in the last 7 days with a reminder via WhatsApp and SMS. Include a 10% discount code CART10. Localize for US and MX. Track conversions.

**Expected Output:** Campaign named "Cart Reminder: WhatsApp + SMS", offer CART10, localization for US/MX, compliance for opt-ins, conversion tracking.

### 4. Loyalty Reward (Email + SMS, Custom Success Criteria)
- **Sidebar Selections:**
  - Data Sources: Shopify
  - Channels: Email, SMS
- **Prompt:**  
  Reward loyal Shopify customers who purchased 3+ times in the last 90 days with a loyalty offer via Email and SMS. Use discount code LOYAL20 for 20% off. Success if conversion rate >= 8% and click rate >= 15%.

**Expected Output:** Campaign named "Loyalty Reward: Email + SMS", offer LOYAL20, success criteria overridden to >=8% conversion and >=15% click rate.

### 5. Flash Sale (All Channels, Full Tracking)
- **Sidebar Selections:**
  - Data Sources: Shopify, Google Ads Tag, Facebook Page
  - Channels: Email, SMS, WhatsApp, Ads
- **Prompt:**  
  Announce a 24-hour flash sale across Email, SMS, WhatsApp, and Ads. Use code FLASH24 for 24% off. Schedule all messages for tomorrow at 10am local time. Track all metrics.

**Expected Output:** Campaign named "Flash Sale: Email + SMS + WhatsApp + Ads (24% OFF)", offer FLASH24, unified scheduling, full tracking (open, click, conversion), audience from all sources.

## UI Testing Instructions

### 1. Initial Load Test
- ✅ Page loads at https://mdalamin706688.github.io/ai-powered-campaign-generator/
- ✅ Header shows "AI Campaign Generator" with sparkles icon
- ✅ "AI-Powered Campaign Generator" subtitle visible
- ✅ "Production Ready" badge in green
- ✅ Sidebar shows "Data Sources" and "Channels" sections
- ✅ Chat area shows welcome message
- ✅ Input field shows "Describe your campaign idea..." placeholder

### 2. Data Source Selection Test
- ✅ Click on "Shopify" card
- ✅ Card highlights with blue background and checkmark
- ✅ Select multiple sources (Google Ads Tag, Facebook Page)
- ✅ All selected sources show checkmarks

### 3. Channel Selection Test
- ✅ Click on "Email" card
- ✅ Card highlights with green background and checkmark
- ✅ Select multiple channels (SMS, WhatsApp, Ads)
- ✅ All selected channels show checkmarks

### 4. Message Input Test
- ✅ Type campaign idea in input field
- ✅ "Generate" button becomes enabled
- ✅ Button shows gradient background and airplane icon
- ✅ Press Enter or click "Generate" to send

### 5. JSON Streaming Test
- ✅ User message appears in chat
- ✅ System streams JSON payload character by character
- ✅ Final JSON includes campaign details, audience, workflow, tracking, etc.

### 6. Chat History Test
- ✅ Create new chat session
- ✅ Switch between chats
- ✅ Edit chat titles
- ✅ Delete chats
- ✅ History persists across sessions

### 7. Responsiveness Test
- ✅ Resize window to mobile size
- ✅ Sidebar adjusts appropriately
- ✅ Chat interface remains functional

## Getting Started
1. Clone this repo: `git clone https://github.com/mdalamin706688/markopolo-ai-full-stack-challenge.git`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Visit http://localhost:5173/ or the live site
5. Follow testing instructions above

## Deployment
- Built with Vite for fast static site generation
- Deployed to GitHub Pages via GitHub Actions
- Live at: https://mdalamin706688.github.io/markopolo-ai-full-stack-challenge/

## Folder Structure
- `src/components` - UI components (ChatInput, ChatHistory, etc.)
- `src/context` - React context for chat and selection state
- `src/types` - TypeScript interfaces
- `.github/workflows` - GitHub Actions for deployment

## License
MIT
