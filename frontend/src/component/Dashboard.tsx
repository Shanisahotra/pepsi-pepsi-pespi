"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./Dashboardcard";
import { DollarSign, Users, Store, ShoppingCart } from "lucide-react";
import { ChartAreaInteractive } from "@/charts/ChartAreaInteractive ";

type Order = {
  total: number;
};

type OrdersResponse = {
  orders: Order[];
};

type UsersResponse = {
  users: any[];
};

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  const token = localStorage.getItem("token");

  //Fetch Orders (Revenue + Count)
  const fetchOrdersData = async () => {
    try {
      const res = await axios.get<OrdersResponse>(
        "http://localhost:5000/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orders = res.data.orders;

      // Total Revenue
      const revenue = orders.reduce(
        (acc: number, order: Order) => acc + order.total,
        0
      );

      // Total Orders
      const count = orders.length;

      setTotalRevenue(revenue);
      setTotalOrders(count);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get<UsersResponse>(
        "http://localhost:5000/api/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalUsers(res.data.users.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersData();
    fetchUsers();
  }, []);

  return (
    <>
      {/* Cards */}
      <div className="px-6 py-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          title="Total Sales"
          value={`Rs. ${totalRevenue}`}
          icon={<DollarSign />}
        />

        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={<Users />}
        />

        <DashboardCard
          title="Outlets"
          value={45} // static for now
          icon={<Store />}
        />

        <DashboardCard
          title="Orders"
          value={totalOrders}
          icon={<ShoppingCart />}
        />

      </div>

      {/* Chart */}
      <div className="px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
}