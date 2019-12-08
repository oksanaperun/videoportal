import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, USER_ENDPOINT } from '../../auth/auth.service';
import { UserDto } from './user-dto';

@Injectable({
  providedIn: 'root'
})
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

      return this.http
        .post(USER_ENDPOINT, payload)
        .pipe(map(this.transformUserResponse));
    }
  }

  private transformUserResponse(userDto: UserDto): string {
    return `${userDto.name.first} ${userDto.name.last}`;
  }
}
