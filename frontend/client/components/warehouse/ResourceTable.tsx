export type Resource = {
  type: string;
  stock: number;
  available: number;
  distributed: number;
};

export default function ResourceTable({ resources }: { resources: Resource[] }) {
  if (!resources || resources.length === 0) {
    return <p className="text-sm text-muted-foreground">No resources available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Resource Type</th>
            <th className="py-2">Stock Available</th>
            <th className="py-2">Distributed</th>
            <th className="py-2">Remaining</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r.type} className="border-b last:border-b-0">
              <td className="py-2">{r.type}</td>
              <td className="py-2">{r.available}</td>
              <td className="py-2">{r.distributed}</td>
              <td className="py-2">{r.stock - r.distributed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
