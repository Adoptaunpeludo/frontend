import { H2Title } from '../../../../components';

export const DoplaxCard = () => {
  return (
    <div className="text-pretty leading-5 flex flex-col ">
      <H2Title
        title="Desarrollador Frontend"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Me propongo diseñar experiencias de usuario fluidas y agradables
        mediante la creación de aplicaciones atractivas y funcionales centradas
        en el usuario. Me siento especialmente atraído por desarrollar
        aplicaciones que no solo sean funcionales, sino también visualmente
        atractivas y fáciles de usar.
      </p>
      <p>
        Logro esto implementando principios SOLID y una arquitectura limpia, y
        aplicando pruebas para garantizar la calidad. También utilizo
        metodologías ágiles para la adaptabilidad y la mejora continua.
      </p>
      <p>
        Aparte del ámbito tecnológico (aunque no tan aparte), me apasiona la
        ciencia y el progreso en general. Disfruto escuchando varios podcasts
        sobre astrofísica, cosmología y aeronáutica. Los videojuegos me
        fascinan, no solo como entretenimiento, sino como una forma de expresión
        artística. Me gusta viajar y conocer personas de diferentes culturas, y
        creo firmemente en un mundo sin fronteras, donde todos deberíamos
        trabajar juntos independientemente de nuestro lugar de nacimiento, color
        de piel o identidad de género.
      </p>
    </div>
  );
};
export default DoplaxCard;
