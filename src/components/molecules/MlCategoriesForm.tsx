"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { uploadFile } from "@/utils/supabase/storage";
import { createCategory } from "@/app/admin/actions";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(6, "Password must be at least 6 characters"),
  imageUrl: z.any(),
});

export type CategoryFormValues = {
  name: string;
  description: string;
  imageUrl: File; // Changed to File to handle file uploads
};




export function MlCategoriesForm() {
  const [loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted:", { values });
    setLoading(true);
    try {
      if (categoryImage) {

        const imageUrl = await uploadFile(categoryImage, "categories");

        if (!imageUrl) {
          throw new Error("Failed to upload image");
        }


        await createCategory({
          ...values,
          imageUrl,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error during signup:", error);
      setLoading(false);
    }
  }

  const onImageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCategoryImage(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the category" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          name="name"
        ></FormField>
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Category description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          name="description"
        ></FormField>

        <FormField
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={onImageValueChange}
                  placeholder="Category description"
                  className="resize-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          name="imageUrl"
        ></FormField>

        <Button type="submit" className="w-full">
          Sign In
          {loading && (
            <span className="ml-2 animate-spin h-6 w-6 rounded-full border border-4  border-t-white   border-neutral-500 "></span>
          )}
        </Button>
      </form>
    </Form>
  );
}
