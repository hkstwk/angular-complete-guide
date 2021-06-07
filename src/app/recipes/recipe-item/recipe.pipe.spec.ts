import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('should reverse the string', () => {
    const reversePipe: ReversePipe = new ReversePipe();
    expect(reversePipe.transform('harm')).toEqual('mrah');
  });
});
