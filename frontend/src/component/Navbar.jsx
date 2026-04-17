import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout"

export default function Navbar() {

   const logout = useLogout()

  return (
    <div className="flex justify-between items-center px-12 py-4 border-b bg-gray-50">
      
      {/* Left */}
      <h1 className="text-xl font-bold">Pepsi</h1>

      {/* Center */}
      {/* <div className="flex gap-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Users</Button>
        <Button variant="ghost">Reports</Button>
      </div> */}

      {/* Right */}
      <div className="flex gap-2">
        {/* <Button variant="outline">Login</Button> */}
        <Button  onClick={logout} >Logout</Button>
      </div>

    </div>
  );
}