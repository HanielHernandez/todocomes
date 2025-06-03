"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { MlRestaurants } from "@/components/molecules/MlRestaurants";
import { MlCategoriesForm } from "@/components/molecules/MlCategoriesForm";
import { createCategory } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/admin/signin/");
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1>Admin</h1>
      <div className="max-w-72xl">
        <MlCategoriesForm  action={createCategory}/>
      </div>

      <MlRestaurants />
    </div>
  );
}
