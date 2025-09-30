import { useContext } from 'react';
import { ChatContext } from './ChatContextObject';

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
};