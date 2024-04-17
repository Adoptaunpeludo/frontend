import { Button, Input, Spinner } from '@nextui-org/react';
import { Form, useNavigation } from 'react-router-dom';
import { useState } from 'react';

import { H3Title, LogoHeader, Panel } from '../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields';
import { validateField } from '../../../utils/validateField';

import { action } from './action';

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateField('email', value));
  };

  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="ResetPassword"
        className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto  "
      >
        <LogoHeader className={'mx-auto'} />
        <Panel className={'max-w-md mx-auto'}>
          <Form
            method="post"
            className="flex flex-col gap-6  mx-auto px-10 py-8"
            action={action}
          >
            <H3Title
              title="Por favor, introduce tu correo electrónico para restablecer tu
                contraseña"
              className={'normal-case text-pretty'}
            />
            {isSubmitting && <Spinner />}
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Introduce tu email"
                type="email"
                label="Email"
                name="email"
                isRequired
                isDisabled={isSubmitting}
                classNames={inputStyleConfig}
                color={error ? 'danger' : 'none'}
                errorMessage={error}
                onChange={handleChange}
              />
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                isDisabled={isSubmitting}
                className={buttonStyleConfig}
              >
                Enviar
              </Button>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
