import { Avatar } from '@nextui-org/react';
import Markdown from 'react-markdown';

import TypingLoader from './loader/TypingLoader';

const GptMessage = ({ text }) => {
  return (
    <div className="col-start-1 sm:col-end-9 col-end-12 p-3 rounded-lg ">
      <div className="flex flex-row items-start">
        <Avatar
          showFallback
          src="/avatar/asistente.webp"
          className="min-w-[40px]"
          fallback={
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0 text-white">
              <i className="fa fa-robot"></i>
            </div>
          }
        />
        {text === '' ? (
          <TypingLoader />
        ) : (
          <div className="relative ml-3 text-medium bg-primary bg-opacity-25 pt-3 pb-2 px-4 shadow-xl rounded-xl">
            <Markdown className="text-pretty leading-relaxed">{text}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default GptMessage;
