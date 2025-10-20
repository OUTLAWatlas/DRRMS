import { Resource } from "./ResourceTable";

export default function StockVisualization({ resources }: { resources: Resource[] }) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {resources.map((r) => {
        const ratio = Math.min(1, r.available / Math.max(1, r.stock));
        return (
          <div key={r.type}>
            <div className="flex justify-between text-sm mb-1">
              <span>{r.type}</span>
              <span>{Math.round(ratio * 100)}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-black" style={{ width: `${ratio * 100}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
