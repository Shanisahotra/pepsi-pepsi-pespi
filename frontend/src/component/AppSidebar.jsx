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

import {
  Home,
  Users,
  Settings,
  Store,
  Package,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/layout/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      path: "/layout/users",
    },
    {
      title: "Outlets",
      icon: Store,
      path: "/layout/outlets",
    },
    {
      title: "Products",
      icon: Package,
      path: "/layout/products",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/layout/settings",
    },
  ];

  return (
    <Sidebar className="border-r bg-white">

      {/* Header */}
      <SidebarHeader className="border-b px-4 py-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Pepsi Admin
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Management Panel
          </p>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3 py-4">

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">

              {menus.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className={`
                        w-full justify-start rounded-xl px-2 py-2 text-[14px]
                        transition-all duration-200
                        ${
                          active
                            ? "bg-gray-100 font-gray-50 shadow-sm"
                            : "hover:bg-gray-50"
                        }
                      `}
                    >
                      <Icon
                        className={`
                          mr-3 h-5 w-5
                          ${
                            active
                              ? "text-black"
                              : "text-gray-500"
                          }
                        `}
                      />

                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t px-4 py-4">
        <div>
          <p className="text-sm font-medium">
            © 2026 Pepsi
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Admin Dashboard v1.0
          </p>
        </div>
      </SidebarFooter>

    </Sidebar>
  );
}