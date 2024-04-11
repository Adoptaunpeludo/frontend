import { statusColorMap } from '../utils/enumData';

export function AsideDataField({ fieldName, fieldValue }) {
  return (
    <div
      className={`flex  ${
        fieldName === 'Estado:'
          ? 'justify-end'
          : 'justify-between border-solid border-b-1 border-b-primary'
      } mx-2 pt-2 pb-1 font-poppins items-center`}
    >
      <span className={` ${fieldName === 'Estado:' ? 'hidden' : ''}`}>
        {fieldName}
      </span>
      <span
        className={`${fieldName !== 'Email: ' ? 'capitalize' : ''} ${
          fieldName === 'Estado:'
            ? 'bg-' + statusColorMap[fieldValue] + ' px-2 rounded-md py-2'
            : ''
        }
        ${fieldValue === 'adoptado' ? 'text-white' : ''}
        `}
      >
        {fieldValue}
      </span>
    </div>
  );
}
