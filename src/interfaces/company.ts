import { ILocation } from "./location";

export interface ICompany {
  name: string;
  location: ILocation;
  companySize: number;
  email: string;
  about: string;
  website: string;
  userID: any;
}
