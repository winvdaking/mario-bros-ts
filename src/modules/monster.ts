import { setInterval, clearInterval } from 'node:timers';

import World from './world';
import Entity from './entity';
import ElementWorld from './elementWorld';

import Position from './interfaces/iposition';

export default class Monster extends Entity {

	_moveForward : boolean;
	_interval : NodeJS.Timer;

	constructor(world: World, position : Position){
		super(position, world);
		this._moveForward = true;
	}

	init() : void {
		this._interval = setInterval(this.controller.bind(this), 500).unref();
	}

	stop() : void {
		clearInterval(this._interval);
		this._interval = null;
	}

	controller() : void {
		let [x, y] = this.world.getPosOf(ElementWorld.MONSTER);

		if(!x && !y) {
			this.stop();
			return;
		}

		if (this._moveForward) {
			if (y <= 38) {
				this.world.setPos(x, y, ElementWorld.BACKGROUND);
				this.world.setPos(x, ++y, ElementWorld.MONSTER);
				console.log(this.world.render());
			} else {
				this._moveForward = false;
				this.world.setPos(x, y, ElementWorld.BACKGROUND);
				this.world.setPos(x, --y, ElementWorld.MONSTER);
				console.log(this.world.render());
			}
		} else {
			if (y >= 26) {
				this.world.setPos(x, y, ElementWorld.BACKGROUND);
				this.world.setPos(x, --y, ElementWorld.MONSTER);
				console.log(this.world.render());
			} else {
				this._moveForward = true;
				this.world.setPos(x, y, ElementWorld.BACKGROUND);
				this.world.setPos(x, ++y, ElementWorld.MONSTER);
				console.log(this.world.render());
			}

		}
	}

}
