export interface IUser {
  first_name: string;
  gender: string;
  date_of_birth: string;
  phone: string | number;
  street: string;
  state: string;
  country: string;
  longitude?: number;
  email: string;
  id: number;
  last_name: string;
  job?: string;
  city?: string;
  zipcode?: string | number;
  latitude?: number;
}
