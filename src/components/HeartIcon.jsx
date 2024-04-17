import { useEffect, useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { addFav, deleteFav } from '../pages/Public/Animals/service';
import Heart from 'react-animated-heart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  liked: false,
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleLike':
      return { ...state, isLoading: true };
    case 'toggleLikeSuccess':
      return { liked: !state.liked, isLoading: false };
    case 'toggleLikeError':
      return { ...state, isLoading: false };
    case 'initialLiked':
      return { liked: action.payload, isLoading: false };
    default:
      throw new Error('Acción desconocida: ', action.type);
  }
};

export const HeartIcon = ({ numFavs, userFavs, id, data }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    dispatch({ type: 'initialLiked', payload: userFavs.includes(data?.id) });
  }, [data?.id, userFavs]);

  const toggleLike = async () => {
    if (!data) return toast.warn('Solo para usuarios registrados');
    try {
      dispatch({ type: 'toggleLike' });
      if (!state.liked) await addFav(id);
      if (state.liked) await deleteFav(id);
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
      queryClient.removeQueries({
        queryKey: ['user-favs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['shelters-animals'],
      });
      dispatch({ type: 'toggleLikeSuccess' });
    } catch (error) {
      dispatch({ type: 'toggleLikeError' });
      if (error.response.status && error.response.status === 401) {
        return navigate('/login');
      }
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-start ml-[-40px]">
      <Heart
        {...{ isClick: state.liked }}
        onClick={state.isLoading ? () => {} : toggleLike}
      />
      <span className="ml-[-25px] font-poppins text-xl">{numFavs}</span>
    </div>
  );
};
