import { OrderByCreationDatePipe } from './order-by-creation-date.pipe';

describe('OrderByCreationDatePipe', () => {
  let pipe: OrderByCreationDatePipe;
  let item1: any;
  let item2: any;
  let item3: any;

  let currentDate: Date;
  let tomorrowDate: Date;

  beforeEach(() => {
    currentDate = new Date();
    tomorrowDate = new Date();

    item1 = {
      id: 1,
      creationDate: currentDate.getTime()
    };
    item2 = {
      id: 2,
      creationDate: tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    };
    item3 = {
      id: 3,
      creationDate: currentDate.getTime()
    };

    pipe = new OrderByCreationDatePipe();
  });

  it('should return items in ascending order', () => {
    const orderedItems = pipe.transform([item1, item2, item3], 'ASC');

    expect(orderedItems).toEqual([item1, item3, item2]);
  });

  it('should return items in descending order', () => {
    const orderedItems = pipe.transform([item1, item2, item3], 'DESC');

    expect(orderedItems).toEqual([item2, item1, item3]);
  });
});
