import queryToObject from '../src/query-to-object'
import be from 'bejs'

describe('queryToObject', function () {

    it('should be ok with "meta=ciao"', function () {
        const result = queryToObject('meta=ciao');
        be.err.object(result);
        be.err.equal(result.meta, 'ciao');
    });

    it('should be ok with empty', function () {
        const result = queryToObject('');
        be.err.object(result);
        be.err.equal(Object.keys(result).length, 0);
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

    it('should be ok with "meta=ci=ao=', function () {
        const result = queryToObject('meta=ci=ao=&other=4');
        be.err.object(result);
        be.err.equal(result.meta, 'ci=ao=');
        be.err.equal(result.other, '4');
    });

});
