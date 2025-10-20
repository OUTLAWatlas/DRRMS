export type RequestCard = {
  id: string;
  title: string;
  summary?: string;
  status?: string;
};

export default function RequestGrid({ requests }: { requests: RequestCard[] }) {
  if (!requests || requests.length === 0) {
    return <p className="text-sm text-muted-foreground">No requests available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      {requests.map((r) => (
        <div key={r.id} className="rounded-lg border p-4">
          <p className="font-medium">{r.id}</p>
          <p className="text-muted-foreground">{r.title}</p>
          {r.status && (
            <span className="mt-2 inline-block rounded px-2 py-1 text-xs bg-gray-100">
              {r.status}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
