var Labyrinth = function() {
  var DIRECTIONS = ['north', 'east', 'south', 'west'],
      rows,
      height,
      width,
      totalCells,
      initialize = function() {
        args = arguments[0];
        if (args.length === 0)
          args = [4, 4];
        width = args[0];
        height = args[1];

        initializeCells();
        initializeMaze();
      },
      initializeCells = function() {
        rows = new Array();
        for (var i = 0; i < height; i++) {
          row = new Array();
          for (var j = 0; j < width; j++) {
            row.push(new Cell(i, j));
          }
          rows.push(row);
        }
      },
      resetCells = function() {
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];

          for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            cell.setValue(0);
          }
        }
      },
      initializeMaze = function () {
        var visitedCells = 1,
            cellStack = new Array(),
            neighbors = new Array(),
            currentCell = rows[random(height)][random(width)];
        totalCells = width * height;

        while (visitedCells < totalCells) {
          neighbors.length = 0;

          for (var directionString in Cell.DIRECTIONS) {
            var direction = parseInt(directionString, 10),
                n = neighbor(currentCell, direction);
            if (n !== null && n.areWallsIntact())
              neighbors.push(direction);
          }

          if (neighbors.length > 0) {
            var whereTo = neighbors[random(neighbors.length)];
            currentCell.wall(whereTo);
            cellStack.push(currentCell);
            currentCell = neighbor(currentCell, whereTo);
            currentCell.wall(Cell.opposedDirection(whereTo));
            visitedCells++;
          } else if (cellStack.length === 0) {
            console.log(currentCell);
            throw("WTF");
          } else {
            currentCell = cellStack.pop();
          }
        }
      },
      neighbor = function(cell, direction) {
        col = cell.col();
        row = cell.row();

        switch(direction) {
          case Cell.NORTH:
            ++row;
            break;
          case Cell.SOUTH:
            --row;
            break;
          case Cell.EAST:
            ++col;
            break;
          case Cell.WEST:
            --col;
            break;
          default:
            break;
        }

        if (col < 0 || row < 0 || col == width || row == height)
          return null;

        try {
          return rows[row][col];
        } catch(e) {
          console.log("Whoops:", e);
          return null;
        }
      },
      areNeighbors = function(cell1, cell2) {
        if (
            (Math.abs(cell1.row() - cell2.row()) == 1 &&
             Math.abs(cell1.col() - cell2.col()) === 0) ||
            (Math.abs(cell1.col() - cell2.col()) === 0 &&
             Math.abs(cell1.row() - cell2.row()) == 1))
        {
          return true;
        }
        return false;
      },
      random = function(upper_bound) {
        return Math.floor(Math.random() * upper_bound);
      };

  initialize(arguments);

  return {
    initializeMaze: initializeMaze,
    resetCells: resetCells,
    rows: function() { return rows; },
    totalCells: function() { return totalCells; },
    neighbor: neighbor,
    areNeighbors: areNeighbors
  };
};
