'use strict';

/* global _:false */

var table = {
    7: {parentId: 2, id: 7, children: {}},
    10: {parentId: 3, id: 10, children: {}},
    1: {parentId: 0, id: 1, children: {}},
    4: {parentId: 1, id: 4, children: {}},
    5: {parentId: 1, id: 5, children: {}},
    6: {parentId: 1, id: 6, children: {}},
    2: {parentId: 0, id: 2, children: {}},
    8: {parentId: 7, id: 8, children: {}},
    9: {parentId: 8, id: 9, children: {}},
    3: {parentId: 0, id: 3, children: {}}
};

var root = {parentId: null, id: 0, children: {}};
var nodeList = {0: root};

_.each(table, function(value, key) {
    nodeList[value.id] = value;
    nodeList[value.parentId].children[key] = nodeList[value.id];
});