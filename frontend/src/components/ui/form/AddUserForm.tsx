"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function AddUserForm({
  mode = "add",
  userData,
  onClose,
   onSubmitUser,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  })

  useEffect(() => {
    if (mode === "edit" && userData) {
      reset(userData)
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role: "",
      })
    }
  }, [mode, userData, reset])

  async function onSubmit(data:any) {
  console.log(data)

  try {
    if (mode === "add") {
      await onSubmitUser(data)   // ✅ API call here
      toast.success("User Added Successfully")
    } else {
      toast.success("User Updated Successfully")
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
            {mode === "edit" ? "Edit User" : "Add New User"}
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
                <FieldLabel>Email</FieldLabel>
                <Input {...register("email", { required: true })} />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input {...register("password")} />
              </Field>

              <Field>
                <FieldLabel>Role</FieldLabel>
                <Input {...register("role")} />
              </Field>

            </FieldGroup>

            <div className="flex gap-3">

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {mode === "edit" ? "Update User" : "Add User"}
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