"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom"
import UsersTable from "./UsersTable";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset>
         <Navbar />

         <div className="p-6">
          <Outlet />
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}