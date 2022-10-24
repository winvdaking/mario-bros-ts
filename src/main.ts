import ElementWorld from './modules/elementWorld';
import World from './modules/world';

const world = new World();

world.generate();

console.log(world.render());
