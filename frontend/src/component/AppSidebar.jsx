"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { Home, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom"

export default function AppSidebar() {
  const navigate = useNavigate()
  return (
    <Sidebar>

      {/* Header */}
      <SidebarHeader>
        <h2 className="text-xl font-bold px-2">Pepsi Admin</h2>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/layout/dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/layout/users")}>
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/layout/outlets")}>
                  <Users className="mr-2 h-4 w-4" />
                  Outlets
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <p className="text-sm text-gray-500 px-2">© 2026 Pepsi</p>
      </SidebarFooter>

    </Sidebar>
  );
}