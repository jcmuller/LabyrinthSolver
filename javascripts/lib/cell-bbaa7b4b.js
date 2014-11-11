var Cell = function() {
  var value,
      col,
      row,
      initialize = function() {
        value = 0;
        args = arguments[0];
        if (args.length === 0)
          args = [0, 0];
        row = args[0];
        col = args[1];
      },
      bit = function(section, direction) {
        return 1 << (direction + 4 * section);
      },
      set = function(section, direction) {
        value = value | bit(section, direction);
      },
      wall = function(direction) {
        set(Cell.WALL, direction);
      },
      isSet = function(section, direction) {
        v = value & bit(section, direction);
        return v !== 0;
      },
      isWallSet = function(direction) {
        return isSet(Cell.WALL, direction);
      },
      areWallsIntact = function() {
        var wallsSet = isWallSet(Cell.NORTH) || isWallSet(Cell.SOUTH) ||
          isWallSet(Cell.EAST) || isWallSet(Cell.WEST);
        return !wallsSet;
      },
      toString = function() {
        return "[" + row + "," + col + "] v:" + value;
      };

  initialize(arguments);

  return {
    areWallsIntact: areWallsIntact,
    col: function() { return col; },
    isSet: isSet,
    isWallSet: isWallSet,
    row: function() { return row; },
    set: set,
    setValue: function(val) { value = val; },
    toString: toString,
    wall: wall,
    value: function() { return value; }
  };
};

Cell.NORTH = 0;
Cell.EAST = 1;
Cell.SOUTH = 2;
Cell.WEST = 3;

Cell.DIRECTIONS = [
  Cell.NORTH,
  Cell.EAST,
  Cell.SOUTH,
  Cell.WEST
];

Cell.WALL = 0;
Cell.BORDER = 1;
Cell.SOLUTION = 2;
Cell.BACKTRACK = 3;

Cell.opposedDirection = function(dir) {
  return (dir + 2) % 4;
};
