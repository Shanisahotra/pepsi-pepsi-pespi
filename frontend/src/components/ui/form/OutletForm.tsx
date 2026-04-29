"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

type OutletFormValues = {
  name: string
  owner: string
  email: string
  phone: string
  address: string
}

type OutletFormProps = {
  mode?: "add" | "edit"
  outletData?: OutletFormValues | null
  onClose?: () => void
  onSubmitOutlet: (
    data: OutletFormValues
  ) => Promise<void>
}

export default function OutletForm({
  mode = "add",
  outletData = null,
  onClose,
  onSubmitOutlet,
}: OutletFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<OutletFormValues>({
    defaultValues: {
      name: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  useEffect(() => {
    if (mode === "edit" && outletData) {
      reset(outletData)
    } else {
      reset({
        name: "",
        owner: "",
        email: "",
        phone: "",
        address: "",
      })
    }
  }, [mode, outletData, reset])

  const onSubmit = async (
    data: OutletFormValues
  ) => {
    try {
      await onSubmitOutlet(data)

      if (mode === "add") {
        toast.success(
          "Outlet Added Successfully"
        )
      } else {
        toast.success(
          "Outlet Updated Successfully"
        )
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
            {mode === "edit"
              ? "Edit Outlet"
              : "Add New Outlet"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>

              <Field>
                <FieldLabel>
                  Name
                </FieldLabel>
                <Input
                  {...register("name", {
                    required: true,
                  })}
                />
              </Field>

              <Field>
                <FieldLabel>
                  Owner Name
                </FieldLabel>
                <Input
                  {...register("owner", {
                    required: true,
                  })}
                />
              </Field>

              <Field>
                <FieldLabel>
                  Email
                </FieldLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                />
              </Field>

              <Field>
                <FieldLabel>
                  Phone
                </FieldLabel>
                <Input
                  {...register("phone")}
                />
              </Field>

              <Field>
                <FieldLabel>
                  Address
                </FieldLabel>
                <Input
                  {...register("address")}
                />
              </Field>

            </FieldGroup>

            <div className="flex gap-3">

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? mode === "edit"
                    ? "Updating..."
                    : "Adding..."
                  : mode === "edit"
                  ? "Update Outlet"
                  : "Add Outlet"}
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