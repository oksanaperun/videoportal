import { ICourse } from './core/course';

const course1: ICourse = {
  id: 'id_1',
  title: 'Video Course 1. Name tag',
  creationDate: 1570850553514,
  duration: 135,
  description: `Learn about where you can find course descriptions, what information they include,
    how they work, and details about various components of a course description. Course descriptions
    report information about a university or college's classes. They're published both in course catalogs
    that outline degree requirements and in course schedules that contain descriptions for all courses
    offered during a particular semester.`,
  authors: ['Jordan', 'Mike']
};

const course2: ICourse = {
  id: 'id_2',
  title: 'Course 2',
  creationDate: 1571050553514,
  duration: 50,
  description: 'JavaScript frameworks overview',
  authors: ['Mike']
};

const course3: ICourse = {
  id: 'id_3',
  title: 'Course 3. Title',
  creationDate: 1532094906885,
  duration: 93,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`,
  authors: ['Jordan']
};

export const courses = [course1, course2, course3];
