import { createContext } from 'react';
import type { ChatMessage, DataSource, Channel, CampaignPayload, ChatSession } from '../types/chat';

interface ChatContextProps {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  chats: ChatSession[];
  currentChatId: string | null;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, newTitle: string) => void;
  deleteChat: (chatId: string) => void;
  dataSources: DataSource[];
  setDataSources: (sources: DataSource[]) => void;
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  streamingPayload: CampaignPayload | null;
  setStreamingPayload: (payload: CampaignPayload | null) => void;
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined);