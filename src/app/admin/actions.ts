'use server' 


import { createClient } from "@/lib/supabase"
import { CreateCategoryDto } from "@/types/restaurant"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCategory( payload: CreateCategoryDto ) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
    const { data, error } = await supabase
        .from('categories')
        .insert([payload])
        .select()
    console.log('createCategories', data, error)

  if (error) {
    console.error('Error creating category:', error)
    redirect('/admin/error')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}