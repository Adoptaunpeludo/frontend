export const technologiesDevops = [
  {
    img: '/logoTech/aws.svg',
    title: 'AWS S3',
    description: `
<p>Se eligió <strong>Amazon S3</strong> como el lugar de almacenamiento para las imágenes de usuarios y animales en adoptaunpeludo.com debido a su confiabilidad, escalabilidad y fácil integración.</p>
<p>Proporciona una solución segura y altamente disponible, que puede manejar grandes cantidades de datos sin problemas. La integración con otros servicios de AWS simplifica el desarrollo y la administración de la aplicación.</p>
<p>En resumen, <strong>Amazon S3</strong> garantiza la disponibilidad y seguridad de las imágenes, proporcionando una solución robusta y confiable para el almacenamiento de archivos en adoptaunpeludo.com.</p>
`,
  },
  {
    img: '/logoTech/ec2.svg',
    title: 'AWS EC2',
    description:
      '<p>Se seleccionó una instancia de <strong>AWS EC2</strong> para alojar la aplicación adoptaunpeludo.com debido a su flexibilidad, escalabilidad y facilidad de configuración. <p>EC2 proporciona un entorno de cómputo virtual que puede adaptarse a las necesidades específicas de la aplicación, permitiendo escalar verticalmente o horizontalmente según sea necesario. </p> <p>Además, la amplia gama de opciones de configuración y la integración con otros servicios de AWS facilitan el despliegue y la administración de la aplicación en la nube.</p><p> En resumen, la instancia de <strong>AWS EC2</strong> ofrece un entorno confiable y escalable para alojar adoptaunpeludo.com, garantizando su disponibilidad y rendimiento óptimo en todo momento.</p>',
  },
  {
    img: '/logoTech/docker.svg',
    title: 'Docker',
    description:
      '<p>Se optó por utilizar <strong>Docker</strong> para contenerizar la aplicación adoptaunpeludo.com debido a su capacidad para proporcionar un entorno de desarrollo consistente y portátil.</p> <p>Docker permite empaquetar la aplicación y todas sus dependencias en contenedores, lo que simplifica el proceso de implementación y garantiza que la aplicación se ejecute de manera uniforme en cualquier entorno.</p> <p>En resumen, <strong>Docker</strong> proporciona una solución eficiente y escalable para el despliegue de adoptaunpeludo.com, garantizando su disponibilidad y rendimiento óptimo en cualquier entorno.</p>',
  },
  {
    img: '/logoTech/githubActions.svg',
    title: 'Github Actions',
    description: `
<p>Se decidió utilizar <strong>GitHub Actions</strong> para la implementación continua y la entrega continua (CI/CD) en adoptaunpeludo.com debido a su integración directa con el repositorio de GitHub y su facilidad de configuración. </p>
<p><strong>GitHub Actions</strong> permite automatizar el proceso de construcción, prueba y despliegue de la aplicación cada vez que se realiza un cambio en el código fuente. Esto garantiza una entrega rápida y confiable de nuevas funcionalidades y correcciones de errores a los usuarios finales.</p>
<p>Además, la capacidad de definir flujos de trabajo personalizados en archivos YAML proporciona flexibilidad para adaptarse a los requisitos específicos del proyecto.</p>
<p>En resumen, <strong>GitHub Actions</strong> facilita la implementación continua y la entrega continua en adoptaunpeludo.com, mejorando la eficiencia y la calidad del proceso de desarrollo de software.</p>
`,
  },
  {
    img: '/logoTech/nginx.svg',
    title: 'Nginx',
    description: `
<p>Se eligió <strong>NGINX</strong> como un proxy inverso en adoptaunpeludo.com para servir todos los servicios del backend y el frontend debido a su eficiencia, versatilidad y capacidad para manejar grandes volúmenes de tráfico.</p>
<p><strong>NGINX</strong> actúa como un punto de entrada único para la aplicación, redirigiendo las solicitudes entrantes a los diferentes servicios del backend según sea necesario. Esto simplifica la arquitectura de la aplicación y mejora la seguridad al proporcionar una capa adicional de protección contra ataques malintencionados.</p>
<p>Además, <strong>NGINX</strong> se puede configurar fácilmente para servir archivos estáticos del frontend, lo que mejora el rendimiento y la velocidad de carga de la aplicación para los usuarios finales.</p>
<p>En resumen, <strong>NGINX</strong> sirve como un componente crucial en la infraestructura de adoptaunpeludo.com, garantizando un enrutamiento eficiente de las solicitudes y una experiencia de usuario óptima.</p>
`,
  },
];

