import { Button, Link } from '@nextui-org/react';
// send adoptAnimal for specific animal link
export const AdoptButton = ({ className, adoptAnimal = '/shelters' }) => {
  return (
    <Button
      size="md"
      color="primary"
      className={`${className} w-32`}
      as={Link}
      href={adoptAnimal}
    >
      <span className="font-lobster text-xl text-white">Adoptar</span>
    </Button>
  );
};
