export interface UserType {
  fullName: string;
  profession: string;
  email: string;
  uid: string;
  photo?: string;
  specialist?: string;
  university?: string;
  rcnumber?: string;
  hospitalAddress?: string;
  gender?: string;
  rate?: number;
}

export interface AccountSlice {
  loading: boolean;
  name: string;
}
