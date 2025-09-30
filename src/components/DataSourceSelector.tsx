import type { DataSource } from '../types/chat';
import { useChatContext } from '../context/useChatContext';
import { CheckIcon, CubeIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const DATA_SOURCES: { name: DataSource; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Shopify', icon: CubeIcon },
  { name: 'Google Ads Tag', icon: ChartBarIcon },
  { name: 'Facebook Page', icon: UserGroupIcon },
];

export function DataSourceSelector() {
  const { dataSources, setDataSources } = useChatContext() as {
    dataSources: DataSource[];
    setDataSources: (sources: DataSource[]) => void;
  };

  const toggleSource = (source: DataSource) => {
    setDataSources(
      dataSources.includes(source)
        ? dataSources.filter((s: DataSource) => s !== source)
        : [...dataSources, source]
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
          <CubeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Data Sources</h2>
      </div>
      <div className="space-y-1.5">
        {DATA_SOURCES.map(({ name, icon: Icon }) => (
          <label
            key={name}
            className="group flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className={`p-1.5 rounded-lg transition-colors ${
              dataSources.includes(name)
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-gray-900 dark:text-white">{name}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {name === 'Shopify' ? 'E-commerce data' : name === 'Google Ads Tag' ? 'Advertising insights' : 'Social media metrics'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={dataSources.includes(name)}
              onChange={() => toggleSource(name)}
              className="sr-only"
            />
            {dataSources.includes(name) && (
              <div className="p-1 bg-blue-600 rounded-full">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
