//

export const uploadImage = async (file) => {
  //

  if (!file) throw new Error("No tenemos ningúna archivo a subir");

  const formData = new FormData();
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_NAME);
  formData.append("file", file);

  try {
    const resp = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await resp.json();
    return { id: cloudResp.public_id.split("/")[1], url: cloudResp.secure_url };

    //
  } catch (error) {
    console.log("Error al registrar la foto", error);
    throw new Error(error.message);
  }
};
