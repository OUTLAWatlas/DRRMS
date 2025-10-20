import { useState } from "react";

const resources = [
  { type: "Water", stock: 100, available: 80, distributed: 20 },
  { type: "Food", stock: 500, available: 300, distributed: 200 },
  { type: "Medical Kits", stock: 200, available: 120, distributed: 80 },
  { type: "Blankets", stock: 400, available: 340, distributed: 60 },
  { type: "Fuel", stock: 60, available: 30, distributed: 30 },
];

export default function Warehouse() {
  const [selected, setSelected] = useState("Select Warehouse");

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container max-w-6xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Warehouse Resource Tracker
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Warehouse Overview</h3>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="rounded-md border px-3 py-2"
                >
                  <option>Select Warehouse</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Delhi</option>
                </select>
              </div>

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
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold mb-4">Stock Level Visualization</h3>
              <div className="space-y-4">
                {resources.map((r) => {
                  const ratio = Math.min(1, r.available / r.stock);
                  return (
                    <div key={r.type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{r.type}</span>
                        <span>{Math.round(ratio * 100)}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-black"
                          style={{ width: `${ratio * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <button className="rounded-md border px-4 py-2 font-semibold">
                  View History
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold mb-4">Real-Time Tracking Panel</h3>
              <ul className="space-y-2 text-sm">
                <li>Incoming stock delivery of 100 units of water</li>
                <li>
                  Outgoing distribution of 50 food packs to Pune relief center
                </li>
                <li>Water stock below 20% in Mumbai warehouse</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <button className="rounded-md bg-black text-white px-4 py-2 font-semibold">
                  Update Stock
                </button>
                <button className="rounded-md border px-4 py-2 font-semibold">
                  Dispatch Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
