var RenderLabyrinth = function(options) {
  var labyrinth,
      $target,
      target,
      processing,
      canvas,
      cellHeight = 5,
      cellWidth = 5,
      solution = [],
      cells = [],
      temp = [],
      renderEllipses = false,
      $generateButton,
      $toggleEllipseButton,
      generateLabyrinth = function() {
        solution.length = 0;
        labyrinth.resetCells();
        labyrinth.initializeMaze();
        extractCells();
      },
      initialize = function(options) {
        options = options || {};

        $generateButton = options.generateButton || $("[data-role=generate]");
        $toggleEllipseButton = options.toggleEllipseButton || $("[data-role=toggle_ellipses]");
        labyrinth = options.labyrinth || new Labyrinth(10, 10);
        $target = options.target || $('[data-role="labyrinth"]');
        $target.attr('id', 'renderLabyrinthId');
        target = document.getElementById($target.attr('id'));
        extractCells();
      },
      render = function() {
        new Processing(target, sketch);
      },
      extractCells = function() {
        var rows = labyrinth.rows();

        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];

          for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            cells.push(cell);
          }
        }
      },
      sketch = function(p) {
        processing = p;

        p.setup = function() {
          p.size(600, 300);
        };
        // Override draw function, by default it will be called 60 times per second
        p.draw = function() {
          p.background(255);
          renderCells();
          renderSolution();
        };
      },
      renderCells = function() {
        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];

          processing.stroke(0);
          processing.strokeWeight(0);
          processing.pushMatrix();
          processing.translate(cell.col() * cellWidth, cell.row() * cellHeight);
          renderCell(cell);
          processing.popMatrix();
        }
      },
      renderCell = function(cell) {
        var x1 = 0,
          x2 = cellWidth,
          y1 = 0,
          y2 = cellHeight;

        if (!cell.isWallSet(Cell.NORTH)) processing.line(x1, y2, x2, y2);
        if (!cell.isWallSet(Cell.SOUTH)) processing.line(x1, y1, x2, y1);
        if (!cell.isWallSet(Cell.WEST))  processing.line(x1, y1, x1, y2);
        if (!cell.isWallSet(Cell.EAST))  processing.line(x2, y1, x2, y2);
      },
      renderSolution = function() {
        for (var i = 0; i < solution.length - 1; i++) {
          var cell1 = solution[i];
          var cell2 = solution[i + 1];

          processing.pushMatrix();
          processing.fill(i / 4, 255 - i / 4, i);
          renderSolutionCells(cell1, cell2);
          processing.popMatrix();
        }
      },
      renderSolutionCells = function(cell1, cell2) {
        var x1 = 0, x2 = cellWidth, y1 = 0, y2 = cellHeight;

        var dx = (cell2.col() - cell1.col()) * cellWidth,
            dy = (cell2.row() - cell1.row()) * cellHeight;

        processing.translate(cell1.col() * cellWidth, cell1.row() * cellHeight);

        if (renderEllipses) {
          processing.strokeWeight(0);
          processing.stroke(0);
          processing.ellipse((x1 + x2) / 2, (y1 + y2) / 2, cellWidth / 2, cellHeight / 2);
          if (solution[solution.length - 1] == cell2) {
            processing.ellipse(dx + (x1 + x2) / 2, dy + (y1 + y2) / 2, cellWidth / 2, cellHeight / 2);
          }
        }

        processing.strokeWeight(2);
        processing.stroke(120, 120, 0);
        processing.line((x1 + x2) / 2, (y1 + y2) / 2, dx + (x1 + x2) / 2, dy + (y1 + y2) / 2);
        processing.stroke(0);
        processing.strokeWeight(0);
      }
  ;

  initialize(options);

  $generateButton.on("click", generateLabyrinth);
  $toggleEllipseButton.on("click", function() {
    renderEllipses = !renderEllipses;
  });

  return {
    setLabyrinth: function(l) { labyrinth = l; },
    labyrinth: function() { return labyrinth; },
    render: render,
    processing: function() { return processing; },
    solution: function() { return solution; },
    cells: function() { return cells; }
  };
};
