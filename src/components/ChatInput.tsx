import { useRef, useState } from 'react';
import { useChatContext } from '../context/useChatContext';
import type { ChatMessage, CampaignPayload, DataSource } from '../types/chat';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

function parsePromptToPayload(prompt: string, selectedDataSources: DataSource[], selectedChannels: string[]): CampaignPayload {
  const lowerPrompt = prompt.toLowerCase();

  // --- Campaign Name Logic (100% Dynamic) ---
  let campaignName = "Custom Campaign";
  const channelLabel = selectedChannels.length > 0 ? selectedChannels.join(' + ') : '';
  if (lowerPrompt.includes("anniversary") || lowerPrompt.includes("thank you")) {
    campaignName = `Anniversary Thank You: ${channelLabel || 'Multi-Channel'}`;
  } else if (lowerPrompt.includes("winback") || lowerPrompt.includes("win back")) {
    campaignName = `Winback: ${channelLabel || 'Multi-Channel'}`;
  } else if (lowerPrompt.includes("product launch") || lowerPrompt.includes("new product")) {
    campaignName = `Product Launch: ${channelLabel || 'Multi-Channel'}`;
  } else if (lowerPrompt.includes("loyalty") || lowerPrompt.includes("vip offer") || (lowerPrompt.includes("vip") && !lowerPrompt.includes("exclusive access"))) {
    campaignName = `Loyalty Reward: ${channelLabel || 'Multi-Channel'}`;
  } else if (lowerPrompt.includes("cart") || lowerPrompt.includes("retarget") || lowerPrompt.includes("abandon")) {
    campaignName = `Cart Reminder: ${channelLabel || 'Multi-Channel'}`;
  } else if (lowerPrompt.includes("flash sale") || lowerPrompt.includes("discount")) {
    const percentMatch = lowerPrompt.match(/(\d{1,2})%/);
    campaignName = `Flash Sale: ${channelLabel || 'Multi-Channel'}${percentMatch ? ` (${percentMatch[1]}% OFF)` : ''}`;
  } else if (lowerPrompt.includes("exclusive access") || (lowerPrompt.includes("vip") && lowerPrompt.includes("exclusive"))) {
    campaignName = `VIP Early Access: ${channelLabel || 'Email Only'}`;
  } else if (lowerPrompt.includes("re-engage") || lowerPrompt.includes("reengage") || lowerPrompt.includes("re-engagement")) {
    campaignName = `Re-engagement: ${channelLabel || 'Multi-Channel'}`;
  } else if (prompt.length > 0) {
    campaignName = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  }

  // --- Centralized Offer Library ---
  let selectedOffer = undefined;
  let discountCode = undefined;
  let discountValue = undefined;
  const offersLibrary: Record<string, { code: string; value: string }> = {};
  // Extract discount code
  const discountMatch = lowerPrompt.match(/discount code\s*:?\s*([A-Z0-9]+)/i);
  if (discountMatch) {
    discountCode = discountMatch[1].toUpperCase();
  }
  // Extract discount value
  const percentMatch = lowerPrompt.match(/(\d{1,2})%/);
  if (percentMatch) {
    discountValue = percentMatch[1] + '%';
  }
  // Build offersLibrary if code/value found
  if (discountCode && discountValue) {
    offersLibrary[discountCode] = { code: discountCode, value: discountValue };
    selectedOffer = discountCode;
  } else if (discountCode) {
    offersLibrary[discountCode] = { code: discountCode, value: '10%' };
    selectedOffer = discountCode;
  } else if (discountValue) {
    // Try to infer code from context
    let code = 'OFFER' + discountValue.replace('%', '');
    offersLibrary[code] = { code, value: discountValue };
    selectedOffer = code;
  }

  // Data sources based on prompt
  const promptDataSources: DataSource[] = [];
  
    // --- Offer Block Logic (Finalized) ---
    // Add offer for Loyalty, Reminder, Discount, Flash Sale, Re-engagement (default to 10% if not specified), but NOT for exclusive access campaigns
    if (
      (lowerPrompt.includes('discount') || lowerPrompt.includes('reminder') || lowerPrompt.includes('loyalty') || (lowerPrompt.includes('vip') && !lowerPrompt.includes('exclusive access')) || campaignName.toLowerCase().includes('loyalty') || campaignName.toLowerCase().includes('reminder') || campaignName.toLowerCase().includes('flash sale') || campaignName.toLowerCase().includes('re-engagement'))
      && !lowerPrompt.includes('exclusive access')
    ) {
      if (!selectedOffer) {
        // Try to infer code/value
        let code = discountCode || 'REWARD10';
        let value = discountValue || '10%';
        offersLibrary[code] = { code, value };
        selectedOffer = code;
      }
    }
  if (lowerPrompt.includes("shopify") || lowerPrompt.includes("vip") || lowerPrompt.includes("repeat customers")) promptDataSources.push("Shopify");
  if (lowerPrompt.includes("facebook")) promptDataSources.push("Facebook Page");
  if (lowerPrompt.includes("google")) promptDataSources.push("Google Ads Tag");
  // For retargeting, add both
  if (campaignName === "Email → SMS → Ads Retargeting") {
    if (!promptDataSources.includes("Facebook Page")) promptDataSources.push("Facebook Page");
    if (!promptDataSources.includes("Google Ads Tag")) promptDataSources.push("Google Ads Tag");
  }
  // Merge with selectedDataSources, dedupe
  const mergedDataSources = Array.from(new Set([...promptDataSources, ...selectedDataSources]));

  // --- Workflow: unified templateRef, experiment block, schedule, and offer injection ---
  const mergedChannels = [...selectedChannels];
  const workflow: CampaignPayload['workflow'] = [];
  const scheduleObj = { datetime: "2025-09-30T10:00:00.000Z", localTime: true, timezone: "customer_local" };
  mergedChannels.forEach((channel) => {
    let templateRef = selectedOffer ? "flashsale_email_v1" : "generic_email_v1";
    if (channel === "SMS") templateRef = "winback_sms_v1";
    if (channel === "WhatsApp") templateRef = "cart_whatsapp_v1";
    const step: any = {
      channel,
      templateRef,
      schedule: scheduleObj,
      offer: selectedOffer,
    };
    if (channel === "SMS" || channel === "WhatsApp") step.requiresOptIn = true;
    if (channel === "Ads") step.platforms = ["Facebook", "Google"];
    workflow.push(step);
  });
  // Optional Experimentation (A/B Testing)
  let experiment = undefined;
  if (lowerPrompt.includes("a/b test") || lowerPrompt.includes("experiment")) {
    experiment = {
      variantA: "flashsale_email_v1",
      variantB: "flashsale_email_v2",
      split: 0.5
    };
  }

  // --- Tracking: allow prompt-driven or default goals ---
  // tracking is now handled as template fields in the payload

  // --- Compliance: flatten to top-level booleans ---
  const compliance: CampaignPayload['compliance'] = {
    smsOptInRequired: mergedChannels.includes("SMS"),
    whatsappOptInRequired: mergedChannels.includes("WhatsApp")
  };

  // --- Success Criteria Logic (Always Parameterized) ---
  let conversionRateTarget = ">= 0.05";
  let clickRateTarget = ">= 0.1";
  // Loyalty prompt override
  if (lowerPrompt.includes("loyalty") && lowerPrompt.match(/(\d+)%/g)) {
    const matches = lowerPrompt.match(/(\d+)%/g);
    if (matches && matches.length >= 2) {
      conversionRateTarget = `>= ${parseFloat(matches[0]) / 100}`;
      clickRateTarget = `>= ${parseFloat(matches[1]) / 100}`;
    }
  } else if (lowerPrompt.match(/conversion rate\s*>=?\s*(\d+)%/)) {
    const conv = lowerPrompt.match(/conversion rate\s*>=?\s*(\d+)%/);
    if (conv) conversionRateTarget = `>= ${parseFloat(conv[1]) / 100}`;
  } else if (lowerPrompt.match(/click rate\s*>=?\s*(\d+)%/)) {
    const click = lowerPrompt.match(/click rate\s*>=?\s*(\d+)%/);
    if (click) clickRateTarget = `>= ${parseFloat(click[1]) / 100}`;
  }

  // --- Audience Segments: reusable filter param ---
  const audienceSegments = [];
  if (mergedDataSources.includes("Shopify")) {
    audienceSegments.push({ source: "Shopify", filter: "{{audience.lastPurchaseOverDays}}" });
  }
  if (mergedDataSources.includes("Facebook Page")) {
    audienceSegments.push({ source: "Facebook Page", filter: "{{audience.clickedLast30d}}" });
  }
  if (mergedDataSources.includes("Google Ads Tag")) {
    audienceSegments.push({ source: "Google Ads Tag", filter: "{{audience.cartAbandoned}}" });
  }

  // --- Message Frequency Control by Channel ---
  let perChannel: Record<string, number> = {};
  if (lowerPrompt.includes("email") && lowerPrompt.includes("sms")) {
    perChannel = { Email: 2, SMS: 1 };
  } else if (lowerPrompt.includes("email")) {
    perChannel = { Email: 2 };
  } else if (lowerPrompt.includes("sms")) {
    perChannel = { SMS: 1 };
  }

  const payload: CampaignPayload = {
    campaignId: `campaign_${Date.now()}`,
    campaignName,
    audience: { segments: audienceSegments },
    workflow,
    dataSources: mergedDataSources,
    tracking: {
      openRate: "{{trackOpen}}",
      clickRate: "{{trackClick}}",
      conversion: "{{trackConversion}}"
    },
    successCriteria: {
      conversionRateTarget,
      clickRateTarget
    },
    compliance,
    limits: { maxMessagesPerUser: 3, perChannel },
    offer: selectedOffer,
    offersLibrary: Object.keys(offersLibrary).length > 0 ? offersLibrary : undefined
  };
  if (experiment) {
    payload.experiment = experiment;
  }
  if (lowerPrompt.includes("us") && lowerPrompt.includes("mx")) {
    payload.localization = ["US", "MX"];
  }
  return payload;
}

