export interface ICourse {
  id: string;
  title: string;
  creationDate: number;
  duration: number;
  description: string;
  authors: string[];
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}
