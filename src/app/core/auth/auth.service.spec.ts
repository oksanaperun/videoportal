import { AuthService } from './auth.service';

describe('AuthService', () => {
  let sut: AuthService;

  beforeEach(() => {
    sut = new AuthService();
  });

  it('should return true when user is defined', () => {
    spyOn(localStorage, 'getItem')
      .and.returnValue('some_user');

    expect(sut.isAuthenticated).toBe(true);
  });

  it('should return false when user is NOT defined', () => {
    spyOn(localStorage, 'getItem')
      .and.returnValue('');

    expect(sut.isAuthenticated).toBe(false);
  });

  it('should return user info', () => {
    const userLogin = 'some_user';

    spyOn(localStorage, 'getItem')
      .and.returnValue(userLogin);

    expect(sut.getUserInfo()).toBe(userLogin);
  });

  it('should store user info on login', () => {
    const userLogin = 'some_user';
    const setItemSpy = spyOn(localStorage, 'setItem');

    sut.login(userLogin);

    expect(setItemSpy).toHaveBeenCalledWith('user', userLogin);
  });

  it('should clear user info on logout', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');

    sut.logout();

    expect(removeItemSpy).toHaveBeenCalledWith('user');
  });
});
