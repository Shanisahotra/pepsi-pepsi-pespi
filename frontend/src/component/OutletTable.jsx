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
import OutletForm from "@/components/ui/form/OutletForm"


export default function OutletTable() {
  const [outlets, setOutlets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedOutlet, setSelectedOutlet] = useState(null)
  const [mode, setMode] = useState("add")

  const token = localStorage.getItem("token");

  const openAddForm = () => {
    setMode("add")
    setSelectedOutlet(null)
    setShowForm(true)
  }

  const openEditForm = (outlet) => {
    setMode("edit")
    setSelectedOutlet(outlet)
    setShowForm(true)
  }
  const closeForm = () => {
    setShowForm(false)
    setSelectedOutlet(null)
    setMode("add")
  }

  const addOutlet = async (data) => {
    try {
      await axios.post(
        "http://localhost:5000/api/outlets/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      getOutlets()
      closeForm()

    } catch (error) {
      console.log(error)
    }
  }


  const getOutlets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/outlets/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOutlets(res.data.outlets)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOutlets()
  }, [])


  const updateOutlet = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/outlets/update/${selectedOutlet.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      getOutlets()
      closeForm()

    } catch (error) {
      console.log(error)
    }
  }


  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/outlets/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      getOutlets()

    } catch (error) {
      console.log(error)
    }
  }





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
      <Dialog open={showForm}
        onOpenChange={(open) => {
          setShowForm(open)
          if (!open) closeForm()
        }}>
        <DialogContent className="sm:max-w-[900px] w-full p-6">
          <DialogHeader>
            <DialogTitle>
              {mode === "edit"
                ? "Edit Outlet"
                : "Add New Outlet"}
            </DialogTitle>
          </DialogHeader>

          <OutletForm
            mode={mode}
            outletData={selectedOutlet}
            onClose={closeForm}
            onSubmitOutlet={
              mode === "add" ? addOutlet : updateOutlet
            }
          />
        </DialogContent>
      </Dialog>



      {/* Table */}
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Outlet Name</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {outlets.map((outlet) => (
            <TableRow key={outlet.id}>

              <TableCell>{outlet.id}</TableCell>
              <TableCell>{outlet.name}</TableCell>
              <TableCell>{outlet.owner}</TableCell>
              <TableCell>{outlet.email}</TableCell>
              <TableCell>{outlet.phone}</TableCell>
              <TableCell>{outlet.address}</TableCell>

              <TableCell className="flex gap-2">
                <Button size="sm" variant="destructive"  onClick={() => openEditForm(outlet)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteUser(outlet.id)}>Delete</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>



      </Table>

    </div>
  )
}