export type Notification = {
  id: string;
  text: string;
  status?: string;
};

export default function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  if (!notifications || notifications.length === 0) {
    return <p className="text-sm text-muted-foreground">No notifications</p>;
  }

  return (
    <ul className="space-y-3 text-sm">
      {notifications.map((n) => (
        <li key={n.id} className="flex items-center justify-between border-b pb-3">
          <span>{n.text}</span>
          <span className="text-muted-foreground">{n.status ?? ""}</span>
        </li>
      ))}
    </ul>
  );
}
