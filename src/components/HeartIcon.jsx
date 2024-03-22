import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { addFav, deleteFav } from '../pages/Public/Animals/service';
import { useQueryClient } from '@tanstack/react-query';

import { useUser } from '../pages/Private/useUser';
import { Spinner } from '@nextui-org/react';

export const HeartIcon = ({
  size = 24,
  strokeWidth = 1.5,
  numFavs,
  userFavs,
  id,
  ...props
}) => {
  //! TODO: Change reference color and connect to global state
  const { data } = useUser();
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setLiked(userFavs.includes(data?.id));
  }, [data?.id, userFavs]);

  const toggleLike = async () => {
    try {
      setIsLoading(true);
      const { data } = await addFav(id);
      console.log({ data });
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message.startsWith('Already')
      ) {
        await deleteFav(id);
      } else {
        toast.warn('No puedes añadir un animal propio a favoritos');
      }
      if (error.response.status === 401) toast.warn('Primero haz Login');

      throw error;
    } finally {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
    }

    setLiked(!liked);
  };

  return (
    <div onClick={toggleLike} className="flex items-center gap-1">
      <svg
        className={liked ? '[&>path]:stroke-transparent' : ''}
        aria-hidden="true"
        fill={liked ? '#A5C73D' : 'none'}
        focusable="false"
        height={size}
        role="presentation"
        viewBox="0 0 24 24"
        width={size}
        {...props}
      >
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      {isLoading ? <Spinner size="sm" /> : <span>{numFavs}</span>}
    </div>
  );
};

HeartIcon.propTypes = {
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
};
