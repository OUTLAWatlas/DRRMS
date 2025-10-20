import { Link } from "react-router-dom";
import NotificationList from "@/components/rescue/NotificationList";
import RequestGrid from "@/components/rescue/RequestGrid";
import ResourceOverview from "@/components/rescue/ResourceOverview";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { useNotificationsQuery, useRequestsQuery } from "@/hooks/api-hooks";

export default function RescuePortal() {
  const { data: notifications, isLoading: notifLoading, isError: notifError } = useNotificationsQuery();
  const { data: requests, isLoading: reqLoading, isError: reqError } = useRequestsQuery();

  const stats = { availableResources: 100, peopleNeedingHelp: 35, fulfillmentRatioPercent: 80 };

  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container space-y-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold">Disaster Response Dashboard</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Latest Notifications</h3>
              {notifLoading ? (
                <Skeleton className="h-24" />
              ) : notifError ? (
                <Alert variant="destructive">Failed to load notifications</Alert>
              ) : (
                <NotificationList notifications={notifications ?? []} />
              )}
            </div>

            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Requests</h3>
              {reqLoading ? (
                <Skeleton className="h-40" />
              ) : reqError ? (
                <Alert variant="destructive">Failed to load requests</Alert>
              ) : (
                <RequestGrid requests={requests ?? []} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-4">Resource Overview</h3>
              <ResourceOverview stats={stats} />
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-muted-foreground">Auto-updates resources when requests are fulfilled</p>
              <div className="mt-4">
                <Link to="/warehouse" className="inline-flex rounded-lg bg-black px-4 py-2 text-white font-semibold">
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
