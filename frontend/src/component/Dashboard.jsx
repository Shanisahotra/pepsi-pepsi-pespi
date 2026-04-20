import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./Dashboardcard";
import { DollarSign, Users, Store, ShoppingCart } from "lucide-react";
import { ChartAreaInteractive } from "@/charts/ChartAreaInteractive "

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const token = localStorage.getItem("token");

useEffect(() => {
  const getUsersCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalUsers(res.data.users.length);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  getUsersCount();
}, []);


  return (
    <> 
       <div className=" px-6 py-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      <DashboardCard
        title="Total Sales"
        value="$12,500"
        icon={<DollarSign />}
      />

      

      <DashboardCard
  title="Total Users"
  value={totalUsers}
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
     <div>
       <ChartAreaInteractive />
     </div>
    </>

  );
}