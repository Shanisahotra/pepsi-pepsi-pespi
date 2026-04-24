import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      
      <div className="flex h-20 items-center justify-between px-6">

        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/11/Pepsi-Logo-2023.png"
            alt="Pepsi Logo"
            className="h-12 w-auto object-contain"
          />

          <div className="hidden sm:block">
            <h2 className="text-lg font-bold tracking-tight">
              Pepsi Admin
            </h2>
            <p className="text-xs text-gray-500">
              Management Dashboard
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <Button
            onClick={logout}
            className="
              rounded-xl px-5 py-4
              font-semibold text-sm
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-lg
              active:scale-95
            "
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

        </div>

      </div>
    </header>
  );
}