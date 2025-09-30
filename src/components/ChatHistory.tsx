import { useChatContext } from '../context/useChatContext';
import type { ChatSession } from '../types/chat';
import { ChatBubbleLeftRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function ChatHistory() {
  const { chats, currentChatId, createNewChat, selectChat, updateChatTitle, deleteChat } = useChatContext() as {
    chats: ChatSession[];
    currentChatId: string | null;
    createNewChat: () => void;
    selectChat: (id: string) => void;
    updateChatTitle: (chatId: string, newTitle: string) => void;
    deleteChat: (chatId: string) => void;
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (chat: ChatSession) => {
    setEditingId(chat.id);
    setEditValue(chat.title);
  };
  const saveEdit = (chat: ChatSession) => {
    if (editValue.trim() && editValue !== chat.title) {
      updateChatTitle(chat.id, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
      </div>
      <button
        onClick={createNewChat}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        New Chat
      </button>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat.id} className={`group relative`}>
            <button
              onClick={() => selectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                chat.id === currentChatId
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              style={{ minHeight: 40 }}
            >
              {editingId === chat.id ? (
                <input
                  className="w-full rounded px-2 py-1 text-sm border border-blue-400 focus:outline-none"
                  value={editValue}
                  autoFocus
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => saveEdit(chat)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(chat);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium truncate flex-1">{chat.title}</span>
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 ml-2 text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
                    tabIndex={-1}
                    onClick={e => {
                      e.stopPropagation();
                      startEdit(chat);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 ml-1 text-xs text-red-500 hover:text-red-700 focus:outline-none"
                    tabIndex={-1}
                    onClick={e => {
                      e.stopPropagation();
                      if (window.confirm('Delete this chat?')) deleteChat(chat.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(chat.timestamp).toLocaleDateString()}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}