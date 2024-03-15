import { Pagination } from '@nextui-org/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useAnimals } from '../pages/Landing/useAnimals';

const PagePagination = ({ page }) => {
  const { params } = useLoaderData();
  const { data } = useAnimals(page, params);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNumber) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  return (
    <Pagination
      showControls
      total={data.maxPages}
      page={+params?.page || 1}
      onChange={handlePageChange}
    />
  );
};

export default PagePagination;
