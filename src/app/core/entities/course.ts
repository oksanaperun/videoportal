export class Course {
  constructor(
    public id: string,
    public title: string,
    public creationDate: number,
    public duration: number,
    public description: string,
    public authors: string[],
    public topRated?: boolean
  ) { }
}
