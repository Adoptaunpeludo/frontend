import { Button, Input, Spinner } from '@nextui-org/react';
import { Form, useNavigation } from 'react-router-dom';

import { H3Title } from '../../../components/H3Title.jsx';
import { LogoHeader } from '../../../components/LogoHeader.jsx';
import { Panel } from '../../../components/Panel.jsx';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields.js';

import { action } from './action.js';

const ResetPasswordPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="ResetPasswordPage"
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
              title="Introduce tu nueva contraseña"
              className={'normal-case text-pretty'}
            />
            {isSubmitting && <Spinner />}
            <Input
              name="password"
              className="min-w-72 "
              classNames={inputStyleConfig}
              type="password"
              label="Password"
              placeholder="Introduce tu password"
              isDisabled={isSubmitting}
              // value="P@ssw0rda"
              //  color={errors.password ? 'danger' : 'none'}
              //  errorMessage={errors.password}
              //  onChange={handleChange}
              isRequired
            />
            <Input
              name="repeatPassword"
              className="min-w-72 "
              classNames={inputStyleConfig}
              type="password"
              label="confirmar password"
              placeholder="Introduce tu password"
              isDisabled={isSubmitting}
              // value="P@ssw0rda"
              //  color={errors.repeatPassword ? 'danger' : 'none'}
              //  errorMessage={errors.repeatPassword}
              //  onChange={handleChange}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              isLoading={isSubmitting}
              className={buttonStyleConfig}
            >
              Cambiar contraseña
            </Button>
          </Form>
        </Panel>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
