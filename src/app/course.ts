import { ICourse } from './models';

export class Course implements ICourse {
  id: string;
  title: string;
  creationDate: number;
  duration: number;
  description: string;
  authors: string[];

  constructor({ id, title, creationDate, duration, description, authors }: ICourse) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
    this.authors = [...authors];
  }
}
