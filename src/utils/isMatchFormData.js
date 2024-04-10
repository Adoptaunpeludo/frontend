export const isMatchFormData = (originalData, newData) => {
  const commonKeys = Object.keys(originalData).filter((key) =>
    Object.prototype.hasOwnProperty.call(newData, key)
  );
  for (const key of commonKeys) {
    if (String(originalData[key]) !== String(newData[key])) {
      return false;
    }
  }
  return true;
};
