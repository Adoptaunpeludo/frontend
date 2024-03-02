export const getDogs = async () => {
  const res = await fetch(
    'https://backend.adoptaunpeludo.com/api/animals?type=dog'
  );

  console.log({ res });

  if (!res.ok) throw new Error('Error fetching dogs');

  const data = await res.json();

  return data;
};