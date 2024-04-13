import { Image, Link } from '@nextui-org/react';
import { IconArrowRight } from '@tabler/icons-react';
import { H2Title } from '../../../../components';
const technologies = [
  {
    img: '/public/logoTech/aws.svg',
    title: 'AWS S3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/nodejs.svg',
    title: 'Node.js',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/express.svg',
    title: 'Express.js',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/prisma.svg',
    title: 'Prisma',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/rabbitmq.svg',
    title: 'RabbitMQ',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/docker.svg',
    title: 'Docker',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/postgress.svg',
    title: 'PostgreSQL',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/supabase.svg',
    title: 'Supabase',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/mongodb.svg',
    title: 'MongoDB',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/axios.svg',
    title: 'Axios',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/chatgpt.svg',
    title: 'ChatGPT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/react-query.svg',
    title: 'React Query',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/react.png',
    title: 'React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/Typescript.png',
    title: 'Typescript',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/WebSockets.svg',
    title: 'Websockets',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/figma.svg',
    title: 'Figma',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/NextUI.svg',
    title: 'NextUI',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/tailwind.svg',
    title: 'Tailwind',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/github.svg',
    title: 'GitHub',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/trello.svg',
    title: 'Trello',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/vitejs.svg',
    title: 'Vitejs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
  {
    img: '/public/logoTech/zod.svg',
    title: 'Zod',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
  },
];

export const Technologies = () => {
  return (
    <section className=" w-full  max-w-screen-xl py-10 flex flex-col justify-center mx-auto px-10">
      <header className="text-center font-lobster text-5xl  text-secondary pb-10">
        Las tecnologías
      </header>
      <main className="flex flex-wrap justify-center xl:justify-start max-w-screen-xl mx-auto">
        {technologies.map((technology, index) => {
          return (
            <article key={index} className="flex flex-col w-96 p-5">
              <div className="flex items-center gap-3 pb-5">
                <Image
                  src={technology.img}
                  width={'50px'}
                  alt={technology.title}
                />

                <H2Title title={technology.title} />
              </div>
              <div>
                <p className="text-pretty truncate h-20 leading-5 max-w-72">
                  {technology.description}
                </p>
              </div>
              <div className="">
                <Link
                  className="text-tertiary flex items-center gap-2 py-3"
                  href="#"
                >
                  Leer más
                  <IconArrowRight stroke={1} className="stroke-tertiary" />
                </Link>
              </div>
            </article>
          );
        })}
      </main>
    </section>
  );
};
export default Technologies;
