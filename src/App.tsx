import './index.css';
import { ChatProvider } from './context/ChatContext';
import { DataSourceSelector } from './components/DataSourceSelector';
import { ChannelSelector } from './components/ChannelSelector';
import { ChatHistory } from './components/ChatHistory';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { SparklesIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <ChatProvider>
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        <header className="px-6 py-2 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                AI Campaign Generator
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Campaign Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
              Production Ready
            </div>
          </div>
        </header>
        <main className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 p-4 flex flex-col gap-4 shadow-xl overflow-y-auto max-h-full">
            <ChatHistory />
            <DataSourceSelector />
            <ChannelSelector />
          </aside>
          {/* Chat area */}
          <section className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <ChatArea />
            </div>
            <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80">
              <ChatInput />
            </div>
          </section>
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;
