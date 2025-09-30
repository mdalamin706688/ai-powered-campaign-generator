export type DataSource = 'Shopify' | 'Google Ads Tag' | 'Facebook Page';
export type Channel = 'Email' | 'SMS' | 'WhatsApp' | 'Ads';

export interface ChatMessage {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: string;
  streaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: string;
}

export interface CampaignPayload {
  campaignId: string;
  campaignName: string;
  audience: {
    segments: Array<{
      source: string;
      filter: string;
    }>;
  };
  workflow: Array<{
    channel: Channel;
    templateRef?: string;
    schedule?: {
      datetime: string;
      localTime: boolean;
      timezone: string;
    };
    offer?: string;
    platforms?: string[];
    requiresOptIn?: boolean;
  }>;
  dataSources: DataSource[];
  tracking: {
    openRate: string | boolean;
    clickRate: string | boolean;
    conversion: string | boolean;
  };
  compliance?: {
    smsOptInRequired: boolean;
    whatsappOptInRequired: boolean;
  };
  localization?: string[];
  createdAt?: string;
  version?: string;
  offer?: string;
  experiment?: {
    variantA: string;
    variantB: string;
    split: number;
  };
  limits?: {
    maxMessagesPerUser: number;
    perChannel?: Record<string, number>;
  };
  offersLibrary?: Record<string, { code: string; value: string }>;
  successCriteria?: {
    conversionRateTarget: string;
    clickRateTarget: string;
  };
}
