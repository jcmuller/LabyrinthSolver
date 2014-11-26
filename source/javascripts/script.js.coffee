$ ->
  labyrinth = new Labyrinth 40, 24

  renderer = new RenderLabyrinth
    labyrinth: labyrinth

  new Resolver
    labyrinth: labyrinth
    solution: renderer.solution()

  renderer.render()

  new Renderer(
    labyrinth: labyrinth
  )
