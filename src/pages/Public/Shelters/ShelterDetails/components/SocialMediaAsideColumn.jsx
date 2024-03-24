import { Link } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconLink,
} from '@tabler/icons-react';

const socialItems = (item) => {
  switch (item.name) {
    case 'facebook':
      return (
        <div className="flex align-middle gap-2">
          <IconBrandFacebook className="size-8 stroke-black" />
          <Link
            href={`https://www.facebook.com/${item.url}`}
            isExternal
            className="text-tertiary"
          >
            {item.url}
          </Link>
        </div>
      );

    case 'xtweet':
      return (
        <div className="flex align-middle gap-2">
          <IconBrandX className="size-8 stroke-black" />
          <Link
            href={`https://twitter.com/${item.url}`}
            isExternal
            className="text-tertiary"
          >
            {item.url}
          </Link>
        </div>
      );
    case 'instagram':
      return (
        <div className="flex align-middle gap-2">
          <IconBrandInstagram className="size-8 stroke-black" />
          <Link
            href={`https://www.instagram.com/${item.url}`}
            isExternal
            className="text-tertiary"
          >
            {item.url}
          </Link>
        </div>
      );

    default:
      return (
        <div className="flex align-middle gap-2">
          <IconLink className="size-8 stroke-black" />
          <Link
            href={`http://www.${item.url}`}
            isExternal
            className="text-tertiary"
          >
            {item.url}
          </Link>
        </div>
      );
  }
};
export const SocialMediaAsideColumn = ({ socialMedia }) => {
  return (
    <section>
      <ul className="mx-4 ">
        {socialMedia.map((item, index) => (
          <li className="py-2" key={index}>
            {socialItems(item)}
          </li>
        ))}
      </ul>
    </section>
  );
};
