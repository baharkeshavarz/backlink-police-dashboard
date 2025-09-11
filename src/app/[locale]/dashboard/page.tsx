import { DEFAULT_DASHBOARD_OVERVIEW_PATH } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  redirect(DEFAULT_DASHBOARD_OVERVIEW_PATH);
}
