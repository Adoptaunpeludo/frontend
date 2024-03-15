import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconLink,
  IconTrashXFilled
} from '@tabler/icons-react';

export const SocialMediaTable = ({ socialMedia = [] }) => {
  const socialIcon = name => {
    switch (name) {
      case 'facebook':
        return <IconBrandFacebook />;
      case 'instagram':
        return <IconBrandInstagram />;
      case 'xtweet':
        return <IconBrandX />;

      default:
        return <IconLink />;
    }
  };
  return (
    <Table aria-label='RRSS de la protectora' className='mx-auto max-w-lg '>
      <TableHeader>
        <TableColumn>RRSS</TableColumn>
        <TableColumn>Perfil</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No hay redes sociales disponibles.'}>
        {socialMedia.map((social, index) => (
          <TableRow key={index}>
            <TableCell>{socialIcon(social.name)}</TableCell>
            <TableCell>{social.url}</TableCell>
            <TableCell>
              <div className='relative flex items-center gap-2'>
                <Tooltip content='Editar RRSS '>
                  <Button isIconOnly variant='solid' color='primary' size='sm'>
                    <IconEdit />
                  </Button>
                </Tooltip>
                <Tooltip color='danger' content='Eliminar RRSS'>
                  <Button isIconOnly variant='solid' color='danger' size='sm'>
                    <IconTrashXFilled />
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default SocialMediaTable;
