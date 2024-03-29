import {
  Button,
  Chip,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';

import { IconEdit, IconEye, IconHeartFilled } from '@tabler/icons-react';
import React from 'react';

import {
  ColumnsAdopter,
  ColumnsShelter,
  statusColorMap,
} from '../../../shared/components/configAnimalsTable';

import { translateStatusAnimals } from '../../../../../utils/translateDataTable';
import { useUserAnimals } from '../../useUserAnimals';
import DeleteAnimalModal from './DeleteAnimalModal';

export const StatusAnimalsTable = ({ role }) => {
  const headerColumn = role === 'shelter' ? ColumnsShelter : ColumnsAdopter;

  const { data, isFetching } = useUserAnimals(
    role,
    role === 'shelter' && { limit: 100 }
  );

  const animals = translateStatusAnimals(data.animals);
  //const
  const renderCell = React.useCallback((animal, columnKey) => {
    const cellValue = animal[columnKey];
    // if (isLoading) return <Spinner />;
    switch (columnKey) {
      case 'status':
        return (
          <Chip
            className="capitalize w-full"
            color={statusColorMap[animal.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'publishStatus':
        return (
          <Chip
            className="capitalize w-full"
            color={statusColorMap[animal.publishStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'actionsShelter':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Detalles">
              <Button
                isIconOnly
                as={Link}
                href={`/animals/${animal.type}s/${animal.slug}`}
                variant="solid"
                color="primary"
                size="sm"
              >
                <IconEye />
              </Button>
            </Tooltip>
            <Tooltip content="Editar peludo ">
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                size="sm"
                as={Link}
                href={`/private/shelter/update-animal/${animal.slug}`}
              >
                <IconEdit />
              </Button>
            </Tooltip>

            <DeleteAnimalModal slug={animal.slug} />
          </div>
        );
      case 'actionsAdopter':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Detalles">
              <Button
                isIconOnly
                as={Link}
                href={`/animals/${animal.type}s/${animal.slug}`}
                variant="solid"
                color="primary"
                size="sm"
              >
                <IconEye />
              </Button>
            </Tooltip>
            <Tooltip content="Me gusta ">
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                size="sm"
                name="intent"
                value={'remove-fav'}
                type="submit"
              >
                <IconHeartFilled />
              </Button>
            </Tooltip>
            <input type="hidden" name="id" value={animal.id} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Skeleton isLoaded={!isFetching}>
      <Table aria-label="Animals info" className="mb-5 max-h-96" isHeaderSticky>
        <TableHeader columns={headerColumn} className="flex justify-center">
          {(column) => (
            <TableColumn key={column.uid} className="text-start ">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={`${
            role === 'shelter'
              ? 'No hay peludos, crea el primero'
              : 'No hay peludos, elige el primero'
          }`}
          items={animals}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="capitalize">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Skeleton>
  );
};
