export const cities = [
  { label: 'A Coruña', value: 'A Coruña' },
  { label: 'Álava', value: 'Araba/Álava' },
  { label: 'Albacete', value: 'Albacete' },
  { label: 'Alicante', value: 'Alicante/Alacant' },
  { label: 'Almería', value: 'Almería' },
  { label: 'Asturias', value: 'Asturias' },
  { label: 'Ávila', value: 'Ávila' },
  { label: 'Badajoz', value: 'Badajoz' },
  { label: 'Barcelona', value: 'Barcelona' },
  { label: 'Burgos', value: 'Burgos' },
  { label: 'Cáceres', value: 'Cáceres' },
  { label: 'Cádiz', value: 'Cádiz' },
  { label: 'Cantabria', value: 'Cantabria' },
  { label: 'Castellón', value: 'Castellón/Castelló' },
  { label: 'Ciudad Real', value: 'Ciudad Real' },
  { label: 'Córdoba', value: 'Córdoba' },
  { label: 'Cuenca', value: 'Cuenca' },
  { label: 'Gerona', value: 'Gerona' },
  { label: 'Granada', value: 'Granada' },
  { label: 'Guadalajara', value: 'Guadalajara' },
  { label: 'Guipúzcoa', value: 'Guipúzcoa' },
  { label: 'Huelva', value: 'Huelva' },
  { label: 'Huesca', value: 'Huesca' },
  { label: 'Islas Baleares', value: 'Balears, Illes' },
  { label: 'Jaén', value: 'Jaén' },
  { label: 'La Rioja', value: 'La Rioja' },
  { label: 'Las Palmas', value: 'Palmas, Las' },
  { label: 'León', value: 'León' },
  { label: 'Lérida', value: 'Lérida' },
  { label: 'Lugo', value: 'Lugo' },
  { label: 'Madrid', value: 'Madrid' },
  { label: 'Málaga', value: 'Málaga' },
  { label: 'Murcia', value: 'Murcia' },
  { label: 'Navarra', value: 'Navarra' },
  { label: 'Orense', value: 'Orense' },
  { label: 'Palencia', value: 'Palencia' },
  { label: 'Pontevedra', value: 'Pontevedra' },
  { label: 'Salamanca', value: 'Salamanca' },
  { label: 'Santa Cruz de Tenerife', value: 'Santa Cruz de Tenerife' },
  { label: 'Segovia', value: 'Segovia' },
  { label: 'Sevilla', value: 'Sevilla' },
  { label: 'Soria', value: 'Soria' },
  { label: 'Tarragona', value: 'Tarragona' },
  { label: 'Teruel', value: 'Teruel' },
  { label: 'Toledo', value: 'Toledo' },
  { label: 'Valencia', value: 'Valencia/València' },
  { label: 'Valladolid', value: 'Valladolid' },
  { label: 'Vizcaya', value: 'Vizcaya' },
  { label: 'Zamora', value: 'Zamora' },
  { label: 'Zaragoza', value: 'Zaragoza' },
];

export const legalFormEnum = [
  { label: 'Asociación', value: 'association' },
  {
    label: 'Asociación de utilidad pública',
    value: 'public_utility_association',
  },
  { label: 'Fundación autonómica', value: 'autonomous_foundation' },
  { label: 'Fundación nacional', value: 'national_foundation' },
  { label: 'Otro', value: 'other' },
];

export const genderEnum = [
  { label: 'Macho', value: 'male' },
  {
    label: 'Hembra',
    value: 'female',
  },
];

export const adoptionPublishStatusEnum = [
  { label: 'Pendiente', value: 'pending' },
  {
    label: 'Rechazado',
    value: 'rejected',
  },
  {
    label: 'Publicado',
    value: 'published',
  },
];

export const statusPetEnum = [
  { label: 'Adoptado', value: 'adopted' },
  {
    label: 'En acogida',
    value: 'fostered',
  },
  {
    label: 'Reservado',
    value: 'reserved',
  },
  {
    label: 'Esperando un hogar',
    value: 'awaiting_home',
  },
];

export const animalSizeEnum = [
  { label: 'Pequeño', value: 'small' },
  {
    label: 'Mediano',
    value: 'medium',
  },
  { label: 'Grande', value: 'big' },
  { label: 'Muy Grande', value: 'very_big' },
];

export const facilitiesEnum = [
  { label: 'Casas de acogida', value: 'foster_homes' },
  {
    label: 'Instalaciones Municipales o públicas',
    value: 'municipal_or_public_facilities',
  },
  { label: 'Instalaciones arrendadas', value: 'leased_facilities' },
  { label: 'Residencias propias', value: 'owned_facilities' },

  { label: 'Residencias privadas (arrendadas)', value: 'private_residences' },
];

export const moltingEnum = [
  { label: 'Ligera', value: 'light' },
  {
    label: 'Moderada',
    value: 'moderate',
  },
  { label: 'Elevada', value: 'heavy' },
  { label: 'No suelta pelo', value: 'no_shedding' },
];

export const energyEnum = [
  { label: 'Baja', value: 'light' },
  {
    label: 'Moderada',
    value: 'moderate',
  },
  { label: 'Elevada', value: 'high' },
];

export const potentialEnum = [
  { label: 'Nada', value: 'none' },
  { label: 'Bajo', value: 'low' },
  {
    label: 'Moderado',
    value: 'moderate',
  },
  { label: 'Elevado', value: 'high' },
  { label: 'Excesivo', value: 'excessive' },
];

export const boolDataEnum = [
  { label: 'Si', value: true },
  {
    label: 'No',
    value: false,
  },
];

export const ageRanges = [
  {
    label: 'cachorro',
    value: 'puppy',
  },
  {
    label: 'adulto',
    value: 'adult',
  },
  {
    label: 'anciano',
    value: 'senior',
  },
];
