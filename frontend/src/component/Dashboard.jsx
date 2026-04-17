// import DashboardCard from "./DashboardCard";
import DashboardCard from "./Dashboardcard";
import { DollarSign, Users, Store, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className=" px-6 py-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      <DashboardCard
        title="Total Sales"
        value="$12,500"
        icon={<DollarSign />}
      />

      

      <DashboardCard
        title="Total Users"
        value="1,200"
        icon={<Users />}
      />

      <DashboardCard
        title="Outlets"
        value="45"
        icon={<Store />}
      />

      <DashboardCard
        title="Orders"
        value="320"
        icon={<ShoppingCart />}
      />

    </div>
  );
}