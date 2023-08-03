import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id, removeCurrentImg) {
  // Check if image starts with supabase url
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);

  let imgName = null;
  let imgPath = null;
  if (hasImgPath) {
    imgPath = newCabin.image;
  } else {
    imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
  }

  // 1. Create/Edit cabin in Supabase
  let query = supabase.from("cabins");

  // 1A. Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  // 1B. Edit cabin
  if (id) query = query.update({ ...newCabin, image: imgPath }).eq("id", id);

  // const { data, error } = await query;
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Delete current image from Supabase Storage before uploading new one
  if (removeCurrentImg) {
    // 2A. First check if multiple cabins are using the same image
    const { data, error } = await supabase
      .from("cabins")
      .select("image")
      .eq("image", removeCurrentImg);

    if (error) {
      console.log(error);
      throw new Error("Failed to check if image is used by other cabins");
    }

    if (!data.length) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .remove([removeCurrentImg.split("/").pop()]);

      if (storageError) {
        console.log(storageError);
        throw new Error("Cabin image could not be deleted");
      }
    }
  }
  // 3. Upload image to Supabase Storage
  if (imgName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imgName, newCabin.image);

    // 4. Delete the cabin IF failed to upload image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }
  return data;
}

export async function deleteCabin({ cabinId, imgName }) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  // Check if multiple cabins are using the same image
  const { data, error: failedToFindImgError } = await supabase
    .from("cabins")
    .select("image")
    .eq("image", imgName);

  if (failedToFindImgError) {
    console.log(failedToFindImgError);
    throw new Error("Failed to check if image is used by other cabins");
  }

  if (!data.length) {
    // Delete image from storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([imgName.split("/").pop()]);

    if (storageError) {
      console.log(storageError);
      throw new Error("Cabin image could not be deleted");
    }
  }
}
