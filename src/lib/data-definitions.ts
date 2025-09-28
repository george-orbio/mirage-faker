import { faker } from '@faker-js/faker';
export type DataCategory = 'person' | 'address' | 'internet';
export interface FieldDefinition {
  id: string;
  label: string;
  generator: () => any;
}
export interface CategoryDefinition {
  id: DataCategory;
  label: string;
  fields: FieldDefinition[];
}
export const DATA_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 'person',
    label: 'Person',
    fields: [
      { id: 'firstName', label: 'First Name', generator: faker.person.firstName },
      { id: 'lastName', label: 'Last Name', generator: faker.person.lastName },
      { id: 'fullName', label: 'Full Name', generator: faker.person.fullName },
      { id: 'gender', label: 'Gender', generator: () => faker.helpers.arrayElement(['Male', 'Female']) },
    ],
  },
  {
    id: 'address',
    label: 'Address',
    fields: [
      { id: 'streetAddress', label: 'Street Address', generator: faker.location.streetAddress },
      { id: 'city', label: 'City', generator: faker.location.city },
      { id: 'state', label: 'State', generator: faker.location.state },
      { id: 'zipCode', label: 'Zip Code', generator: faker.location.zipCode },
      { id: 'country', label: 'Country', generator: faker.location.country },
      { id: 'latitude', label: 'Latitude', generator: faker.location.latitude },
      { id: 'longitude', label: 'Longitude', generator: faker.location.longitude },
    ],
  },
  {
    id: 'internet',
    label: 'Internet',
    fields: [
      { id: 'email', label: 'Email', generator: faker.internet.email },
      { id: 'userName', label: 'Username', generator: faker.internet.userName },
      { id: 'password', label: 'Password', generator: faker.internet.password },
    ],
  },
];