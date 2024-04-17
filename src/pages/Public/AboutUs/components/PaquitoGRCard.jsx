import { H2Title } from '../../../../components';

export const PaquitoGRCard = () => {
  return (
    <div className="text-pretty leading-5 flex flex-col ">
      <H2Title
        title="Desarrollador Frontend"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Desde pequeño he sentido una pasión por la tecnología, aunque las
        circunstancias me llevaron por el camino de la hostelería. Sin embargo,
        ahora me he propuesto seguir mi verdadera vocación y dedicarme a lo que
        realmente me entusiasma: las tecnologías de la información.{' '}
      </p>
      <p>
        A pesar de no haber trabajado en el campo de la informática desde que
        obtuve mi título de formación profesional de grado superior, nunca he
        dejado de interesarme y aprender sobre los fundamentos del desarrollo de
        software con varios lenguajes. También he explorado áreas como la
        contenerización de aplicaciones y la automatización de procesos. Además,
        siempre he tenido habilidades para la resolución de problemas
        matemáticos y lógicos, así como una curiosidad por comprender cómo
        funcionan los sistemas y qué papel juega cada componente, tanto a nivel
        de software como de hardware.
      </p>
      <p>
        {' '}
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
export default PaquitoGRCard;
