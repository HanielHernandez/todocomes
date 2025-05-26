"use server"

import { createClient } from "@/lib/supabase";

export async function MlRestaurants() {
  // This function is a placeholder for server-side logic related to restaurants.
  // It can be used to fetch restaurant data from an API or database.
  // Currently, it does not perform any operations.
  
  // Example of fetching data (uncomment and modify as needed):
  // const response = await fetch('https://api.example.com/restaurants');
  // const data = await response.json();
  
  // return data;
    const supabase = await createClient();

    const { data, error } = await supabase.from('categories').select('*').range(0,10).order('createdAt', { ascending: false });
  
  return  <div>
    {
        data && JSON.stringify(data, null, 4)
    }
    {
        error && "Error: " + error.message
    }

  </div>;
}