function generatePayloadExplanation(payload: CampaignPayload, prompt: string, selectedDataSources: DataSource[], selectedChannels: string[]): string {
  // Analyze prompt for key themes
  const promptLower = prompt.toLowerCase();
  const isReengagement = promptLower.includes('re-engage') || promptLower.includes('inactive') || promptLower.includes('haven\'t purchased');
  const isPromotional = promptLower.includes('sale') || promptLower.includes('discount') || promptLower.includes('offer') || promptLower.includes('promotion');
  const isSeasonal = promptLower.includes('holiday') || promptLower.includes('seasonal') || promptLower.includes('christmas') || promptLower.includes('black friday');
  const isRetention = promptLower.includes('retention') || promptLower.includes('loyalty') || promptLower.includes('keep') || promptLower.includes('maintain');
  const isAcquisition = promptLower.includes('new customer') || promptLower.includes('acquire') || promptLower.includes('attract') || promptLower.includes('prospect');

  // Determine campaign type
  let campaignType = 'General Marketing';
  if (isReengagement) campaignType = 'Re-engagement';
  else if (isPromotional) campaignType = 'Promotional';
  else if (isSeasonal) campaignType = 'Seasonal';
  else if (isRetention) campaignType = 'Retention';
  else if (isAcquisition) campaignType = 'Acquisition';

  // Dynamic audience description based on prompt analysis
  let audienceDescription = 'Targeted audience based on your specified criteria';
  if (isReengagement) {
    audienceDescription = 'Customers who haven\'t engaged recently, identified through purchase behavior analysis';
  } else if (isAcquisition) {
    audienceDescription = 'Potential new customers matching your ideal profile characteristics';
  } else if (isRetention) {
    audienceDescription = 'Existing valuable customers to maintain engagement and loyalty';
  }

  // Dynamic channel recommendation
  let channelRationale = 'Selected for optimal reach and engagement based on your audience';
  if (selectedChannels.includes('Email')) {
    channelRationale = 'Email chosen for detailed messaging and personalized communication';
  } else if (selectedChannels.includes('SMS')) {
    channelRationale = 'SMS selected for immediate, high-impact notifications';
  } else if (selectedChannels.includes('WhatsApp')) {
    channelRationale = 'WhatsApp chosen for conversational, personal touchpoints';
  }

  // Dynamic timing rationale
  let timingRationale = 'Scheduled for optimal audience availability';
  if (isReengagement) {
    timingRationale = 'Timed to catch customers when they\'re most likely to reconsider engagement';
  } else if (isPromotional) {
    timingRationale = 'Scheduled during peak shopping periods for maximum impact';
  } else if (isSeasonal) {
    timingRationale = 'Aligned with seasonal shopping patterns and calendar events';
  }

  // Dynamic recommendations based on campaign type
  let recommendations = 'Test with a small audience segment first, then scale based on performance metrics.';
  if (isReengagement) {
    recommendations = 'Start with low-frequency messaging to avoid overwhelming inactive users. Monitor re-engagement rates closely.';
  } else if (isPromotional) {
    recommendations = 'Track conversion rates and adjust offer value based on performance. Consider A/B testing different incentives.';
  } else if (isSeasonal) {
    recommendations = 'Time sensitivity is critical - monitor inventory levels and adjust messaging as the season progresses.';
  }

  const explanation = `You requested: "${prompt}"

This is a ${campaignType.toLowerCase()} campaign using ${selectedDataSources.join(' and ')} data source${selectedDataSources.length > 1 ? 's' : ''} with ${selectedChannels.join(' and ')} communication channel${selectedChannels.length > 1 ? 's' : ''}.

Campaign ID: ${payload.campaignId}
Campaign Name: ${payload.campaignName}

Audience targeting leverages ${payload.dataSources.join(', ')} to reach ${audienceDescription.toLowerCase()}.

The execution strategy centers on ${payload.workflow[0]?.channel || 'Email'}, ${channelRationale.toLowerCase()}.

Timing is set for ${payload.workflow[0]?.schedule?.datetime ? new Date(payload.workflow[0]?.schedule.datetime).toLocaleString() : 'immediate execution'}, ${timingRationale.toLowerCase()}.

${payload.workflow[0]?.offer ? `An offer code ${payload.workflow[0].offer} has been incorporated to drive engagement.` : 'No specific offer has been configured for this campaign.'}

Success will be measured against conversion targets of ${payload.successCriteria?.conversionRateTarget || '5%'} and click rate targets of ${payload.successCriteria?.clickRateTarget || '10%'}. Comprehensive tracking includes open rates, click rates, and conversions.

Compliance measures include a maximum of ${payload.limits?.maxMessagesPerUser || 3} messages per user to maintain deliverability standards.

${recommendations} Monitor engagement rates closely and adjust targeting parameters as needed for optimal campaign performance.`;

  return explanation;
}

