import { useEffect } from 'react';
import { BUCKET_URL } from '../config/config';

export const useMetadata = (data, slug, images) => {
  useEffect(() => {
    // Title of page
    document.title = `Adopta un peludo - ${slug}`;
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.content = `Conoce a nuestro peludo, ${data.name} y ayúdanos a encontrarle un hogar`;
    document.getElementsByTagName('head')[0].appendChild(metaDescription);
    // add meta tag 'og:image'
    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    metaOgImage.content = `${
      images[0] !== undefined ? `${BUCKET_URL}/${images[0]}` : ''
    }`;
    document.getElementsByTagName('head')[0].appendChild(metaOgImage);
    // add meta tag 'twitter:image'
    const metaTwitterImage = document.createElement('meta');
    metaTwitterImage.setAttribute('property', 'twitter:image');
    metaTwitterImage.content = `${
      images[0] !== undefined ? `${BUCKET_URL}/${images[0]}` : ''
    }`;
    document.getElementsByTagName('head')[0].appendChild(metaTwitterImage);

    // add meta tag og:Title
    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    metaOgTitle.content = `Adopta un peludo - ${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaOgTitle);
    // add meta tag twitter:Title
    const metaTwitterTitle = document.createElement('meta');
    metaTwitterTitle.setAttribute('property', 'twitter:title');
    metaTwitterTitle.content = `Adopta un peludo - ${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaTwitterTitle);

    // add meta tag 'og:description'
    const metaOgDescription = document.createElement('meta');
    metaOgDescription.setAttribute('property', 'og:description');
    metaOgDescription.content = `Conoce a nuestro peludo, ${data.name} y ayúdanos a encontrarle un hogar`;
    document.getElementsByTagName('head')[0].appendChild(metaOgDescription);
    // add meta tag 'Twitter:description'
    const metaTwitterDescription = document.createElement('meta');
    metaTwitterDescription.setAttribute('property', 'twitter:description');
    metaTwitterDescription.content = `Conoce a nuestro peludo, ${data.name} y ayúdanos a encontrarle un hogar`;
    document
      .getElementsByTagName('head')[0]
      .appendChild(metaTwitterDescription);

    // add meta tag 'og:url'
    const metaOgUrl = document.createElement('meta');
    metaOgUrl.setAttribute('property', 'og:url');
    metaOgUrl.content = `https://www.adoptaunpeludo.com/animals/${data.type}s/${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaOgUrl);

    // add meta tag 'twitter:url'
    const metaTwitterUrl = document.createElement('meta');
    metaTwitterUrl.setAttribute('property', 'twitter:url');
    metaTwitterUrl.content = `https://www.adoptaunpeludo.com/animals/${data.type}s/${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaTwitterUrl);

    // add meta tag 'og:type'
    const metaOgType = document.createElement('meta');
    metaOgType.setAttribute('property', 'og:type');
    metaOgType.content = 'website';
    document.getElementsByTagName('head')[0].appendChild(metaOgType);
    // add meta tag 'Twitter:card'
    const metaTwitterCard = document.createElement('meta');
    metaTwitterCard.setAttribute('property', 'twitter:card');
    metaTwitterCard.content = `summary_large_image`;
    document.getElementsByTagName('head')[0].appendChild(metaTwitterCard);

    // Clean at unmount the component
    return () => {
      document.getElementsByTagName('head')[0].removeChild(metaOgTitle);
      document.getElementsByTagName('head')[0].removeChild(metaOgDescription);
      document.getElementsByTagName('head')[0].removeChild(metaOgImage);
      document.getElementsByTagName('head')[0].removeChild(metaOgUrl);
      document.getElementsByTagName('head')[0].removeChild(metaOgType);
    };
  }, [data, images, slug]);
};
