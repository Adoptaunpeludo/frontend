import { getAnimalDetails } from './service';

export const animalDetailsQuery = slug => {
  console.log(slug);

  return {
    queryKey: ['animalDetails', slug],
    queryFn: async () => getAnimalDetails(slug)
  };
};

export const useAnimalDetails = slug => {
  // const { data, isLoading, isError } = useQuery(animalDetailsQuery(slug));
  const data = {
    id: 'b96c3604-b8af-4c83-8d65-ca46baa70370',
    name: 'Rocky',
    slug: 'shelter2-rocky',
    age: 2,
    description: 'Adventurous and playful',
    breed: 'Golden Retriever',
    size: 'big',
    publishStatus: 'published',
    createdAt: '2024-03-12T16:15:48.901Z',
    updatedAt: '2024-03-12T16:15:48.901Z',
    adoptedBy: null,
    createdBy: 'd6560b21-b464-4de7-94ca-94a13316c178',
    images: ['golden/rocky1.webp', 'golden/rocky2.webp', 'golden/rocky3.webp'],
    easyTrain: 'true',
    energyLevel: 'high',
    moltingAmount: 'moderate',
    status: 'awaiting_home',
    type: '',
    gender: '',
    numFavs: 0,
    departmentAdapted: 'true',
    droolingPotential: 'none',
    bark: 'low',
    city: 'Sevilla',
    playLevel: 'moderate',
    kidsFriendly: 'false',
    scratchPotential: 'high',
    toiletTrained: 'true',
    easyTrain: 'true',
    energyLevel: 'high',
    user: {
      avatar: 'avatar.png',
      username: 'shelter2',
      isOnline: 'false'
    }
  };
  const isLoading = false;
  const isError = false;

  return { data, isLoading, isError };
};
