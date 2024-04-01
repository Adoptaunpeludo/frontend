import { TitleSection } from '../../../components';
import { resetPassword } from '../../Auth/authService.js';
import { Button, Input } from '@nextui-org/react';
import { Form, useNavigation } from 'react-router-dom';

// TODO: Refactorizar codico de comprovación de contraseña, se repite logica como en Regist
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const { password, repeatPassword } = credentials;
  const { token } = params;

  const isEqualPass = password === repeatPassword;

  try {
    if (isEqualPass) {
      const res = await resetPassword({ password, token });
      console.log({ password, repeatPassword, isEqualPass, res });

      if (res.status === 400) throw new Error(res.response.data.message);
      if (res.status === 500) throw new Error(res.response.data.message);

      return null;
    }
  } catch (error) {
    console.log({ error });
    return null;
  }
};

const ResetPasswordPage = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <TitleSection className="w-full" title="Reseteo de la contraseña" />
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
          <h3 className="flex justify-center text-center text-balance">
            Introduce tu nueva contraseña
            {/*{success ? <RenderSuccessMessage /> : <RenderErrorMessage />}*/}
          </h3>
          <Form method="post" className="flex flex-col gap-6 max-w-lg pt-8">
            <Input
              name="password"
              className="min-w-72 "
              classNames={{ inputWrapper: 'border-1 border-primary' }}
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
              classNames={{ inputWrapper: 'border-1 border-primary' }}
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
            >
              Cambiar contraseña
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
