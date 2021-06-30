const { log } = require('./utils');
const assert = require("assert");

// describe('log', function() {
//     it('prevents prototype pollution', function() {
//         const malicious = JSON.parse('{"__proto__":{"injected":0}}');
//         log(malicious, 1); 

//          code below is from pluralsight
//          merge({}, malicious); 

//          const o = {};

//          assert.StrictEqual(o.injected, undefined); 
//     })
// })