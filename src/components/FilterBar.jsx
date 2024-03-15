import { Button, Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { ageRanges, cities, genders, sizes } from './data/items';

export function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { params } = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let hasSelected = false;

    for (const [key, value] of formData.entries()) {
      if (value) {
        hasSelected = true;
        searchParams.set(key, value);
      } else {
        searchParams.delete(key); // Eliminar el parámetro si el campo está vacío
      }
    }

    if (!hasSelected) {
      // Si ningún campo está seleccionado, limpiar todos los parámetros de búsqueda
      searchParams
        .toString()
        .split('&')
        .forEach((param) => {
          const [key] = param.split('=');
          searchParams.delete(key);
        });
    }

    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <form
      className="bg-gray-100 p-4 rounded-lg flex items-center space-x-2"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Input
        clearable
        bordered
        className="flex-1"
        aria-label="Nombre"
        label="Nombre"
        name="name"
        defaultValue={params?.name || ''}
      />
      <Spacer x={0.5} />
      <Select
        label="Tamaño"
        aria-label="Filtrar por tamaño"
        className="flex-1 capitalize"
        name="size"
        defaultSelectedKeys={params?.size ? [params.size] : []}
      >
        {sizes.map((size) => (
          <SelectItem
            key={size.value}
            value={size.value}
            className="capitalize"
          >
            {size.name}
          </SelectItem>
        ))}
      </Select>
      <Spacer x={0.5} />
      <Select
        label="Género"
        className="flex-1 capitalize"
        name="gender"
        defaultSelectedKeys={params?.gender ? [params.gender] : []}
      >
        {genders.map((gender) => (
          <SelectItem
            key={gender.value}
            value={gender.value}
            className="capitalize"
          >
            {gender.name}
          </SelectItem>
        ))}
      </Select>
      <Spacer x={0.5} />
      <Select
        label="Edad"
        className="flex-1 capitalize"
        name="age"
        defaultSelectedKeys={params?.age ? [params.age] : []}
      >
        {ageRanges.map((age) => (
          <SelectItem key={age.value} value={age.value} className="capitalize">
            {age.name}
          </SelectItem>
        ))}
      </Select>
      <Spacer x={0.5} />
      <Select
        label="Provincia"
        className="flex-1 capitalize"
        name="city"
        defaultSelectedKeys={params?.city ? [params.city] : []}
      >
        {cities.map((city) => (
          <SelectItem
            key={city.label}
            value={city.label}
            className="capitalize"
          >
            {city.label}
          </SelectItem>
        ))}
      </Select>
      <Button type="submit">Buscar</Button>
      <Button type="reset">Reset</Button>
    </form>
  );
}
