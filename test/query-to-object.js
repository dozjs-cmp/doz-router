import queryToObject from '../src/query-to-object'
import be from 'bejs'

describe('queryToObject', function () {

    it('should be ok with "meta=ciao"', function () {
        const result = queryToObject('meta=ciao');
        be.err.object(result);
        be.err.equal(result.meta, 'ciao');
    });

    it('should be ok with "anything"', function () {
        const result = queryToObject('anything');
        be.err.object(result);
        be.err.undefined(result.meta);
    });

    it('should be ok with "meta=ciao%3D"', function () {
        const result = queryToObject('meta=ciao%3D');
        be.err.object(result);
        be.err.equal(result.meta, 'ciao=');
    });

});
