"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import AppSidebar from "../components/layout/AppSidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset>
         <Navbar />
         
         <Dashboard/>
        

        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}