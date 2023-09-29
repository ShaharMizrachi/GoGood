export interface ContactUsProps {
  [key: string]: any;
}
export interface IContactForm
  extends Record<keyof typeof IContactFormInitial, IContactFormItem> {}

export interface IContactFormItem {
  value: string;
  error: string;
}

export const IContactFormInitial = {
  fullName: {value: '', error: ''},
  email: {value: '', error: ''},
  phone: {value: '', error: ''},
  message: {value: '', error: ''},
} as const;

export type FormRgx = {
  fullName: RegExp;
  email: RegExp;
  phone: RegExp;
  message: RegExp;
};
export const formHasError = (form: IContactForm): boolean => {
  for (const key of Object.keys(form)) {
    const field = form[key as keyof IContactForm];
    if (field.error) {
      return true;
    }
  }
  return false;
};
export const formRgx: FormRgx = {
  fullName: /^[a-zA-Z\s]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  phone: /^05\d{8}$/,
  message: /^(?!\s+$).+/ ,
} as const;
export const errorMessage: Record<keyof typeof IContactFormInitial, string> = {
  fullName: 'שם לא תקין',
  email: 'אימייל לא תקין',
  phone: 'טלפון לא תקין',
  message: 'ההודעה לא תקינה',
} as const;
