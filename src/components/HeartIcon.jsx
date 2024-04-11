import { useEffect, useState } from 'react';

import { addFav } from '../pages/Public/Animals/service';
import { useQueryClient } from '@tanstack/react-query';

//import { Button, Spinner } from '@nextui-org/react';
import { handleFavError } from '../utils/handleFavsError';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import Heart from 'react-animated-heart';

export const HeartIcon = ({
  top,
  userFavs,
  id,
  data,
  
}) => {
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
    <div className="relative">
      <div className={`absolute top-[${top}]`}>
        <Heart isClick={liked} onClick={isLoading ? () => {} : toggleLike} />
      </div>
    </div>
  );
};
