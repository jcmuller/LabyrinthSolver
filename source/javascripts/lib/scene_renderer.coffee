class window.Renderer
  scene: null
  camera: null
  renderer: null
  $element: null
  width: null
  height: null
  actor: null

  constructor: ->
    @$element = $('[data-role=renderer]')
    @width = parseInt(@$element.css('width'), 10)
    @height = parseInt(@$element.css('height'), 10)

    @scene = new THREE.Scene()
    @camera = new THREE.PerspectiveCamera(
      75
      @width / @height
      0.1
      1000
    )

    @renderer = new THREE.WebGLRenderer()
    @renderer.setSize(@width, @height)
    @$element.append(@renderer.domElement)
    @renderer.shadowMapEnabled = true

    # geometry = new THREE.BoxGeometry(1, 1, 1)
    # texture = THREE.ImageUtils.loadTexture('images/textures/grunge_640.jpg')
    # material = new THREE.MeshLambertMaterial(
    #   color: 0xffffff
    #   map: texture
    # )
    # cube = new THREE.Mesh(geometry, material)
    # cube.position.set(0, 0, 0)
    # @scene.add(cube)

    controls = new THREE.OrbitControls(@camera)

    #light = new THREE.HemisphereLight(0xFFFFFF, 0x333333, 1.0)
    light = new THREE.DirectionalLight()
    light.castShadow = true
    light.shadowDarkness = 0.5
    light.position.set(0.5, 20, 0)
    @scene.add(light)

    #light.shadowCameraVisible = true
    #@renderer.shadowMapDebug = true
    #light.shadowCameraVisible = true

    geometry = new THREE.BoxGeometry(50, 0.2, 50)
    material = new THREE.MeshLambertMaterial(
      color: 0x333333
      side: THREE.DoubleSide
    )
    @floor = new THREE.Mesh(geometry, material)
    @floor.position.set(23, -1.2, -23)
    @floor.receiveShadow = true
    @scene.add(@floor)

    @actor = new Marble()
    @scene.add(@actor.mesh)

    #@camera.position = @actor.position
    #@camera.position += -3
    @camera.position.set(0, 2, 10)
    @camera.lookAt(new THREE.Vector3(0, 0, 0))

    $(document).on('keydown', @keydown)

    @render()

  keydown: (e) =>
    # 75 -> K
    # 74 -> J
    # 72 -> H
    # 76 -> L
    # 38 -> Up
    # 40 -> Down
    # 37 -> Left
    # 39 -> Right
    # 87 -> W
    # 83 -> S
    # 65 -> A
    # 68 -> D

    #console.log 'shift' if e.shiftKey
    #console.log 'ctrl' if e.ctrlKey

    switch e.keyCode
      when 75, 40, 83
        e.preventDefault()
        @actor.down(e.shiftKey)
      when 74, 38, 87
        e.preventDefault()
        @actor.up(e.shiftKey)
      when 72, 37, 65
        e.preventDefault()
        @actor.left()
      when 76, 39, 68
        e.preventDefault()
        @actor.right()

      when 189
        console.log '-'
      when 187
        console.log '+'

  render: =>
    requestAnimationFrame(@render)
    @renderer.render(@scene, @camera)
