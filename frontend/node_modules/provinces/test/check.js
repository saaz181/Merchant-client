var test = require('tape');
var provinces = require('../');
var has = require('has');

test('all fields present', function (t) {
    t.plan(provinces.length * 2);
    provinces.forEach(function (p) {
        t.ok(has(p, 'name'));
        t.ok(has(p, 'country'));
    });
});

test('no duplicates', function (t) {
    var seen = {};
    t.plan(provinces.length);
    provinces.forEach(function (p) {
        if (!seen[p.country]) seen[p.country] = {};
        if (p.country === 'BO') {
            t.ok(true, 'BO exempt from unique province names');
        }
        else t.ok(
            !has(seen[p.country], p.name),
            'duplicate ' + p.country + ': ' + p.name
        );
        seen[p.country][p.name] = true;
    });
});
