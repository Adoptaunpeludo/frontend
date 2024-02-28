import { Button, Input } from '@nextui-org/react';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import Hero from '../../shared/Hero';
import LogoHeader from '../../shared/LogoHeader';
import Panel from '../../shared/Panel';

const LoginPage = () => {
  return (
    <>
      <main className='bg-default-100'>
        <Hero />
        <section
          id='login'
          className='max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto '
        >
          <LogoHeader />
          <Panel>
            <form className='flex flex-col gap-6 max-w-lg mx-auto px-10 py-8'>
              <div>Inicia sesión en tu cuenta para continuar</div>
              <div className='flex flex-col gap-3'>
                {/* TODO: useInput hook to custom all inputs with the same styles */}
                <Input
                  type='email'
                  label='email'
                  placeholder='Introduce tu email'
                ></Input>
                <Input
                  type='password'
                  label='Password'
                  placeholder='Introduce tu password'
                ></Input>
              </div>
              <div className='flex justify-end'>
                <Link>¿Olvidaste tu password?</Link>
              </div>
              <div className='flex justify-center'>
                <Button
                  as={Link}
                  color='primary'
                  href='#'
                  variant='solid'
                  size='lg'
                  endContent={<LoginIcon />}
                  className='px-10'
                >
                  Iniciar sesión
                </Button>
              </div>
              <div className='flex justify-between'>
                <div>¿Necesitas crear una cuenta?</div>
                <div>
                  <Link>Regístrate</Link>
                </div>
              </div>
            </form>
          </Panel>
        </section>
      </main>
      {/* TODO: remove div and links */}
      <div className='container'>
        <h1>Login Page</h1>
        <br />
        <Link to='/register'>Register</Link>
        <br />
        <br />
        <Link to='/'>Landing</Link>
      </div>
    </>
  );
};

export default LoginPage;
