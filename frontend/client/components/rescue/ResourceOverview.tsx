export type ResourceStats = {
  availableResources: number;
  peopleNeedingHelp: number;
  fulfillmentRatioPercent: number; // 0-100
};

export default function ResourceOverview({ stats }: { stats: ResourceStats }) {
  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Current available resources</span>
        <span className="text-2xl font-bold">{stats.availableResources}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>People needing help</span>
        <span className="text-2xl font-bold">{stats.peopleNeedingHelp}</span>
      </div>
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Resources required vs fulfilled</span>
          <span>{stats.fulfillmentRatioPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-black" style={{ width: `${stats.fulfillmentRatioPercent}%` }} />
        </div>
      </div>
    </div>
  );
}
