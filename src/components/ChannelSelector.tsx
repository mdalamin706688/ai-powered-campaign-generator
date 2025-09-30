import type { Channel } from '../types/chat';
import { useChatContext } from '../context/useChatContext';
import { CheckIcon, EnvelopeIcon, DevicePhoneMobileIcon, ChatBubbleLeftRightIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const CHANNELS: { name: Channel; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Email', icon: EnvelopeIcon },
  { name: 'SMS', icon: DevicePhoneMobileIcon },
  { name: 'WhatsApp', icon: ChatBubbleLeftRightIcon },
  { name: 'Ads', icon: MegaphoneIcon },
];

export function ChannelSelector() {
  const { channels, setChannels } = useChatContext() as {
    channels: Channel[];
    setChannels: (channels: Channel[]) => void;
  };

  const toggleChannel = (channel: Channel) => {
    setChannels(
      channels.includes(channel)
        ? channels.filter((c: Channel) => c !== channel)
        : [...channels, channel]
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
          <MegaphoneIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Channels</h2>
      </div>
      <div className="space-y-1.5">
        {CHANNELS.map(({ name, icon: Icon }) => (
          <label
            key={name}
            className="group flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className={`p-1.5 rounded-lg transition-colors ${
              channels.includes(name)
                ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-green-50 dark:group-hover:bg-green-900/20'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-gray-900 dark:text-white">{name}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {name === 'Email' ? 'Direct messaging' : name === 'SMS' ? 'Text notifications' : name === 'WhatsApp' ? 'Instant messaging' : 'Targeted advertising'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={channels.includes(name)}
              onChange={() => toggleChannel(name)}
              className="sr-only"
            />
            {channels.includes(name) && (
              <div className="p-1 bg-green-600 rounded-full">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}