export function ChatInput() {
  const { addMessage, setStreamingPayload, currentChatId, dataSources, channels } = useChatContext() as {
    addMessage: (msg: ChatMessage) => void;
    setStreamingPayload: (payload: CampaignPayload) => void;
    currentChatId: string | null;
    dataSources: DataSource[];
    channels: string[];
  };
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);
    setInput('');
    inputRef.current?.focus();

    const payload = parsePromptToPayload(input, dataSources, channels);
    setStreamingPayload(payload);
    const jsonStr = JSON.stringify(payload, null, 2);

    const streamId = `stream-${Date.now()}`;
    let streamed = '';

    for (let i = 0; i < jsonStr.length; i++) {
      streamed += jsonStr[i];
      await new Promise((r) => setTimeout(r, 20));

      if (i % 5 === 0 || i === jsonStr.length - 1) {
        const isComplete = i === jsonStr.length - 1;
        addMessage({
          id: `${streamId}-${i}`,
          role: 'system',
          content: streamed,
          timestamp: new Date().toISOString(),
          streaming: !isComplete,
        });
      }
    }

    setLoading(false);

    // Add explanation message with streaming effect
    const explanation = generatePayloadExplanation(payload, input, dataSources, channels);
    const explanationId = `explanation-${Date.now()}`;
    let streamedExplanation = '';

    for (let i = 0; i < explanation.length; i++) {
      streamedExplanation += explanation[i];
      await new Promise((r) => setTimeout(r, 15)); // Slightly faster than JSON for premium feel

      if (i % 10 === 0 || i === explanation.length - 1) {
        const isComplete = i === explanation.length - 1;
        addMessage({
          id: `${explanationId}-${i}`,
          role: 'system',
          content: streamedExplanation,
          timestamp: new Date().toISOString(),
          streaming: !isComplete,
        });
      }
    }
  };

  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all duration-200"
          placeholder="Describe your campaign idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || !currentChatId}
          required
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        disabled={loading || !input.trim() || !currentChatId}
      >
        <span>{loading ? 'Generating...' : 'Generate'}</span>
        <PaperAirplaneIcon className="w-4 h-4" />
      </button>
    </form>
  );
}
