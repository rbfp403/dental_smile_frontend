import dentalSmileApi from "./dentalSmileApi";

export const loginAdmin = async (password) =>
  await dentalSmileApi.post("/login", password);

export const changePassword = async (passwords) =>
  await dentalSmileApi.put("/changePassword", passwords);
