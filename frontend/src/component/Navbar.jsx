import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout"

export default function Navbar() {

   const logout = useLogout()

  return (
    <div className="flex justify-between items-center px-12 py-4 border-b bg-gray-50">
      
      {/* Left */}
      <img
          src="https://logos-world.net/wp-content/uploads/2020/11/Pepsi-Logo-2023.png"
          alt="Logo"
          className="h-10 w-auto"
        />

      
      {/* Right */}
      <div className="flex gap-2">
        {/* <Button variant="outline">Login</Button> */}
        <Button  onClick={logout} >Logout</Button>
      </div>

    </div>
  );
}