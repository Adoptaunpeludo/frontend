import { Button, Input } from '@nextui-org/react';
import { IconMailFilled } from '@tabler/icons-react';
const JoinNewsletter = () => {
  return (
    <section
      id='join-newsletter'
      className="w-full bg-[url('/public/backgrounds/join-newsletter.jpg')] h-max bg-bottom bg-cover bg-no-repeat py-40"
    >
      <main
        id='newsletter-background'
        className='max-w-screen-xl w-full flex flex-col h-96  background-panel-newsletter mx-auto'
      >
        <form
          action=''
          id='form-newsletter'
          className='flex flex-col max-w-9xl h-max my-auto gap-8 items-center '
        >
          <div
            id='newsletter title'
            className='text-primary font-lobster text-7xl '
          >
            Únete a nuestra newsletter
          </div>
          <div id='newsletter input' className='flex flex-col justify-start '>
            <Input
              className='min-w-72 '
              type='email'
              label='Email'
              placeholder='Introduce tu email'
            ></Input>
          </div>
          <div
            id='newsletter button'
            className='flex flex-col justify-center mx-auto'
          >
            <Button
              color='primary'
              href='#'
              variant='solid'
              size='lg'
              endContent={<IconMailFilled />}
            >
              Suscríbete
            </Button>
          </div>
        </form>
      </main>
    </section>
  );
};
export default JoinNewsletter;
