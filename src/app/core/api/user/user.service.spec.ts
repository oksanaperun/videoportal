import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '../../services/auth.service';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  let injector: TestBed;
  let mockHttp: HttpTestingController;
  let mockAuthService;
  let token: string;
  let userDto: UserDto;

  beforeEach(() => {
    token = 'some_token';

    userDto = {
      name: {
        first: 'John',
        last: 'Lucas'
      }
    } as UserDto;

    mockAuthService = {
      getAuthToken: () => token,
      isAuthenticated: true
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    });

    injector = getTestBed();
    userService = injector.get(UserService);
    mockHttp = injector.get(HttpTestingController);
  });

  it('should return user name', () => {
    userService.getUser().subscribe(userName => {
      expect(userName).toBe('John Lucas');
    });

    const req = mockHttp.expectOne('auth/userinfo');
    expect(req.request.method).toBe('POST');
    req.flush(userDto);
  });
});
