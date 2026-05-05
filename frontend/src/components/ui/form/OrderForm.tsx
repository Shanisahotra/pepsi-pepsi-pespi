"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

type Product = {
  id: number
  name: string
}

type Item = {
  productId: string
  quantity: number
}

type FormValues = {
  outletId: string
  discount: number
}

type OrderFormProps = {
  outletId: number | null
  onClose: () => void
  onSubmitOrder: (payload: {
    outletId: number
    discount: number
    items: {
      productId: number
      quantity: number
    }[]
  }) => Promise<void>
}

export default function OrderForm({
  outletId,
  onClose,
  onSubmitOrder,
}: OrderFormProps) {
  const token = localStorage.getItem("token")

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      outletId: "",
      discount: 0,
    },
  })

  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<Item[]>([
    { productId: "", quantity: 1 },
  ])

  // load products
  useEffect(() => {
    getProducts()
  }, [])

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

  // auto fill outlet id
  useEffect(() => {
    if (outletId) {
      reset({
        outletId: String(outletId),
        discount: 0,
      })
    }
  }, [outletId, reset])

  // add row
  const addItemRow = () => {
    setItems([
      ...items,
      { productId: "", quantity: 1 },
    ])
  }

  // remove row
  const removeItemRow = (index: number) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
  }

  // update row
  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updated = [...items]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setItems(updated)
  }

  // submit
  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        outletId: Number(data.outletId),
        discount: Number(data.discount),
        items: items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        })),
      }

      await onSubmitOrder(payload)


      reset()
      setItems([{ productId: "", quantity: 1 }])
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-4xl rounded-2xl shadow-xl">

        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Order
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* top fields */}
            <FieldGroup className="grid grid-cols-2 gap-4">

              <Field>
                <FieldLabel>Outlet ID</FieldLabel>
                <Input
                  {...register("outletId")}
                  readOnly
                />
              </Field>

              <Field>
                <FieldLabel>Discount</FieldLabel>
                <Input
                  type="number"
                  {...register("discount")}
                />
              </Field>

            </FieldGroup>

            {/* products */}
            <div className="space-y-4">

              <h3 className="text-lg font-semibold">
                Products
              </h3>

              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-3"
                >

                  {/* dropdown */}
                  <select
                    className="border rounded-md px-3 py-2"
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "productId",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.id} - {product.name}
                      </option>
                    ))}
                  </select>

                  {/* qty */}
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e: any) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />

                  {/* remove */}
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      removeItemRow(index)
                    }
                  >
                    Remove
                  </Button>

                </div>
              ))}

              <Button
                type="button"
                onClick={addItemRow}
              >
                Add More Product
              </Button>

            </div>

            {/* buttons */}
            <div className="flex gap-3">

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Create Order"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Cancel
              </Button>

            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}