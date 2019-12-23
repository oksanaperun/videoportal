import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserDto } from './dtos/user.dto';
import { User } from '../../entities/user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUser(): Observable<User> {
    const token = this.authService.getAuthToken();

    return this.http.post<UserDto>('auth/userinfo', { token }).pipe(
      map((response: UserDto) => this.mapDtoToUser(response))
    );
  }

  private mapDtoToUser(dto: UserDto): User {
    return new User(
      dto.id.toString(),
      dto.name.first,
      dto.name.last,
    );
  }
}
