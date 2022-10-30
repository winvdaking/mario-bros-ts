import World from './modules/world';
import Monster from './modules/monster';
import Player from './modules/player';

const world = new World();
const goomba = new Monster(world, {x: 13, y: 33});
const mario = new Player(world, {x: 13, y: 8});

world
.addEntity(mario)
.addEntity(goomba)
.generate();

console.log(world.render());
