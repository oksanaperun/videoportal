import { FilterByTitlePipe } from './filter-by-title.pipe';

describe('FilterByTitlePipe', () => {
  let pipe: FilterByTitlePipe;
  let item1: any;
  let item2: any;
  let item3: any;

  beforeEach(() => {
    item1 = { title: 'Test 1 search' };
    item2 = { title: 'Test 2 for Searchtext' };
    item3 = { title: 'Test 3 foR search' };

    pipe = new FilterByTitlePipe();
  });

  it('should return all items when search text is empty', () => {
    const filteredItems = pipe.transform([item3, item1, item2], '');

    expect(filteredItems).toEqual([item3, item1, item2]);
  });

  it('should return filtered items when search text is NOT empty', () => {
    const filteredItems = pipe.transform([item3, item1, item2], 'for SEARCH');

    expect(filteredItems).toEqual([item3, item2]);
  });
});
