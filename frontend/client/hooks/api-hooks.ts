import { useQuery } from "@tanstack/react-query";

type Notification = { id: string; text: string; status?: string };
type RequestCard = { id: string; title: string; status?: string };
type Resource = { type: string; stock: number; available: number; distributed: number };

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", text: "#REQ1023 submitted 2 hrs ago", status: "Pending" },
  { id: "2", text: "Resource request #REQ1019 status changed", status: "Updated" },
  { id: "3", text: "New resource request #REQ1018", status: "New" },
];

const MOCK_REQUESTS: RequestCard[] = [
  { id: "#REQ1023", title: "Flood in downtown", status: "Pending" },
  { id: "#REQ1019", title: "Road blocked", status: "Fulfilled" },
  { id: "#REQ1018", title: "Building on fire", status: "Rejected" },
];

const MOCK_INVENTORY: Resource[] = [
  { type: "Water", stock: 100, available: 80, distributed: 20 },
  { type: "Food", stock: 500, available: 300, distributed: 200 },
  { type: "Medical Kits", stock: 200, available: 120, distributed: 80 },
  { type: "Blankets", stock: 400, available: 340, distributed: 60 },
  { type: "Fuel", stock: 60, available: 30, distributed: 30 },
];

function delay<T>(v: T, ms = 800) {
  return new Promise<T>((res) => setTimeout(() => res(v), ms));
}

export async function fetchNotifications() {
  return delay(MOCK_NOTIFICATIONS);
}

export async function fetchRequests() {
  return delay(MOCK_REQUESTS);
}

export async function fetchWarehouseInventory() {
  return delay(MOCK_INVENTORY);
}

export async function submitReport(_payload: unknown) {
  // Pretend to submit and return success
  await delay(true, 600);
  return { ok: true } as const;
}

export function useNotificationsQuery() {
  return useQuery({ queryKey: ["notifications"], queryFn: fetchNotifications });
}

export function useRequestsQuery() {
  return useQuery({ queryKey: ["requests"], queryFn: fetchRequests });
}

export function useInventoryQuery() {
  return useQuery({ queryKey: ["inventory"], queryFn: fetchWarehouseInventory });
}
