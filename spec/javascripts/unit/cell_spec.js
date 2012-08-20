describe("Cell", function() {

  var cell;

  beforeEach(function() {
    cell = new Cell();
  });

  describe(".opposedDirection", function() {
    it("should return NORTH for SOUTH", function() {
      expect(Cell.opposedDirection(Cell.SOUTH)).toEqual(Cell.NORTH);
    });

    it("should return SOUTH for NORTH", function() {
      expect(Cell.opposedDirection(Cell.NORTH)).toEqual(Cell.SOUTH);
    });

    it("should return WEST for EAST", function() {
      expect(Cell.opposedDirection(Cell.EAST)).toEqual(Cell.WEST);
    });

    it("should return EAST for WEST", function() {
      expect(Cell.opposedDirection(Cell.WEST)).toEqual(Cell.EAST);
    });
  });

  describe("initializer", function() {
    it("should set value to 0", function() {
      expect(cell.value()).toEqual(0);
    });

    it("should default row to 0", function() {
      expect(cell.row()).toEqual(0);
    });

    it("should default col to 0", function() {
      expect(cell.col()).toEqual(0);
    });

    it("shoud set passed in row and col values", function() {
      var cell = new Cell(1, 2);
      expect(cell.row()).toEqual(1);
      expect(cell.col()).toEqual(2);
    });
  });

  describe("set", function() {
    it("should set bit wall south", function() {
      var value = 4;
      cell.set(Cell.WALL, Cell.SOUTH);
      expect(cell.value()).toEqual(value);
    });
  });

  describe("isSet", function() {
    it("should return false when bit is not set for wall north", function () {
      cell.set(Cell.WALL, Cell.SOUTH);
      expect(cell.isSet(Cell.WALL, Cell.NORTH)).toBe(false);
    });

    it("should return true when bit is set for wall north", function () {
      cell.set(Cell.WALL, Cell.NORTH);
      expect(cell.isSet(Cell.WALL, Cell.NORTH)).toBe(true);
    });
  });

  describe("isWallSet", function() {
    it("should return false when bit is not set for wall north", function () {
      cell.wall(Cell.SOUTH);
      expect(cell.isWallSet(Cell.NORTH)).toBe(false);
    });

    it("should return true when bit is set for wall north", function () {
      cell.wall(Cell.NORTH);
      expect(cell.isWallSet(Cell.NORTH)).toBe(true);
    });
  });

  describe("areWallsIntact", function() {
    it("should return false if at least one wall is up", function() {
      cell.wall(Cell.SOUTH);
      expect(cell.areWallsIntact()).toBe(false);
    });

    it("should return true if no walls are up", function() {
      expect(cell.areWallsIntact()).toBe(true);
    });

    it("should return false if all walls are up", function() {
      cell.wall(Cell.NORTH);
      cell.wall(Cell.SOUTH);
      cell.wall(Cell.EAST);
      cell.wall(Cell.WEST);
      expect(cell.areWallsIntact()).toBe(false);
    });
  });

  describe("wall", function() {
    it("should call set with Cell.WALL and direction passed in", function() {
      cell.wall(Cell.NORTH);
      expect(cell.isWallSet(Cell.NORTH)).toBe(true);
    });
  });

  describe("setValue", function() {
    it("should set value", function() {
      cell.setValue(123);
      expect(cell.value()).toEqual(123);
    });
  });
});

