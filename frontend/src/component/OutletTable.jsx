"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import AddUserForm from "@/components/ui/form/AddUserForm"
import { blockUserApi, unblockUserApi } from "@/services/userService";

export default function OutletTable() {
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [mode, setMode] = useState("add")

  const [users, setUsers] = useState([])

  const token = localStorage.getItem("token");



  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">

        <div className="w-full max-w-sm">
          <Input placeholder="Search..." />
        </div>

        <Button>
          Add New
        </Button>

      </div>



      {/* Table */}
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Outlet Name</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Numver</TableHead>
             <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>

              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.role}</TableCell>
         
        
            
              

            </TableRow>
          ))}
        </TableBody>

      </Table>

    </div>
  )
}