export const technologiesBackend = [
  {
    img: '/logoTech/nodejs.svg',
    title: 'Node.js',
    description: `
<p><strong>Node.js</strong> fue elegido para el backend de adoptaunpeludo.com debido a su eficiencia en el manejo de solicitudes concurrentes y su capacidad para ofrecer una experiencia de usuario altamente receptiva.</p>
<p>Además, la unificación de JavaScript en el frontend y el backend simplifica el desarrollo y asegura una mayor coherencia en el código.</p>
<p>La amplia comunidad y el rico ecosistema de herramientas de <strong>Node.js</strong> proporcionan recursos adicionales para acelerar el desarrollo y mejorar la seguridad de la aplicación.</p>
`,
  },
  {
    img: '/logoTech/express.svg',
    title: 'Express.js',
    description: `
<p><strong>Express</strong> fue seleccionado como el marco de desarrollo para el backend de adoptaunpeludo.com debido a su simplicidad, flexibilidad y robustez.</p><p> Su estructura minimalista permite construir rápidamente aplicaciones web escalables, mientras que su amplia gama de middleware facilita la implementación de funcionalidades avanzadas, como enrutamiento, manejo de solicitudes y respuestas, y autenticación.</p>
<p>Además, la gran comunidad y la documentación extensa de <strong>Express</strong> brindan recursos adicionales para el desarrollo eficiente y la resolución de problemas.</p>
`,
  },
  {
    img: '/logoTech/prisma.svg',
    title: 'Prisma',
    description: `
<p><strong>Prisma</strong> fue la elección ideal para el ORM en adoptaunpeludo.com debido a su enfoque moderno y su potente conjunto de características. </p>
<p>Su capacidad para generar consultas <strong>SQL</strong> seguras y optimizadas automáticamente simplifica el acceso a la base de datos, mientras que su integración sin esfuerzo con bases de datos relacionales como <strong>PostgreSQL</strong> proporciona una capa de abstracción efectiva para el manejo de datos.</p>
<p>Además, la capacidad de <strong>Prisma</strong> para definir modelos de datos de manera declarativa agiliza el desarrollo y garantiza la coherencia en la estructura de la base de datos.</p>
`,
  },
  {
    img: '/logoTech/rabbitmq.svg',
    title: 'RabbitMQ',
    description: `
<p><strong>RabbitMQ</strong> fue la opción principal para la gestión de mensajes en adoptaunpeludo.com debido a su robustez y flexibilidad en el manejo de colas de mensajes.</p><p> Su arquitectura distribuida y su capacidad para soportar múltiples protocolos de mensajería permiten una comunicación eficiente y confiable entre los microservicios de la aplicación.</p>
<p>Además, su escalabilidad y alta disponibilidad garantizan un rendimiento óptimo incluso en entornos de alto tráfico. En resumen, <strong>RabbitMQ</strong> proporciona una solución confiable y escalable para la gestión de mensajes en tiempo real en adoptaunpeludo.com.</p>
`,
  },
  {
    img: '/logoTech/postgress.svg',
    title: 'PostgreSQL',
    description: `
<p><strong>PostgreSQL</strong> fue la base de datos elegida para adoptaunpeludo.com debido a su robustez, escalabilidad y amplio conjunto de características.</p><p> Su soporte para SQL avanzado y sus capacidades de transacciones ACID garantizan la integridad de los datos y la consistencia en entornos de producción exigentes.</p>
<p>Además, su arquitectura extensible y su activa comunidad de desarrollo ofrecen una amplia gama de herramientas y extensiones para adaptarse a las necesidades específicas de la aplicación.</p><p> En resumen, <strong>PostgreSQL</strong> proporciona una sólida base de datos relacional para el almacenamiento y la gestión eficiente de datos en adoptaunpeludo.com.</p>`,
  },
  {
    img: '/logoTech/supabase.svg',
    title: 'Supabase',
    description: `
<p><strong>Supabase</strong> fue elegido para la búsqueda vectorial en adoptaunpeludo.com, permitiendo la implementación de un sistema de asistente con IA para responder preguntas sobre documentos.</p><p> Su capacidad para indexar y buscar datos mediante características vectoriales como la similitud del coseno posibilitó respuestas precisas y eficientes.</p>
<p>Integrado con un sistema de IA, los usuarios pueden realizar consultas en lenguaje natural y recibir respuestas relevantes al instante, mejorando la experiencia del usuario y promoviendo la adopción responsable de mascotas.</p>`,
  },
  {
    img: '/logoTech/mongodb.svg',
    title: 'MongoDB',
    description: `
<p><strong>MongoDB</strong> fue seleccionado para almacenar logs de errores y el historial de chats en adoptaunpeludo.com debido a su flexibilidad y escalabilidad.</p>
<p> Su modelo de documentos JSON se adapta bien a datos variables, permitiendo un acceso rápido a la información. </p>
<p>Esto facilita la depuración de errores y el análisis de datos para mejorar la experiencia del usuario.</p>
<p>En resumen, <strong>MongoDB</strong> proporciona una solución robusta para el almacenamiento de logs y chats en la aplicación.</p>
`,
  },
  {
    img: '/logoTech/chatgpt.svg',
    title: 'OpenAI API',
    description: `
<p>La API de <strong>OpenAPI</strong> fue fundamental para potenciar el asistente de adoptaunpeludo.com, permitiendo una interacción más inteligente y contextual con los usuarios.</p>
<p> Al integrar la API de <strong>OpenAPI</strong>, el asistente puede comprender y generar respuestas en lenguaje natural, lo que mejora la experiencia del usuario al proporcionar respuestas más informativas y relevantes.</p>
<p>Además, la API de <strong>OpenAPI</strong> permite al asistente aprender y mejorar con el tiempo, adaptándose a las necesidades cambiantes de los usuarios y brindando un servicio más personalizado. </p>
<p>En resumen, la API de <strong>OpenAPI</strong> potencia el asistente de adoptaunpeludo.com, mejorando la interacción con los usuarios y brindando respuestas más inteligentes y útiles.</p>
`,
  },
  {
    img: '/logoTech/langchain.svg',
    title: 'LangChain',
    description: `
<p><strong>LangChain</strong> fue seleccionado para el desarrollo del asistente en adoptaunpeludo.com debido a su capacidad para crear modelos de lenguaje generativos avanzados utilizando LLMS (Large Language Models). </p>
<p>Al integrar <strong>LangChain</strong> con la API de OpenAI, el asistente puede aprovechar la potencia de los modelos de lenguaje de vanguardia para comprender y generar respuestas en lenguaje natural de manera más precisa y contextualizada.</p>
<p>Esto permite una interacción más fluida y natural con los usuarios, mejorando significativamente la experiencia del usuario al proporcionar respuestas más informativas y relevantes. </p>
<p>En resumen, la combinación de <strong>LangChain</strong> y la API de OpenAI potencia el asistente de adoptaunpeludo.com, permitiendo una interacción más inteligente y personalizada con los usuarios.</p>
`,
  },
  {
    img: '/logoTech/Typescript.png',
    title: 'Typescript',
    description: `
<p><strong>TypeScript</strong> fue la elección principal para el desarrollo del backend de adoptaunpeludo.com debido a su capacidad para agregar tipos estáticos a JavaScript, lo que proporciona una mayor seguridad y robustez al código. </p>
<p>Al utilizar <strong>TypeScript</strong> en el backend, se reducen los errores comunes durante el desarrollo y se mejora la mantenibilidad del código a medida que el proyecto crece.</p>
<p>Además, <strong>TypeScript</strong> ofrece una integración perfecta con las herramientas y bibliotecas más utilizadas en el ecosistema de JavaScript, lo que facilita la creación de un backend moderno y escalable. </p>
<p>En resumen, <strong>TypeScript</strong> mejora la calidad y la eficiencia del desarrollo en el backend de adoptaunpeludo.com al agregar tipos estáticos y mejorar la experiencia de desarrollo.</p>
`,
  },
  {
    img: '/logoTech/WebSockets.svg',
    title: 'Websockets',
    description: `
<p>El servidor de <strong>WebSockets</strong> en adoptaunpeludo.com es fundamental para proporcionar notificaciones en tiempo real, funcionalidad de chat y actualización de datos en tiempo real. </p>
<p>Esta tecnología permite una comunicación bidireccional entre el servidor y el cliente, lo que garantiza una experiencia de usuario fluida y dinámica.</p>
<p>Con el servidor de <strong>WebSockets</strong>, los usuarios reciben notificaciones instantáneas sobre eventos importantes, pueden participar en chats en tiempo real con otros usuarios, y ven cambios en los datos de manera automática y sin necesidad de recargar la página. </p>
<p>En resumen, el servidor de <strong>WebSockets</strong> en adoptaunpeludo.com mejora la interactividad y la capacidad de respuesta de la aplicación, brindando una experiencia de usuario más inmersiva y satisfactoria.</p>
`,
  },
];

export const technologiesFrontend = [
  {
    img: '/logoTech/axios.svg',
    title: 'Axios',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },

  {
    img: '/logoTech/react-query.svg',
    title: 'React Query',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },
  {
    img: '/logoTech/react.png',
    title: 'React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <p> Pellentesque pharetra dui ac ante viverra vestibulum. </p><br><p>Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.</p>',
  },

  {
    img: '/logoTech/NextUI.svg',
    title: 'NextUI',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },
  {
    img: '/logoTech/tailwind.svg',
    title: 'Tailwind',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },

  {
    img: '/logoTech/vitejs.svg',
    title: 'Vitejs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },
  {
    img: '/logoTech/zod.svg',
    title: 'Zod',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
  },
];
