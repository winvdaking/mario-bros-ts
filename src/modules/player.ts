import process from 'node:process';
import { setTimeout } from 'node:timers';
import keypress from "keypress";

import ElementWorld from './elementWorld';
import World from './world';
import Entity from './entity';

import Position from './interfaces/iposition';

export default class Player extends Entity {

	inventory: any[];

	constructor(world : World, position : Position){
		super(position, world);
		this.inventory = [];
	}

	init() : void {
		this.controller();
	}

	collect(item) : void {
		this.inventory.push(item);
	}

	controller() : void {
		let [x, y] = this.world.getPosOf(ElementWorld.MARIO);
		keypress(process.stdin);

		process.stdin.on('keypress', (ch, key) => {
			if (key && (key.ctrl && key.name == 'c') || (key.name === 'q')) {
				process.stdin.pause();
				process.exit(0);
			}

			if (key && key.name === 'left') {
				if (this.world.getPos(x, y - 1) && this.onGround) {
					this.world.setPos(x, y, ElementWorld.BACKGROUND);
					this.world.setPos(x, --y, ElementWorld.MARIO);
					console.log(this.world.render());
				}
			}

			if (key && key.name === 'right') {
				if (this.world.getPos(x, y + 1) && this.onGround) {
					this.world.setPos(x, y, ElementWorld.BACKGROUND);
					this.world.setPos(x, ++y, ElementWorld.MARIO);
					console.log(this.world.render());
				}
			}

			if (key && key.name === 'space') {
				this.onGround = false;
				if (this.world.getPos(x - 3, y) === ElementWorld.BACKGROUND) {
					this.world.setPos(x, y, ElementWorld.BACKGROUND);
					this.world.setPos(x-4, y, ElementWorld.MARIO);
					this.resetJump(x, y, 4);
				} else if (this.world.getPos(x - 3, y) === ElementWorld.BONUS){
					this.world.setPos(x, y, ElementWorld.BACKGROUND);
					this.world.setPos(x-4, y, ElementWorld.ITEM);
					this.world.setPos(x-2, y, ElementWorld.MARIO);
					this.resetJump(x, y, 2);
				}else{
					this.world.setPos(x, y, ElementWorld.BACKGROUND);
					this.world.setPos(x-2, y, ElementWorld.MARIO);
					this.resetJump(x, y, 2);
				}
			}

		});

		process.stdin.setRawMode(true);
		process.stdin.resume();
	}

	resetJump(x, y, xn) : void {
		console.log(this.world.render());
		setTimeout(() => {
			this.world.setPos(x - xn, y, ElementWorld.BACKGROUND);
			this.world.setPos(x, y, ElementWorld.MARIO);
			this.onGround = true;
			console.log(this.world.render());
		}, 300);
	}
}