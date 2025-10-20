import { useState } from "react";
import WarehouseSelector from "@/components/warehouse/WarehouseSelector";
import ResourceTable, { Resource } from "@/components/warehouse/ResourceTable";
import StockVisualization from "@/components/warehouse/StockVisualization";
import { useInventoryQuery } from "@/hooks/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

const resources: Resource[] = [
  { type: "Water", stock: 100, available: 80, distributed: 20 },
  { type: "Food", stock: 500, available: 300, distributed: 200 },
  { type: "Medical Kits", stock: 200, available: 120, distributed: 80 },
  { type: "Blankets", stock: 400, available: 340, distributed: 60 },
  { type: "Fuel", stock: 60, available: 30, distributed: 30 },
];

export default function Warehouse() {
  const [selected, setSelected] = useState("Select Warehouse");
  const { data: inventory, isLoading, isError } = useInventoryQuery();

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container max-w-6xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Warehouse Resource Tracker</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Warehouse Overview</h3>
                <WarehouseSelector value={selected} onChange={setSelected} options={["Select Warehouse", "Mumbai", "Pune", "Delhi"]} />
              </div>

              {isLoading ? <Skeleton className="h-48" /> : isError ? <Alert variant="destructive">Failed to load inventory</Alert> : <ResourceTable resources={inventory ?? resources} />}
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold mb-4">Stock Level Visualization</h3>
              {isLoading ? <Skeleton className="h-32" /> : isError ? <Alert variant="destructive">Failed to load inventory</Alert> : <StockVisualization resources={inventory ?? resources} />}
              <div className="mt-4">
                <button className="rounded-md border px-4 py-2 font-semibold">View History</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold mb-4">Real-Time Tracking Panel</h3>
              <ul className="space-y-2 text-sm">
                <li>Incoming stock delivery of 100 units of water</li>
                <li>Outgoing distribution of 50 food packs to Pune relief center</li>
                <li>Water stock below 20% in Mumbai warehouse</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <button className="rounded-md bg-black text-white px-4 py-2 font-semibold">Update Stock</button>
                <button className="rounded-md border px-4 py-2 font-semibold">Dispatch Resources</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
