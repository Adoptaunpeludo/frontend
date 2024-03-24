import { Pagination } from '@nextui-org/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

export const PagePagination = ({ data }) => {
  const { filters } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNumber) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  return (
    <Pagination
      showControls
      total={data.maxPages}
      page={+filters?.page || 1}
      onChange={handlePageChange}
    />
  );
};
