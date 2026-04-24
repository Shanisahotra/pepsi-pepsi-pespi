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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import AddUserForm from "@/components/ui/form/AddUserForm"
import { blockUserApi, unblockUserApi } from "@/services/userService";

export default function UsersTable() {
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [mode, setMode] = useState("add")
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
const [limit] = useState(5)
const [totalPages, setTotalPages] = useState(1)

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
 const getUsers = async (pageNumber = 1) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/all-users?page=${pageNumber}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setUsers(res.data.users)

    // backend should send total pages
    setTotalPages(res.data.totalPages)

  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  getUsers(page)
}, [page])


const nextPage = () => {
  if (page < totalPages) {
    setPage(page + 1)
  }
}

const prevPage = () => {
  if (page > 1) {
    setPage(page - 1)
  }
}

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

  const searchUsers = async (searchText) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/search?query=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUsers(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }

const handleBlock = async (id) => {
  await blockUserApi(id, token)

  setUsers((prev) =>
    prev.map((u) =>
      u.id === id ? { ...u, isBlocked: true } : u
    )
  )
}

const handleUnblock = async (id) => {
  await unblockUserApi(id, token)

  setUsers((prev) =>
    prev.map((u) =>
      u.id === id ? { ...u, isBlocked: false } : u
    )
  )
}


  return (
    <div className="">


      <h1>Users Management</h1>


      {/* Header */}
      <div className="flex items-center justify-between gap-4 mt-4 ">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              const value = e.target.value
              setSearch(value)
              searchUsers(value)
            }}
          />
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
            {/* <TableHead>Password</TableHead> */}
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
              {/* <TableCell>{user.password}</TableCell> */}
              <TableCell>{user.role}</TableCell>
              <TableCell>

             <Button
  size="sm"
  variant={user.isBlocked ? "default" : "destructive"}
  onClick={() =>
    user.isBlocked
      ? handleUnblock(user.id)
      : handleBlock(user.id)
  }
>
  {user.isBlocked ? "Unblock" : "Block"}
</Button>

              </TableCell>

              <TableCell className="flex gap-2">

                <Button
                  size="sm" variant="destructive" 
                  onClick={() => openEditForm(user)}
                >
                  Edit
                </Button>

                <Button size="sm" variant="destructive"  onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>


              </TableCell>




            </TableRow>
          ))}
        </TableBody>

      </Table>

      <div className="flex items-center justify-center mt-6">

  <Pagination>
    <PaginationContent>

      <PaginationItem>
        <PaginationPrevious
          onClick={prevPage}
          className={page === 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            isActive={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          onClick={nextPage}
          className={page === totalPages ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>

    </PaginationContent>
  </Pagination>

</div>

    </div>
  )
}