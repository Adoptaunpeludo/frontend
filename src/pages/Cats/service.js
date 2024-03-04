export const getCats = async () => {
  const res = await fetch(
    'https://backend.adoptaunpeludo.com/api/animals?type=cat'
  );

  if (!res.ok) throw new Error('Error fetching cats');

  const data = await res.json();

  return data;
};
