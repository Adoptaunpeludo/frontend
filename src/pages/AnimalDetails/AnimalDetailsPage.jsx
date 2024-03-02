import { Divider, Spinner, Image, Button } from "@nextui-org/react";
import ErrorPage from "../Error/ErrorPage";
import { useAnimalDetails, animalDetailsQuery } from "./useAnimalDetails";
import { TitleSection } from "@shared";
import { HeartIcon } from "@assets/svg";
import { MinimalLogo } from "@assets/logos";

const InfoRow = ({ label, value }) => (
  <div>
    <div className="flex flex-row justify-between m-1">
      <p>{label}:</p>
      <p>{value}</p>
    </div>
    <Divider />
  </div>
);

const SectionTitle = ({ title }) => <h3 className="my-5 font-bold">{title}</h3>;

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(animalDetailsQuery());
  return null;
};

const AnimalDetailsPage = () => {
  const { data, isLoading, isError } = useAnimalDetails();

  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;

  console.log({ data });

  return (
    <>
      <TitleSection title={data.name} />

      <main className="flex flex-row justify-center">
        {/* Images */}
        {/* //! TODO: Change Static Data */}
        <section className=" w-[1000px] p-3">
          <div className="relative ">
            <Image src="https://s3-alpha-sig.figma.com/img/e86a/7a7f/9cb102669303457d2dd17b768a004b0f?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qje1i22imZUgybd9Tp2893wPVb26cLl19mz31mJynwEnPQ7CbtmFOxCHgu3ji-Y2dOVxwH8n4lyOlPzV6EKxb9JZJaZxR3b~~SFXp6mY244ylXLk68RV810TuwvU9XkjpMof0KJKHvRMxqwQS4oxsXKc9u4sbGSgkUfiiuyx00qs--bsluM43jVqoN1WOv5MOu66cmBiW6WrwyDQADP5StEHAJN3eo3XmuT3Qqrfa1AuVwEmWJ2PFY3yLcyfoYkojq49U6fuJWRcGKUsgvOkgi8NT9-FPf9OQGmo6NdBOvww5gmDL7Sug5JG4P9BEUZVQEikM7lIqp0OaZqi0b6y3w__"></Image>
            <HeartIcon size={40} className="absolute left-3 bottom-3 z-10" />
            <MinimalLogo size={60} className="absolute right-3 top-3 z-10" />
            <Button className="absolute right-3 bottom-3 z-10" color="primary">
              Adoptar
            </Button>
          </div>
          <p className="p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque porttitor dui sit amet semper imperdiet. Donec dolor
            lorem, bibendum id tincidunt ut, cursus et ex. Vivamus tempus libero
            a sapien bibendum, vel sodales lectus varius. Ut ut augue et nulla
            volutpat varius. Proin quis quam dui. Nam diam elit, bibendum a
            lectus ac, placerat auctor leo. Cras id sollicitudin ante, eu
            consequat tortor. Ut hendrerit sapien nec sollicitudin finibus.
            Donec egestas urna sed vulputate malesuada.
          </p>
          {/*<p className="p-2">{data.description} </p>*/}
        </section>

        {/* Info */}
        <section className="p-3">
          <SectionTitle title="Información" />
          <InfoRow label="Fecha de entrada" value={data.createdAt} />
          <InfoRow label="Protectora" value={data.user.username} />
          <InfoRow label="Ciudad" value={data.city} />

          <SectionTitle title="BIO" />
          <InfoRow label="Nombre" value={data.name} />
          <InfoRow label="Edad" value={data.age} />
          <InfoRow label="Raza" value={data.breed} />
          <InfoRow label="Sexo" value={data.gender} />
          <InfoRow label="Tamaño" value={data.size} />

          <SectionTitle title="Otras características" />
          <InfoRow
            label="Fácil de entrenar"
            value={data.easyTrain ? "Si" : "No"}
          />
          <InfoRow label="Nivel de energía" value={data.energyLevel} />
          <InfoRow label="Cantidad de muda" value={data.moltingAmount} />
          <InfoRow label="Nivel de Juego" value={data.playLevel} />
          <InfoRow
            label="Sociable con Niños"
            value={data.kidsFriendly ? "Si" : "No"}
          />
          <InfoRow label="Tendencia a arañar" value={data.scratchPotential} />
          <InfoRow
            label="Entrenado en el arenero"
            value={data.toiletTrained ? "Si" : "No"}
          />
        </section>
      </main>
    </>
  );
};

export default AnimalDetailsPage;

//{
//  "id": "08d060d2-03e7-461a-b46b-c3b86f75ef7b",
//  "name": "Nera",
//  "slug": "yusepe-nera-1",
//  "age": 12,
//  "description": "Negro azabache",
//  "breed": "negrata",
//  "size": "medium",
//  "publishStatus": "pending",
//  "createdAt": "2024-03-01T10:42:31.695Z",
//  "updatedAt": "2024-03-01T10:42:31.695Z",
//  "adoptedBy": null,
//  "createdBy": "ea76f8b8-b8ff-4ad0-be18-db8c79589551",
//  "images": [],
//  "easyTrain": false,
//  "energyLevel": "moderate",
//  "moltingAmount": "light",
//  "status": "awaiting_home",
//  "type": "cat",
//  "gender": "male",
//  "numFavs": 0,
//  "playLevel": "none",
//  "kidsFriendly": false,
//  "scratchPotential": "excessive",
//  "toiletTrained": false,
//  "city": "Málaga",
//  "user": {
//      "avatar": "avatar.png",
//      "username": "yusepe",
//      "isOnline": false
//  }
//}
