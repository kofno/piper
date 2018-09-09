import { expect } from 'chai';
import 'mocha';
import { pipe } from './index';

describe('piped functions', () => {
  it('should totally work', () => {
    const upper = (s: string) => s.toUpperCase();
    const split = (sep: string) => (s: string) => s.split(sep);
    const reverse = (ss: string[]) => ss.reverse();
    const join = (ss: string[]) => ss.join('');

    const doit = pipe(
      upper,
      split(''),
      reverse,
      join
    );

    expect(doit('food')).to.equal('DOOF');
  });
});
