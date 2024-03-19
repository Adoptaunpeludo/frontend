import { Pagination } from '@nextui-org/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

export const PagePagination = ({ data }) => {
  const { params } = useLoaderData();

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
