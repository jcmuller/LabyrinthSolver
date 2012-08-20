var Resolver = function(options) {
  var labyrinth,
      solution,
      $solveButton,
      temp,
      initialize = function(options) {
        options = options || { labyrinth: new Labyrinth() };
        $solveButton = options.solveButton || $("[data-role=solve]");
        labyrinth = options.labyrinth;
        solution = options.solution;
      },
      start = function() {
        var rows = labyrinth.rows(),
            currentCell = rows[rows.length - 1][rows[rows.length - 1].length - 1],
            last = rows[0][0],
            neighbors = [],
            cellStack = [];

        // Stack for current solution
        // Stack for possibilities

        // current branch
        // branch can be 'committed'
        // branch is destroyed when a wall is hit

        solution.length = 0;
        solution.push(currentCell);

        var a = 0;
        while (last != currentCell && a < 10000) {
          a++;
          neighbors.length = 0;

          for (var directionString in Cell.DIRECTIONS) {
            var direction = parseInt(directionString, 10);
            if (currentCell.isWallSet(direction)) {
              n = labyrinth.neighbor(currentCell, direction);
              if (solution.indexOf(n) == -1)
                neighbors.push(n);
            }
          }

          if (neighbors.length > 0) {
            cellStack.push(currentCell);
            currentCell = neighbors[random(neighbors.length)];
          } else {
            //console.log('popping', solution.length, cellStack.length);
            currentCell = cellStack.pop();
            // cut solution to the neighbor of current currentCell
            while (solution.length > 0 &&
                !labyrinth.areNeighbors(currentCell, solution[solution.length - 1])) {
              solution.pop();
            }
          }

          if (solution.indexOf(currentCell) == -1)
            solution.push(currentCell);

          if (last == currentCell) {
            console.log("FOUND IT!", solution.length);
          }
        }

        if (last != currentCell) {
          console.log("Didn't find it in ", solution.length);
        }
      },
      random = function(upper_bound) {
        return Math.floor(Math.random() * upper_bound);
      }
  ;

  initialize(options);

  $solveButton.on("click", start);

  return {
    setLabyrinth: function(l) { labyrinth = l; },
    start: start,
    setSolution: function(s) { solution = s; }
  };
};
