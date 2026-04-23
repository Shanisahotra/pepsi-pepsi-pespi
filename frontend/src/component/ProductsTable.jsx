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

import ProductForm from "@/components/ui/form/ProductForm"

export default function ProductsTable() {
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [mode, setMode] = useState("add")

    const token = localStorage.getItem("token");

    const openAddForm = () => {
        setMode("add")
        setSelectedProduct(null)
        setShowForm(true)
    }

    const openEditForm = (outlet) => {
        setMode("edit")
        setSelectedProduct(outlet)
        setShowForm(true)
    }
    const closeForm = () => {
        setShowForm(false)
        setSelectedProduct(null)
        setMode("add")
    }

    const addProduct = async (data) => {
        try {
            await axios.post(
                "http://localhost:5000/api/products/create",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            getProducts()
            closeForm()

        } catch (error) {
            console.log(error)
        }
    }


    const getProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/products/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setProducts(res.data.products)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    const updateProducts = async (data) => {
        try {
            await axios.put(
                `http://localhost:5000/api/products/update/${selectedProduct.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            getProducts()
            closeForm()

        } catch (error) {
            console.log(error)
        }
    }


    const deleteProduct = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/outlets/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            getProducts()

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

                    < ProductForm
                        mode={mode}
                        productData={selectedProduct}
                        onClose={closeForm}
                        onSubmitProduct={
                            mode === "add" ? addProduct : updateProduct
                        }
                    />
                </DialogContent>
            </Dialog>



            {/* Table */}
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>

                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>


                            <TableCell className="flex gap-2">
                                <Button size="sm" onClick={() => openEditForm(product)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteUser(product.id)}>Delete</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>



            </Table>

        </div>
    )
}