import { useState } from 'react';

export function useImageValidation() {
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const validateImage = (file, maxSize) => {
    if (!file.type.startsWith('image/')) {
      setFileError('Solo se admiten archivos de imagen');
    } else if (file.size > maxSize) {
      setFileError(
        `La imagen excede el tamaño de archivo permitido (${
          maxSize / 1024
        } Kbytes)`
      );
    } else {
      setFileError('');
      setSelectedFile(file);
    }
  };

  return {
    fileError,
    setFileError,
    selectedFile,
    setSelectedFile,
    validateImage,
  };
}
