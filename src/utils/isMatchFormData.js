export const isMatchFormData = (originalData, newData) => {
  const commonKeys = Object.keys(originalData).filter((key) =>
    Object.prototype.hasOwnProperty.call(newData, key)
  );
  for (const key of commonKeys) {
    const originalValue = originalData[key];
    const newValue = newData[key];

    if (Array.isArray(originalValue) && Array.isArray(newValue)) {
      if (originalValue.length !== newValue.length) return false;

      for (let i = 0; i < originalValue.length; i++) {
        if (originalValue[i] !== newValue[i]) return false;
      }
    } else {
      if (String(originalValue) !== String(newValue)) {
        return false;
      }
    }
  }
  return true;
};
