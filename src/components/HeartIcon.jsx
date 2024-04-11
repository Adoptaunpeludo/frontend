import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { addFav } from '../pages/Public/Animals/service';

//import { Button, Spinner } from '@nextui-org/react';
import { isAxiosError } from 'axios';
import Heart from 'react-animated-heart';
import { toast } from 'react-toastify';
import { handleFavError } from '../utils/handleFavsError';

export const HeartIcon = ({ numFavs, userFavs, id, data }) => {
  const [liked, setLiked] = useState(userFavs.includes(data?.id));
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setLiked(userFavs.includes(data?.id));
  }, [data?.id, userFavs]);

  const toggleLike = async () => {
    if (!data) return toast.warn('Loguea primero por favor');
    try {
      setIsLoading(true);
      await addFav(id);
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
      queryClient.removeQueries({
        queryKey: ['user-favs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['shelters-animals'],
      });
    } catch (error) {
      if (isAxiosError(error) && error.response.status === 400)
        await handleFavError(error, id, queryClient);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-start ml-[-40px]">
      <Heart
        {...{ isClick: liked }}
        onClick={isLoading ? () => {} : toggleLike}
      />
      <span className="ml-[-25px] font-poppins text-xl">{numFavs}</span>
    </div>
  );
};
