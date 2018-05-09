/* tslint:disable */
import { Preference } from './preference';
export interface Profile {
  id?: string;
  owner?: string;
  name?: string;
  version?: number;
  preferences?: Array<Preference>;
}
