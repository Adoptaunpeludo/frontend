import { Button, Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
// import { PagePagination } from './Pagination';
import {
  buttonStyleConfig,
  inputStyleConfig,
  selectStyleConfig,
} from '../utils/configFormFields';
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
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    setName('');
    setGender(new Set([]));
    setAge(new Set([]));
    setSize(new Set([]));
    setCity(new Set([]));
  }, [page]);

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
    <>
      <div className="flex justify-center md:hidden m-2 ">
        <Button className="w-full font-bold text-lg" color="primary" onClick={toggleFilters}>
          { showFilters ? <p>Ocultar Filtros</p> : <p>Mostrar Filtros</p>}
        </Button>
      </div>
      <form
        className={`bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row items-center space-x-0 space-y-2 md:space-y-0 md:space-x-2 ${
          showFilters ? 'block' : 'hidden'
        } md:flex`}
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
          classNames={inputStyleConfig}
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
            classNames={selectStyleConfig}
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
            classNames={selectStyleConfig}
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
            classNames={selectStyleConfig}
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
          classNames={selectStyleConfig}
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

        <div className="flex justify-around w-full space-x-2 md:w-auto">
          <Button
            type="submit"
            color="primary"
            className={`${buttonStyleConfig} w-full md:w-auto`}
          >
            Buscar
          </Button>
          <Button
            onPress={handleReset}
            color="primary"
            type="reset"
            className={`${buttonStyleConfig} w-full md:w-auto`}
          >
            Reset
          </Button>
        </div>
        {/* TODO:Dont remove without final layout  */}
        {/* <PagePagination page={page} /> */}
      </form>
    </>
  );
}

// "sm:flex sm:justify-around flex justify-between"
