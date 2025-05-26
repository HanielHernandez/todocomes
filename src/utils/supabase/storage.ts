import { createClient } from "./client";

export const uploadFile = async (file: File, folder: string) => {
  const supabase = await createClient();

  try {
    const filePath = `public/${Date.now()}_${file.name}`;


    const { data, error } = await supabase.storage
      .from(folder)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });


    if (error) {
      throw error;
    }
    const { data: publicData } = supabase
      .storage
      .from('categories')
      .getPublicUrl(data.path);

    return publicData?.publicUrl ?? null;


  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};
