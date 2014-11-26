class window.Marble
  pitch: null
  angle: null
  mesh: null
  textureFile: 'images/textures/marble1.jpg'

  constructor: ->
    @pitch = 0
    @angle = 0

    geometry = new THREE.SphereGeometry(1, 20, 20)
    texture = THREE.ImageUtils.loadTexture(@textureFile)
    material = new THREE.MeshLambertMaterial(
      color: 0xFFFFFF
      map: texture
      side: THREE.DoubleSide
    )
    @mesh = new THREE.Mesh(geometry, material)
    @mesh.position.set(0, 0, 0)
    @mesh.castShadow = true

  position: -> @mesh.position

  move: (units, speed = 1) ->
    @pitch = units * speed
    @mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), @pitch)
    @mesh.position.z += units

  up: (faster = false) ->
    speed = 1
    speed = 3 if faster
    @move(0.1, speed)
  down: (faster = false)->
    speed = 1
    speed = 3 if faster
    @move(-0.1, speed)
  left: ->
    @angle =  0.1
    @mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), @angle)
    console.log @angle / Math.PI * 180
  right: ->
    @angle = -0.1
    @mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), @angle)
