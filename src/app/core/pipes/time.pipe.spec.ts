import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let pipe: TimePipe;

  beforeEach(() => {
    pipe = new TimePipe();
  });

  it('should transform time to minutes only', () => {
    expect(pipe.transform(15)).toBe('15 min');
  });

  it('should transform time to hours only', () => {
    expect(pipe.transform(120)).toBeTruthy('2h');
  });

  it('should transform time to hours and minutes', () => {
    expect(pipe.transform(75)).toBeTruthy('1h 15 min');
  });
});
