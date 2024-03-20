import {
  Button,
  Chip,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';

import {
  IconEdit,
  IconEye,
  IconHeartFilled,
  IconTrashXFilled,
} from '@tabler/icons-react';
import React from 'react';

import {
  ColumnsAdopter,
  ColumnsShelter,
  statusColorMap,
} from '../../../shared/components/configAnimalsTable';

import { useUserAnimals } from '../../useUserAnimals';

export const StatusAnimalsTable = ({ role }) => {
  const headerColumn = role === 'shelter' ? ColumnsShelter : ColumnsAdopter;

  const { data, isFetching } = useUserAnimals({ limit: 100 });

  const { animals } = data;

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
                href={`/${animal.type}s/${animal.slug}`}
                variant="solid"
                color="primary"
                size="sm"
              >
                <IconEye />
              </Button>
            </Tooltip>
            <Tooltip content="Editar peludo ">
              <Button isIconOnly variant="solid" color="primary" size="sm">
                <IconEdit />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar Peludo">
              <Button isIconOnly variant="solid" color="danger" size="sm">
                <IconTrashXFilled />
              </Button>
            </Tooltip>
          </div>
        );
      case 'actionsAdopter':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Detalles">
              <Button isIconOnly variant="solid" color="primary" size="sm">
                <IconEye />
              </Button>
            </Tooltip>
            <Tooltip content="Me gusta ">
              <Button isIconOnly variant="solid" color="primary" size="sm">
                <IconHeartFilled />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isFetching) return <Spinner />;

  return (
    <Table aria-label="Animals info">
      <TableHeader columns={headerColumn} className="flex justify-center">
        {(column) => (
          <TableColumn key={column.uid} className="text-start ">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={animals}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
