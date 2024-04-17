import { Button, Input } from '@nextui-org/react';
import { IconMailFilled } from '@tabler/icons-react';

import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../../utils/configFormFields';

const JoinNewsletter = () => {
  return (
    <section
      id="join-newsletter"
      className="w-full bg-[url('/backgrounds/join-newsletter.jpg')] h-max bg-bottom bg-cover bg-no-repeat py-40 px-5"
    >
      <main
        id="newsletter-background"
        className="max-w-screen-xl w-full flex flex-col h-96  background-panel-newsletter mx-auto "
      >
        <form
          action=""
          id="form-newsletter"
          className="flex flex-col max-w-9xl h-max my-auto gap-4 items-center px-10 py-5 max-md:items-center "
        >
          <div
            id="newsletter title"
            className="text-primary font-lobster text-7xl max-lg:text-center"
          >
            Únete a nuestra newsletter
          </div>
          <div id="newsletter input" className="flex flex-col justify-start ">
            <Input
              className="min-w-72 "
              type="email"
              label="Email"
              placeholder="Introduce tu email"
              isRequired
              classNames={inputStyleConfig}
            />
          </div>
          <div
            id="newsletter button"
            className="flex flex-col justify-center mx-auto"
          >
            <Button
              color="primary"
              href="#"
              variant="solid"
              size="lg"
              endContent={<IconMailFilled />}
              className={buttonStyleConfig}
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
