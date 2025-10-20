import { Link } from "react-router-dom";

export default function RescuePortal() {
  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container space-y-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold">
          Disaster Response Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Latest Notifications</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between border-b pb-3">
                  <span>#REQ1023 submitted 2 hrs ago</span>
                  <span className="text-muted-foreground">Pending</span>
                </li>
                <li className="flex items-center justify-between border-b pb-3">
                  <span>Resource request #REQ1019 status changed</span>
                  <span className="text-muted-foreground">Updated</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>New resource request #REQ1018</span>
                  <span className="text-muted-foreground">New</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Requests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">#REQ1023</p>
                  <p className="text-muted-foreground">Flood in downtown</p>
                  <span className="mt-2 inline-block rounded bg-yellow-100 text-yellow-800 px-2 py-1 text-xs">
                    Pending
                  </span>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">#REQ1019</p>
                  <p className="text-muted-foreground">Road blocked</p>
                  <span className="mt-2 inline-block rounded bg-green-100 text-green-800 px-2 py-1 text-xs">
                    Fulfilled
                  </span>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">#REQ1018</p>
                  <p className="text-muted-foreground">Building on fire</p>
                  <span className="mt-2 inline-block rounded bg-red-100 text-red-800 px-2 py-1 text-xs">
                    Rejected
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Resource Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Current available resources</span>
                  <span className="text-2xl font-bold">100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>People needing help</span>
                  <span className="text-2xl font-bold">35</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Resources required vs fulfilled</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-4/5 bg-black" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-muted-foreground">
                Auto-updates resources when requests are fulfilled
              </p>
              <div className="mt-4">
                <Link
                  to="/warehouse"
                  className="inline-flex rounded-lg bg-black px-4 py-2 text-white font-semibold"
                >
                  Open Warehouse Tracker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
