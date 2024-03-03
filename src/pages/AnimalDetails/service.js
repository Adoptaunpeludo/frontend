export const getAnimalDetails = async () => {
  //! TODO: Change static URL
  const res = await fetch(
    'https://backend.adoptaunpeludo.com/api/animals/08d060d2-03e7-461a-b46b-c3b86f75ef7b'
  );

  console.log({ res });

  if (!res.ok) throw new Error('Error fetching single Animal');

  const data = await res.json();

  return data;
};
