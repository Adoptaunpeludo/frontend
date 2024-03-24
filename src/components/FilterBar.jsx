import { Button, Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
// import { PagePagination } from './Pagination';
import {
  ageRanges,
  animalSizeEnum,
  cities,
  genderEnum,
} from '../utils/enumData';
// import { PagePagination } from './Pagination';

export function FilterBar({ page }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { params } = useLoaderData();
  const [name, setName] = useState(params?.name ? params.name : '');
  const [gender, setGender] = useState(
    new Set(params?.gender ? [params.gender] : [])
  );
  const [age, setAge] = useState(new Set(params?.age ? [params.age] : []));
  const [size, setSize] = useState(new Set(params?.size ? [params.size] : []));
  const [city, setCity] = useState(new Set(params?.city ? [params.city] : []));

  const handleReset = () => {
    setName('');
    setGender(new Set([]));
    setAge(new Set([]));
    setSize(new Set([]));
    setCity(new Set([]));

    page !== 'shelter'
      ? navigate(`/animals/${page}`, { preventScrollReset: true })
      : navigate(`/shelters`, { preventScrollReset: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchParams.delete('page');

    const formData = new FormData(e.currentTarget);
    let hasSelected = false;

    for (const [key, value] of formData.entries()) {
      if (value) {
        hasSelected = true;
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }

    if (!hasSelected) {
      searchParams
        .toString()
        .split('&')
        .forEach((param) => {
          const [key] = param.split('=');
          searchParams.delete(key);
        });
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  return (
    <form
      className="bg-gray-100 p-4 rounded-lg flex items-center space-x-2"
      onSubmit={handleSubmit}
    >
      <Input
        clearable
        bordered
        className="flex-1"
        aria-label="Nombre"
        label="Nombre"
        value={name}
        onValueChange={setName}
        name={page !== 'shelter' ? 'name' : 'username'}
        defaultValue={params?.name || ''}
      />
      <Spacer x={0.5} />
      {page !== 'shelter' && (
        <Select
          label="Tamaño"
          aria-label="Filtrar por tamaño"
          className="flex-1 capitalize"
          name="size"
          selectedKeys={size}
          onSelectionChange={setSize}
          defaultSelectedKeys={params?.size ? [params.size] : []}
        >
          {animalSizeEnum.map((size) => (
            <SelectItem
              key={size.value}
              value={size.value}
              className="capitalize"
              textValue={size.label}
            >
              {size.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <Spacer x={0.5} />
      {page !== 'shelter' && (
        <Select
          label="Género"
          className="flex-1 capitalize"
          name="gender"
          selectedKeys={gender}
          onSelectionChange={setGender}
          defaultSelectedKeys={params?.gender ? [params.gender] : []}
        >
          {genderEnum.map((gender) => (
            <SelectItem
              key={gender.value}
              value={gender.value}
              className="capitalize"
              textValue={gender.label}
            >
              {gender.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <Spacer x={0.5} />
      {page !== 'shelter' && (
        <Select
          label="Edad"
          className="flex-1 capitalize"
          name="age"
          defaultSelectedKeys={params?.age ? [params.age] : []}
          selectedKeys={age}
          onSelectionChange={setAge}
        >
          {ageRanges.map((age) => (
            <SelectItem
              key={age.value}
              value={age.value}
              className="capitalize"
              textValue={age.label}
            >
              {age.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <Spacer x={0.5} />
      <Select
        label="Provincia"
        className="flex-1 capitalize"
        name="city"
        defaultSelectedKeys={params?.city ? [params.city] : []}
        selectedKeys={city}
        onSelectionChange={setCity}
      >
        {cities.map((city) => (
          <SelectItem
            key={city.value}
            value={city.value}
            className="capitalize"
            textValue={city.label}
          >
            {city.label}
          </SelectItem>
        ))}
      </Select>
      <Button type="submit" color="primary">
        Buscar
      </Button>
      <Button onPress={handleReset} color="primary" type="reset">
        Reset
      </Button>
      {/* TODO:Dont remove without final layout  */}
      {/* <PagePagination page={page} /> */}
    </form>
  );
}
