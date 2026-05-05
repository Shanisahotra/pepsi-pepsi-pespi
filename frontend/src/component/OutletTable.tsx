"use client"

import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import OutletForm from "@/components/ui/form/OutletForm"
import OrderForm from "@/components/ui/form/OrderForm"
import OutletInvoice from "@/components/ui/Invoices/OutletInvoice";

type Outlet = {
  id: number
  name: string
  owner: string
  email: string
  phone: string
  address: string
}

type OutletPayload = {
  name: string
  owner: string
  email: string
  phone: string
  address: string
}

type OrderPayload = {
  outletId: number
  discount: number
  items: {
    productId: number
    quantity: number
  }[]
}

type OutletsResponse = {
  outlets: Outlet[]
  totalPages: number
}

export default function OutletTable() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null)
  const [mode, setMode] = useState<"add" | "edit">("add")

  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(5)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [search, setSearch] = useState<string>("")

  const [showOrderForm, setShowOrderForm] = useState<boolean>(false)
  const [selectedOutletId, setSelectedOutletId] = useState<number | null>(null)
  const token = localStorage.getItem("token");

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoiceOutlet, setSelectedInvoiceOutlet] = useState<Outlet | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const openAddForm = () => {
    setMode("add")
    setSelectedOutlet(null)
    setShowForm(true)
  }

  const openEditForm = (outlet: Outlet) => {
    setMode("edit")
    setSelectedOutlet(outlet)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setSelectedOutlet(null)
    setMode("add")
  }

  const openOrderForm = (outlet: Outlet) => {
    setSelectedOutletId(outlet.id)
    setShowOrderForm(true)
  }



  const openInvoice = async (outlet: Outlet) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/orders/${outlet.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSelectedOrder(res.data.order); // adjust if backend key differs
    setShowInvoice(true);
  } catch (error) {
    console.log(error);
    toast.error("Failed to load invoice");
  }
};

  const addOutlet = async (data: OutletPayload) => {
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

      toast.success("Outlet Added")
      getOutlets(page)
      closeForm()
    } catch (error) {
      console.log(error)
      toast.error("Failed to add outlet")
    }
  }

  const getOutlets = async (pageNumber: number = 1) => {
    try {
      const res = await axios.get<OutletsResponse>(
        `http://localhost:5000/api/outlets/all?page=${pageNumber}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOutlets(res.data.outlets)
      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOutlets(page)
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

  const updateOutlet = async (data: OutletPayload) => {
    if (!selectedOutlet) return

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

      toast.success("Outlet Updated")
      getOutlets(page)
      closeForm()
    } catch (error) {
      console.log(error)
      toast.error("Failed to update outlet")
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/outlets/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Outlet Deleted")
      getOutlets(page)
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete outlet")
    }
  }

  const searchOutlets = async (searchText: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/outlets/search?query=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOutlets(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  const createOrder = async (payload: OrderPayload) => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Order Created")
      setShowOrderForm(false)
    } catch (error) {
      const err = error as AxiosError<any>

      toast.error(
        err.response?.data?.message || "Failed to create order"
      )
    }
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">

        <div className="w-full max-w-sm">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e: any) => {
              const value = e.target.value
              setSearch(value)
              searchOutlets(value)
            }}
          />
        </div>

        <Button onClick={openAddForm}>
          Add New
        </Button>

      </div>

      {/* Outlet Modal */}
      <Dialog
        open={showForm}
        onOpenChange={(open: any) => {
          setShowForm(open)
          if (!open) closeForm()
        }}
      >
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
              mode === "add"
                ? addOutlet
                : updateOutlet
            }
          />

        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
      >
        <DialogContent className="sm:max-w-[900px] w-full p-6">

          <DialogHeader>
            <DialogTitle>
              Create Order
            </DialogTitle>
          </DialogHeader>

          <OrderForm
            outletId={selectedOutletId}
            onClose={() => setShowOrderForm(false)}
            onSubmitOrder={createOrder}
          />

        </DialogContent>
      </Dialog>

    <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
  <DialogContent className="w-[90vw] max-w-6xl">

    <DialogHeader>
      <DialogTitle>Outlet Invoice</DialogTitle>
    </DialogHeader>

    {selectedOrder && (
      <OutletInvoice order={selectedOrder} />
    )}

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
            <TableHead>Order</TableHead>
            <TableHead>View</TableHead>
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

              <TableCell>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    openOrderForm(outlet)
                  }
                >
                  Order
                </Button>
              </TableCell>
<TableCell>
  <div className="flex gap-2">

   <TableCell>
  <Button
    size="sm"
    variant="secondary"
    onClick={() => openInvoice(outlet)}
  >
    View
  </Button>
</TableCell>


  </div>
</TableCell>

<TableCell>
  <div className="flex gap-2">

    <Button
      size="sm"
      variant="destructive"
      onClick={() => openEditForm(outlet)}
    >
      Edit
    </Button>

    <Button
      size="sm"
      variant="destructive"
      onClick={() => deleteUser(outlet.id)}
    >
      Delete
    </Button>
  </div>
  </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">

        <Pagination>
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={prevPage}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {Array.from(
              { length: totalPages },
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() =>
                      setPage(i + 1)
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={nextPage}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>

      </div>

    </div>
  )
}