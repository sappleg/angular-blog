var table = {
    7: {parent_id: 2, id: 7, children: {}},
    10: {parent_id: 3, id: 10, children: {}},
    1: {parent_id: 0, id: 1, children: {}},
    4: {parent_id: 1, id: 4, children: {}},
    5: {parent_id: 1, id: 5, children: {}},
    6: {parent_id: 1, id: 6, children: {}},
    2: {parent_id: 0, id: 2, children: {}},
    8: {parent_id: 7, id: 8, children: {}},
    9: {parent_id: 8, id: 9, children: {}},
    3: {parent_id: 0, id: 3, children: {}}
};

var root = {parent_id: null, id: 0, children: {}};
var node_list = {0: root};

_.each(table, function(value, key) {
    node_list[value.id] = value;
    node_list[value.parent_id].children[key] = node_list[value.id];
});
