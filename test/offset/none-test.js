var tape = require("tape"),
    shape = require("../../");

tape("offsetNone(series, order) uses the existing baseline", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.offsetNone(series, shape.orderNone(series));
  test.deepEqual(series, [
    [[0, 1], [0, 2], [0, 1]],
    [[1, 4], [2, 6], [1, 3]],
    [[4, 9], [6, 8], [3, 7]]
  ]);
  test.end();
});

tape("offsetNone(series, order) treats NaN as zero", function(test) {
  var series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  shape.offsetNone(series, shape.orderNone(series));
  test.ok(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t test.equal NaN
  test.deepEqual(series, [
    [[0, 1], [0,     2], [0, 1]],
    [[1, 4], [2, "NaN"], [1, 3]],
    [[4, 9], [2,     4], [3, 7]]
  ]);
  test.end();
});

tape("offsetNone(series, order) observes the specified order", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.offsetNone(series, shape.orderReverse(series));
  test.deepEqual(series, [
    [[8, 9], [6, 8], [6, 7]],
    [[5, 8], [2, 6], [4, 6]],
    [[0, 5], [0, 2], [0, 4]]
  ]);
  test.end();
});
