import { H2Title } from './H2Title';

export const NoData = () => {
  return (
    <p className="flex flex-col justify-center ">
      <span className="font-lobster text-9xl text-center">0</span>
      <H2Title title="resultados que mostrar " className="text-primary" />
    </p>
  );
};
