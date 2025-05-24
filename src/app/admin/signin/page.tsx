"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useState } from "react";
import { signin } from "./actions";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted:", values);
    setLoading(true);
    try {
      await signin(values);
      setLoading(false);
    } catch (error) {
      console.error("Error during signup:", error);
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      The Email you want to use for sign in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                name="email"
              ></FormField>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The Password you want to use for sign in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                name="password"
              ></FormField>

              <Button type="submit" className="w-full"> Sign In  

                {loading && (
                  <span className="ml-2 animate-spin h-6 w-6 rounded-full border border-4  border-t-white   border-neutral-500 "></span>
                )}

              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
