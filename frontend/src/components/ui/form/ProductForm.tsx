"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function ProductForm({
  mode = "add",
  productData,
  onClose,
   onSubmitProduct,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      
    },
  })

  useEffect(() => {
    if (mode === "edit" && productData) {
      reset(productData)
    } else {
      reset({
      name: "",
      price: "",
      })
    }
  }, [mode, productData, reset])

  async function onSubmit(data:any) {
  console.log(data)

  try {
    if (mode === "add") {
      await onSubmitProduct(data)   //API call here
      toast.success("Product Added Successfully")
    } else {
      toast.success("Product Updated Successfully")
    }

    reset()
    onClose?.()

  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl">

        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {mode === "edit" ? "Edit product" : "Add New Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <FieldGroup>

              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...register("name", { required: true })} />
              </Field>

              <Field>
                <FieldLabel>Owner Name</FieldLabel>
                <Input {...register("price", { required: true })} />
              </Field>


            </FieldGroup>

            <div className="flex gap-3">

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {mode === "edit" ? "Update project" : "Add project"}
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