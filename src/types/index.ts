export interface UserType {
  fullName: string;
  profession: string;
  email: string;
  uid: string;
  photo?: string;
}

export interface AccountSlice {
  loading: boolean;
  name: string;
}
