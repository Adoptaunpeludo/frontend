import { Input, Select, Spacer } from '@nextui-org/react';

export function FilterBar() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-2">
      <Input clearable bordered labelPlaceholder="Nombre" className="flex-1" />
      <Spacer x={0.5} />
      <Select placeholder="Tamaño" className="flex-1">
        {/* Opciones del select */}
      </Select>
      <Spacer x={0.5} />
      <Select placeholder="Sexo" className="flex-1">
        {/* Opciones del select */}
      </Select>
      <Spacer x={0.5} />
      <Select placeholder="Edad" className="flex-1">
        {/* Opciones del select */}
      </Select>
      <Spacer x={0.5} />
      <Select placeholder="Provincia" className="flex-1">
        {/* Opciones del select */}
      </Select>
    </div>
  );
}