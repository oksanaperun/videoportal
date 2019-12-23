export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
  ) { }

  getUserName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
