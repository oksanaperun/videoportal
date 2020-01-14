import { User } from '../../entities/user';

export interface AuthState {
  user: User;
  error: string;
}
