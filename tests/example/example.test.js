import chai from 'chai';
import chai_spies from 'chai-spies';
import { expect } from 'chai';
import { example } from '../../src/example';

describe('Test Example', () => {

  function check(done, f) {
    try {
      f();
      done();
    } catch(e) {
      done(e);
    }
  }

  chai.use(chai_spies);

  it('to return undefined', () => {
    const result = example();
    expect(result).to.equal(undefined);
  });

});
