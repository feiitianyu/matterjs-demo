const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Events = Matter.Events
const Constraint = Matter.Constraint
const MouseConstraint = Matter.MouseConstraint
const Mouse = Matter.Mouse
const World = Matter.World
const Bodies = Matter.Bodies

const width = 1022
const height = 446
const ejectDistance = 3

const engine = Engine.create()
const world = engine.world

const render = Render.create({
  element: document.body,
  engine,
  options: {
    width,
    height,
    background: 'url("./bg.png")',
    wireframeBackground: '#fff',
    wireframes: false,
    showVelocity: true,
    showCollitions: true
  }
})

Render.run(render)

const runner = Runner.create()
Runner.run(runner, engine)

const ground = Bodies.rectangle(511, 444, 1022, 10, { isStatic: true })

const birdOptions = { mass: 20, restitution: 0.6 }
let bird = Bodies.circle(200, 350, 16, birdOptions)
const elastic = Constraint.create({
  pointA: { x: 200, y: 350 },
  bodyB: bird,
  length: 0.01,
  stiffness: 0.25,
  render: {
    strokeStyle: 'black'
  }
})

const woodOptions = { mass: 2, isStatic: false, restitution: 0, friction: 0.4 }
const rockOptions = { mass: 4, isStatic: false, restitution: 0, friction: 0.5 }
const ironOptions = { mass: 6, isStatic: false, restitution: 0, friction: 0.2 }

let stacks = []
stacks[0] = Bodies.rectangle(450, height - 42, 30, 70, rockOptions)
stacks[1] = Bodies.rectangle(485, height - 88, 80, 20, rockOptions)
stacks[2] = Bodies.rectangle(520, height - 42, 30, 70, rockOptions)

stacks[3] = Bodies.rectangle(620, height - 58, 28, 100, rockOptions)
stacks[4] = Bodies.rectangle(650, height - 119, 80, 20, rockOptions)
stacks[5] = Bodies.rectangle(680, height - 58, 28, 100, rockOptions)

stacks[6] = Bodies.rectangle(780, height - 82, 20, 150, rockOptions)
stacks[7] = Bodies.rectangle(800, height - 82, 20, 150, rockOptions)
stacks[8] = Bodies.rectangle(850, height - 168, 150, 20, rockOptions)
stacks[9] = Bodies.rectangle(900, height - 82, 20, 150, rockOptions)
stacks[10] = Bodies.rectangle(920, height - 82, 20, 150, rockOptions)

stacks[11] = Bodies.rectangle(570, height - 28, 20, 40, woodOptions)
stacks[12] = Bodies.rectangle(570, height - 58, 60, 20, woodOptions)

stacks[13] = Bodies.rectangle(730, height - 28, 20, 40, woodOptions)
stacks[14] = Bodies.rectangle(730, height - 58, 60, 20, woodOptions)

stacks[15] = Bodies.rectangle(900, height - 194, 30, 30, woodOptions)
stacks[16] = Bodies.rectangle(840, height - 220, 120, 10, woodOptions)

stacks[17] = Bodies.rectangle(485, height - 138, 30, 80, ironOptions)
stacks[18] = Bodies.rectangle(485, height - 194, 30, 30, ironOptions)

stacks[19] = Bodies.rectangle(650, height - 170, 30, 80, ironOptions)
stacks[20] = Bodies.rectangle(570, height - 220, 220, 20, ironOptions)

stacks[21] = Bodies.circle(570, 358, 20, ironOptions)
stacks[22] = Bodies.circle(730, 362, 16, ironOptions)
stacks[23] = Bodies.circle(570, 196, 20, ironOptions)

World.add(world, [ground, bird, ...stacks, elastic]);

const mouse = Mouse.create()
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
})

Events.on(engine, 'afterUpdate', function() {
  if(mouseConstraint.mouse.button === -1 && (bird.position.x > (200 + ejectDistance) || bird.position.y < (350 - ejectDistance))) {
    bird = Bodies.circle(200, 350, 16, birdOptions)
    World.add(world, bird)
    elastic.bodyB = bird
  }
})

World.add(world, mouseConstraint)

render.mouse = mouse

Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 1022, y: 446 }
})


