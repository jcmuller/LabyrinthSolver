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

        // This is a new attempt.
        solution.length = 0;
        // Start with the desired entry point
        solution.push(currentCell);

        // Number of total iterations has to be bound...
        // otherwise it can run forever :(
        var a = 0;
        while (last != currentCell && a < 100000) {
          a++;
          neighbors.length = 0;

          // This is calculating neighbors per iteration,
          // even if currentCell has already been looked at
          // .... how about storing the neighbors? No... that could grow pretty
          // quickly
          for (var directionString in Cell.DIRECTIONS) {
            var direction = parseInt(directionString, 10);
            // Get neighbors that are plausible
            if (currentCell.isWallSet(direction)) {
              n = labyrinth.neighbor(currentCell, direction);
              // And that aren't part of the solution yet
              if (solution.indexOf(n) == -1)
                neighbors.push(n);
            }
          }

          if (neighbors.length > 0) {
            cellStack.push(currentCell);
            currentCell = neighbors[random(neighbors.length)];
          } else {
            currentCell = cellStack.pop();

            // TODO
            // Need to store pairs, so that I know who's neighbor is being
            // popped from the cellStack and remove up to that element (the
            // neighbor of the cell out of the stack
            /*
            if (solution.indexOf(currentCell) > -1) {
              //a -= solution.length - solution.indexOf(currentCell);
              solution.length = solution.indexOf(currentCell) + 1;
            }
            */
          }

          if (solution.indexOf(currentCell) == -1)
            solution.push(currentCell);
        }

        if (last != currentCell)
          console.log("Didn't find it in ", solution.length, a);
        else {
          console.log("Found it in", solution.length, a);
          //simplifySolution();
        }
      },
      random = function(upper_bound) {
        return Math.floor(Math.random() * upper_bound);
      },
      simplifySolution = function() {
        var temp = [solution[0]];
        for (var i = 1; i < solution.length; i++) {
          var cell = solution[i];
          console.log(temp[temp.length - 1].toString(), cell.toString());
          if (labyrinth.areNeighbors(temp[temp.length - 1], cell)) {
            console.log('Neighbors');
            temp.push(cell);
          } else
            console.log('Not');
        }

        solution.length = temp.length;
        for (var j = 0; j < temp.length; j++)
          solution[j] = temp[j];
      }
  ;

  initialize(options);

  $solveButton.on("click", start);

  return {
    setLabyrinth: function(l) { labyrinth = l; },
    start: start,
    setSolution: function(s) { solution = s; },
    simplifySolution: simplifySolution
  };
};
