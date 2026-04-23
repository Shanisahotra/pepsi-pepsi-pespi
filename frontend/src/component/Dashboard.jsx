import { useState, useEffect } from "react"
import axios from "axios";
import DashboardCard from "./Dashboardcard";
import { DollarSign, Users, Store, ShoppingCart } from "lucide-react";
import { ChartAreaInteractive } from "@/charts/ChartAreaInteractive "

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOutlets, setTotalOutlets] = useState(0);
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
      } catch (error) {
        console.error(error);
      }
    };

    getUsersCount();
  }, []);

  useEffect(() => {
    const getOutletsCount = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/outlets/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );

        setTotalOutlets(res.data.outlets.length);
      } catch (error) {
        console.error(error);
      }
    };

    getOutletsCount();
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
          value={totalOutlets}
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