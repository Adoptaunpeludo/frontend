import { useRef, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { IconSend2 } from '@tabler/icons-react';

import { inputStyleConfig } from '../../../../utils/configFormFields';

import DeleteModal from './DeleteHistoryModal';

const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onDeleteMessages,
  isDisabled,
  page = '',
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSendMessage = (event) => {
    event.preventDefault();

    onSendMessage(message);

    setMessage('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center h-16 rounded-xl w-full px-4"
      encType="multipart/form-data"
    >
      <div className="flex-grow">
        <div className="relative w-full  rounded-md flex gap-1 ">
          {!page && <DeleteModal deleteMessages={onDeleteMessages} />}
          <Input
            ref={inputRef}
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300  "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            classNames={inputStyleConfig}
            isDisabled={isDisabled}
          />
          <div className="">
            <Button
              isDisabled={!message || isDisabled}
              className="bg-primary font-poppins "
              type="submit"
              endContent={<IconSend2 className="stroke-foreground" />}
            >
              <span className="mr-2 hidden sm:block text-foreground">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBox;
