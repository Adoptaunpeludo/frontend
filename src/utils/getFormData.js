export const getFormData = async (data) => {
  const { request } = data;
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);

  return registerData;
};
