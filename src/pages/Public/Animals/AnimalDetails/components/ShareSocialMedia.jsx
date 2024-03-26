import { Link } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
} from '@tabler/icons-react';
import { H2Title } from '../../../../../components';
export const ShareSocialMedia = ({ url }) => {
  return (
    <section id="share-rrss" className="flex items-center justify-start">
      <H2Title title="compárteme" className="text-secondary" />
      <Link
        isExternal
        isBlock
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=%C2%A1Dale%20un%20hogar%20y%20amor%20a%20un%20amigo%20peludo%C2%A1`}
        target="_blank"
        color="foreground"
      >
        <IconBrandLinkedin className="size-12" />
      </Link>
      <Link
        isExternal
        isBlock
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}
`}
        target="_blank"
        color="foreground"
      >
        <IconBrandFacebook className="size-12" />
      </Link>
      <Link
        isExternal
        isBlock
        href={`https://twitter.com/intent/tweet?text=%C2%A1Dale%20un%20hogar%20y%20amor%20a%20un%20amigo%20peludo%C2%A1&url=${url}`}
        target="_blank"
        color="foreground"
      >
        <IconBrandX className="size-12" />
      </Link>
    </section>
  );
};
