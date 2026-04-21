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

export default function UsersTable() {
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [mode, setMode] = useState("add")

  const [users, setUsers] = useState([])

  const token = localStorage.getItem("token");

  const openAddForm = () => {
    setMode("add")
    setSelectedUser(null)
    setShowForm(true)
  }

  const openEditForm = (user) => {
    setMode("edit")
    setSelectedUser(user)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setSelectedUser(null)
    setMode("add")
  }

  // GET ALL USERS API
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUsers(res.data.users)

    } catch (error) {
      console.log(error.response?.data)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])


  //POST API CALL
  const addUser = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role || "Admin",
        }
      )

      getUsers()
      setShowForm(false)

    } catch (error) {
      console.log("API Error:", error)
    }
  }

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUsers((prev) => prev.filter((u) => u.id !== id))

    } catch (error) {
      console.log(error)
    }
  }

  // UPDATE USER
  const updateUser = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      role: data.role,
    }

    // only send password if user typed it
    if (data.password && data.password.trim() !== "") {
      payload.password = data.password
    }

    await axios.put(
      `http://localhost:5000/api/users/update/${selectedUser.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    getUsers()
    closeForm()
  }


// BLOCK
const handleBlock = async (id) => {
  await blockUserApi(id, token);
  getUsers(); // refresh table
};

// UNBLOCK
const handleUnblock = async (id) => {
  await unblockUserApi(id, token);
  getUsers();
};


  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">

        <div className="w-full max-w-sm">
          <Input placeholder="Search..." />
        </div>

        <Button onClick={openAddForm}>
          Add New
        </Button>

      </div>

      {/* Dialog Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[900px] w-full p-6">
          <DialogHeader>
            <DialogTitle>
              {mode === "edit"
                ? "Edit User"
                : "Add New User"}
            </DialogTitle>
          </DialogHeader>

          <AddUserForm
            mode={mode}
            userData={selectedUser}
            onClose={closeForm}
            onSubmitUser={
              mode === "add"
                ? addUser
                : updateUser
            }
          />
        </DialogContent>
      </Dialog>


      {/* Table */}
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Role</TableHead>
             <TableHead>Status</TableHead>
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
              <TableCell>

                <Button
                  size="sm"
            onClick={() => handleBlock(user.id)}>
                  Block
                </Button>

                <Button size="sm" onClick={() => handleUnblock(user.id)}>
                  Unblock
                </Button>


              </TableCell>
             
              <TableCell className="flex gap-2">

                <Button
                  size="sm"
                  onClick={() => openEditForm(user)}
                >
                  Edit
                </Button>

                <Button size="sm" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>


              </TableCell>
          
            
              

            </TableRow>
          ))}
        </TableBody>

      </Table>

    </div>
  )
}