import { Button, Spinner } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { useParams } from 'react-router-dom';
import DeleteModal from '../delete-modal/DeleteHistoryModal';

const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onDeleteMessages,
}) => {
  const { selectFile, isLoading } = useDocumentsContext();
  const [message, setMessage] = useState('');
  const inputRef = useRef < HTMLInputElement > null;

  const params = useParams();

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (params && params.name) onSendMessage(message, params.name);

    setMessage('');
    inputRef.current?.focus();
    selectFile(null);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center h-16 rounded-xl w-full px-4"
      encType="multipart/form-data"
    >
      <div className="flex-grow">
        <div className="relative w-full bg-primary p-2 bg-opacity-25 rounded-md flex gap-1 shadow-xl">
          <DeleteModal bot={'assistant'} deleteMessages={onDeleteMessages} />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300 pl-4 h-10 "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <div className="">
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                className="bg-tertiary min-w-10 min-h-fit sm:w-20"
                type="submit"
              >
                <span className="mr-2 hidden sm:block text-white">Send</span>
                <i className=" fa-regular fa-paper-plane text-white"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBox;
