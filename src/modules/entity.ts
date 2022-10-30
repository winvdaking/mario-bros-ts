import Position from './interfaces/iposition';
import Velocity from './interfaces/ivelocity';
import Size from './interfaces/isize';
import World from './world';

export default abstract class Entity {

	position: Position;
	velocity: Velocity;
	size: Size;
	world: World;
	onGround: boolean;

	constructor({ x = 0, y = 0 } : Position = {}, world : World){
		this.position = { x, y };
		this.velocity = { x: 0, y: 0 };
		this.size = { x: 0, y: 0 };
		this.world = world;
		this.onGround = true;
	}

	abstract init() : void;

	abstract controller() : void|any;

};