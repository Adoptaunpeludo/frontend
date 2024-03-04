export const getAnimalDetails = async (slug) => {
  //! TODO: Change static URL
  const res = await fetch(
    `https://backend.adoptaunpeludo.com/api/animals/${slug}`
  );

  if (!res.ok) throw new Error('Error fetching single Animal');

  const data = await res.json();

  return data;
};
