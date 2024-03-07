import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { IconPawFilled } from '@tabler/icons-react';
const PetCardLanding = ({ image, name, age, breed }) => {
  return (
    <Card
      className='bg-white max-w-xl rounded-2xl flex gap-3 py-2 px-4'
      shadow='sm'
    >
      <CardBody>
        <div className='grid grid-cols-6 sm:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
          <div className='relative col-span-6 sm:col-span-7'>
            <Image
              alt={name}
              className='object-cover h-28 w-60'
              shadow='md'
              src={`/featured-dogs/${image}`}
            />
          </div>
          <div className='relative col-span-6  sm:col-span-5 '>
            <div className='data flex flex-col   '>
              <div className='name font-poppins text-3xl font-bold '>
                {name}
              </div>
              <div className='breed-age flex gap-1 pb-4'>
                <span className='breed font-poppins text-sm font-bold'>
                  {breed}
                </span>
                <span className='age font-poppins text-sm'>{age}</span>
              </div>
            </div>
            <div className='flex flex-col justify-center mx-auto'>
              <Button
                size='sm'
                color='primary'
                endContent={<IconPawFilled />}
                className='px-5'
              >
                Ver peludo
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default PetCardLanding;
