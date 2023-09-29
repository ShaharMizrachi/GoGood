import {GetAvailablePostByprofessionalInter} from './../../Interfaces';
export interface ContactModalProps {
  [key: string]: any;
  item: Partial<GetAvailablePostByprofessionalInter>;
}
export interface IDetailes {
  id: number | undefined;
  phone: string;
  fullName: string;
  imgUrl: string;
}
export const detailesInitial = {
  id: undefined,
  phone: '',
  fullName: '',
  imgUrl: '',
};
