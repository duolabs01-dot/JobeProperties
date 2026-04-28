import { Badge } from "@/components/ui/badge";

type PortalStatusBadgeProps =
  | {
      kind: "payment";
      value: "pending" | "paid" | "overdue" | "failed";
    }
  | {
      kind: "maintenance";
      value: "open" | "in_progress" | "resolved";
    };

export function PortalStatusBadge(props: PortalStatusBadgeProps) {
  if (props.kind === "payment") {
    const paymentVariant =
      props.value === "paid" ? "paid" : props.value === "overdue" || props.value === "failed" ? "overdue" : "pending";

    return <Badge variant={paymentVariant}>{props.value}</Badge>;
  }

  const maintenanceVariant =
    props.value === "resolved" ? "resolved" : props.value === "in_progress" ? "progress" : "open";

  return <Badge variant={maintenanceVariant}>{props.value.replace("_", " ")}</Badge>;
}
