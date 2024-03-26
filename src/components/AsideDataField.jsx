export function AsideDataField({ fieldName, fieldValue }) {
  return (
    <div className="flex justify-between border-solid border-b-1 border-b-primary mx-2 pt-2 pb-1 font-poppins">
      <span>{fieldName}</span>
      <span className="capitalize">{fieldValue}</span>
    </div>
  );
}
