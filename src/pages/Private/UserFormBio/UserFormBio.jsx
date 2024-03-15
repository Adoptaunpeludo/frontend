import { Avatar, Button, Input, Spinner } from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { cities } from '../../../utils/enumData';
import { H2Title, Hero, Panel, SelectField } from '../../../components';
import { useFormBio } from './useFormBio';
export const UserFormBio = () => {
  const { data, isLoading } = useFormBio();

  if (isLoading) return <Spinner />;
  const {
    userName,
    avatar,
    // role,
    dni,
    firstName,
    lastName,
    phoneNumber,
    city,
  } = data;
  return (
    <main className="bg-default-100">
      <Hero />
      <section
        id="userFormBio"
        className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto "
      >
        <Panel className="my-14 max-w-4xl mx-auto">
          <form className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8">
            <Avatar
              className="w-40 h-40 bg-white self-center"
              src={`/avatar/${avatar}`}
            />
            <H2Title title={userName} className="mx-auto" />
            <div className="flex flex-col w-full gap-4">
              {/* TODO: useInput hook to custom all inputs with the same styles  */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="min-w-72 "
                  type="file"
                  label="Añade una foto" //TODO: check props for this input
                  placeholder="  "
                ></Input>
                <Input
                  className="min-w-72 "
                  type="text"
                  label="DNI"
                  name="dni"
                  placeholder={dni === '' ? 'Introduce tu email' : dni}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="min-w-72 "
                  type="text"
                  label="Nombre"
                  name="name"
                  placeholder={
                    firstName === '' ? 'Introduce tu nombre' : firstName
                  }
                />
                <Input
                  className="min-w-72 "
                  type="text"
                  label="Apellidos"
                  name="lastName"
                  placeholder={
                    lastName === '' ? 'Introduce tus apellidos' : lastName
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="min-w-72 "
                  type="tel"
                  label="Teléfono"
                  name="phoneNumber"
                  placeholder={
                    phoneNumber === '' ? 'Introduce tu teléfono' : phoneNumber
                  }
                />
                <SelectField
                  label="Ciudad"
                  className="min-w-72"
                  name="city"
                  dataField={city}
                  dataEnum={cities}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                color="primary"
                type="reset"
                variant="solid"
                size="sm"
                startContent={<IconCircleX />}
                className="px-10 font-poppins font-semibold text-sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                variant="solid"
                size="sm"
                startContent={<IconSend2 />}
                className="px-10 font-poppins font-semibold text-sm"
              >
                Enviar
              </Button>
            </div>
          </form>
        </Panel>
      </section>
    </main>
  );
};
export default UserFormBio;
