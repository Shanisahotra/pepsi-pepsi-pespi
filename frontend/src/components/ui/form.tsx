"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Login Successful", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-zinc-900 p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8">
      {/* Logo + Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/11/Pepsi-Logo-2023.png"
          alt="Logo"
          className="mx-auto h-10 w-auto"
        />

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      {/* Card Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
          <CardContent className="pt-6">
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FieldGroup>
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-100">
                        Email address
                      </FieldLabel>

                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email"
                        className="bg-white/5 text-white border-white/10 placeholder:text-gray-500"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between">
                        <FieldLabel className="text-gray-100">
                          Password
                        </FieldLabel>

                        <a
                          href="#"
                          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                          Forgot password?
                        </a>
                      </div>

                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className="bg-white/5 text-white border-white/10 placeholder:text-gray-500"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-indigo-500 font-semibold text-white hover:bg-indigo-400"
              >
                Sign in
              </Button>
            </form>

            {/* Bottom Text */}
            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Start a 14 day free trial
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}