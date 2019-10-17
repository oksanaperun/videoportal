import { Course } from './course';

const course1 = new Course({
  id: 'id_1',
  title: 'Course 1',
  creationDate: 1570850553514,
  duration: 135,
  description: 'Starting with basics',
  authors: ['Jordan', 'Mike']
});

const course2 = new Course({
  id: 'id_2',
  title: 'Course 2',
  creationDate: 1571050553514,
  duration: 50,
  description: 'JavaScript frameworks overview',
  authors: ['Mike']
});

export const courses = [course1, course2];
