describe("Labyrinth", function() {

  var labyrinth;

  beforeEach(function() {
    labyrinth = new Labyrinth();
  });

  describe(".areNeighbors", function() {
    it("should return false if two cells are not neighbors", function() {
      rows = labyrinth.rows();
      first = rows[0][0];
      last = rows[rows.length - 1][0];
      console.log(first, last);

      expect(labyrinth.areNeighbors(first, last)).toBe(false);
    });

    it("should return true if two cells are", function() {
      first = new Cell(0, 0);
      second = new Cell(0, 1);
      rows = labyrinth.rows();
      rows[0][0] = first;
      rows[0][1] = second;
      first.wall(Cell.WEST);
      second.wall(Cell.EAST);

      expect(labyrinth.areNeighbors(first, second)).toBe(true);
    });
  });
});
