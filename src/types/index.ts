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

export interface ChatItemType {
  id: string;
  data: {
    chatContent: string;
    chatDate: number;
    chatTime: string;
    sendBy: string;
  };
}

export interface AccountSlice {
  loading: boolean;
  name: string;
}
