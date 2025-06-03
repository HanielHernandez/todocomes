import { MlCategories } from "@/components/molecules/MlCategories";
import { createClient } from "@/utils/supabase/client";
import { createCategory } from "../actions";
import { MlNewCategoryDialog } from "@/components/molecules/MlCreateCategory";


export default async function CateoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .range(0, 10)
    .order("createdAt", { ascending: false });

  return (
    <div className="space-y-4">
      <h2 className=" text-3xl font-semibold tracking-tight first:mt-0">
        Categories
      </h2>
      <div>
      <MlNewCategoryDialog  action={createCategory}/>

      </div>
      {data && <MlCategories data={data} />}
    </div>
  );
}
