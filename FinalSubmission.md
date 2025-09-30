# Final Submission: Dynamic Campaign Prompts and Payloads

This document demonstrates the dynamic capabilities of the AI-powered campaign generator. Each prompt is paired with its dynamically generated JSON payload, progressively covering all edge cases from simple to complex campaigns.

---

## **1️⃣ Simple Email-Only (Shopify VIPs $100+)**

### **Prompt:**
> Send an email-only campaign to Shopify repeat customers who spent more than $100 tomorrow at 9 AM local time.

### **Dynamic JSON Payload:**
```json
{
  "campaignId": "campaign_001",
  "campaignName": "Shopify Repeat Customers Email",
  "audience": {
    "segments": [
      { "source": "Shopify", "filter": "spend > 100 AND repeat_customer = true" }
    ]
  },
  "workflow": [
    { "channel": "Email", "message": "Hi {{firstName}}, enjoy our latest offer!", "time": "2025-09-30T09:00:00.000Z", "sendAtLocalTime": true, "timezone": "customer_local" }
  ],
  "dataSources": ["Shopify"],
  "tracking": { "openRate": true }
}
```

---

## **2️⃣ Email → SMS Fallback**

### **Prompt:**
> Send email to Facebook followers at 10 AM. If not opened in 24h, send an SMS.

### **Dynamic JSON Payload:**
```json
{
  "campaignId": "campaign_002",
  "campaignName": "Facebook Followers Email + SMS",
  "audience": {
    "segments": [
      { "source": "Facebook Page", "filter": "followers = true" }
    ]
  },
  "workflow": [
    { "channel": "Email", "message": "Hi {{firstName}}, check out our latest offers!", "time": "2025-09-30T10:00:00.000Z", "sendAtLocalTime": true, "timezone": "customer_local" },
    { "condition": "no_open_24h", "channel": "SMS", "message": { "US": "Don't miss out! Use code VIP20.", "MX": "¡No te lo pierdas! Usa el código VIP20." }, "requiresOptIn": true }
  ],
  "dataSources": ["Facebook Page"],
  "tracking": { "openRate": true, "clickRate": true }
}
```

---

## **3️⃣ Localized Email → WhatsApp Reminder**

### **Prompt:**
> Run a campaign for US (English) and MX (Spanish) customers. Start with email at 9 AM local time with 20% discount valid for 72h. If no click in 48h, send WhatsApp reminder in their language.

### **Dynamic JSON Payload:**
```json
{
  "campaignId": "campaign_003",
  "campaignName": "Localized Email + WhatsApp",
  "audience": {
    "segments": []
  },
  "workflow": [
    { "channel": "Email", "message": "Hi {{firstName}}, here’s a 20% discount just for you!", "time": "2025-09-30T09:00:00.000Z", "sendAtLocalTime": true, "timezone": "customer_local" },
    { "condition": "no_click_48h", "channel": "WhatsApp", "message": { "US": "Reminder! Use your 20% discount 🌟", "MX": "¡Recordatorio! Usa tu 20% de descuento 🌟" }, "requiresOptIn": true, "sendAtLocalTime": true, "timezone": "customer_local" }
  ],
  "dataSources": ["Shopify", "Facebook Page"],
  "tracking": { "openRate": true, "clickRate": true }
}
```

---

## **4️⃣ Email → SMS → Retargeting Ads**

### **Prompt:**
> Run a global campaign targeting Shopify VIPs ($500+), Facebook followers, and Google Ads visitors (last 30 days). Start with email at 10 AM local (A/B test). If no open in 24h → SMS. If no click in 48h → retargeting ads on Facebook + Google.

### **Dynamic JSON Payload:**
```json
{
  "campaignId": "campaign_004",
  "campaignName": "Email → SMS → Ads Retargeting",
  "audience": {
    "segments": [
      { "source": "Shopify", "filter": "spend > 500 AND repeat_customer = true" },
      { "source": "Facebook Page", "filter": "followers = true" },
      { "source": "Google Ads Tag", "filter": "visitors_last_30_days = true" }
    ]
  },
  "workflow": [
    { "channel": "Email", "abTest": { "subjectA": "Special Offer!", "subjectB": "Don't Miss Out!" }, "message": "Hi {{firstName}}, enjoy our exclusive offer!", "time": "2025-09-30T10:00:00.000Z", "sendAtLocalTime": true, "timezone": "customer_local" },
    { "condition": "no_open_24h", "channel": "SMS", "message": { "US": "Don't miss out!", "MX": "¡No te lo pierdas!" }, "requiresOptIn": true },
    { "condition": "no_click_48h", "channel": "Ads", "platforms": ["Facebook", "Google"], "message": "Still thinking? Here’s an exclusive offer!" }
  ],
  "dataSources": ["Shopify", "Facebook Page", "Google Ads Tag"],
  "tracking": { "openRate": true, "clickRate": true, "conversion": true }
}
```

---

## **5️⃣ Fully Localized Multichannel with WhatsApp + Fallback**

### **Prompt:**
> Run a global VIP campaign with Shopify, Facebook, and Google Ads audiences. Start with localized email at 10 AM (A/B test), fallback to SMS if no open in 24h, retargeting ads if no click in 48h, WhatsApp reminders at 9 AM next day (fallback to SMS). English for US, Spanish for MX. Limit total messages per user to 5.

### **Dynamic JSON Payload:**
```json
{
  "campaignId": "campaign_005",
  "campaignName": "Global VIP Multichannel",
  "audience": {
    "segments": [
      { "source": "Shopify", "filter": "spend > 500 AND repeat_customer = true" },
      { "source": "Facebook Page", "filter": "followers = true" },
      { "source": "Google Ads Tag", "filter": "visitors_last_30_days = true" }
    ]
  },
  "workflow": [
    { "channel": "Email", "abTest": { "subjectA": "VIP Offer!", "subjectB": "Don't Miss Out!" }, "message": "Hi {{firstName}}, enjoy our exclusive VIP deal!", "time": "2025-09-30T10:00:00.000Z", "sendAtLocalTime": true, "timezone": "customer_local" },
    { "condition": "no_open_24h", "channel": "SMS", "message": { "US": "Don't miss your VIP deal!", "MX": "¡No te pierdas tu oferta VIP!" }, "requiresOptIn": true },
    { "condition": "no_click_48h", "channel": "Ads", "platforms": ["Facebook", "Google"], "message": "Still thinking? VIP offer just for you!" },
    { "scheduled": "2025-10-01T09:00:00.000Z", "channel": "WhatsApp", "message": { "US": "Good morning! VIP deals today 🌟", "MX": "¡Buenos días! Ofertas VIP hoy 🌟" }, "requiresOptIn": true, "sendAtLocalTime": true, "timezone": "customer_local", "fallback": "SMS" }
  ],
  "dataSources": ["Shopify", "Facebook Page", "Google Ads Tag"],
  "tracking": { "openRate": true, "clickRate": true, "conversion": true }
}
```

---

This document ensures that the app dynamically generates payloads tailored to the specific requirements of each prompt, avoiding unnecessary fields and maintaining clarity.