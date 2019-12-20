import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUserName(): Observable<string> {
    if (this.authService.isAuthenticated) {
      const token = this.authService.getAuthToken();
      const payload = {
        token
      };

      return this.http.post<UserDto>('auth/userinfo', payload).pipe(
        map((userDto: UserDto) => this.transformUserResponse(userDto))
      );
    }
  }

  private transformUserResponse(userDto: UserDto): string {
    return `${userDto.name.first} ${userDto.name.last}`;
  }
}
