import process from 'node:process';
import keypress from "keypress";

import ElementWorld from './elementWorld';
import IRender from './interfaces/irender';
import ElementWorld from "./elementWorld";


let x = 13, y = 8;

console.clear();

class World implements IRender {

	_world : string[][];

	constructor(){
		this._world = Array(16).fill('').map(() => Array(64).fill(' '));
		setInterval(this.moveMonster.bind(this), 500);
		this.controller();
	}

	getPos(x: number, y: number): string|undefined {
		return this._world[x][y];
	}

	getPosOf(value) {
		const x = this._world.findIndex(arr => arr.includes(value));
		const y = this._world[x].findIndex(a => a === value);
		return [x, y];
	}

	setPos(x: number, y: number, value: string): void {
		this._world[x][y] = value;
	}

	controller(){
		keypress(process.stdin);

		process.stdin.on('keypress', (ch, key) => {
			if (key && (key.ctrl && key.name == 'c') || (key.name === 'q')) {
				process.stdin.pause();
				process.exit(0);
			}

			if (key && key.name === 'left') {
				this.setPos(x, y, ' ');
				this.setPos(x, --y, ElementWorld.MARIO);
				console.clear();
				console.log(this.render());
				console.log(new ElementWorld().lexique());
			}

			if (key && key.name === 'right') {
				this.setPos(x, y, ' ');
				this.setPos(x, ++y, ElementWorld.MARIO);
				console.clear();
				console.log(this.render());
				console.log(new ElementWorld().lexique());
			}

		});

		process.stdin.setRawMode(true);
		process.stdin.resume();
	}

	moveMonster(){
		let [x, y] = this.getPosOf('@');
		if (y < 36 && y > 26) {
			this.setPos(x, y, ' ');
			this.setPos(x, ++y, ElementWorld.MONSTER);
			console.clear();
			console.log(this.render());
		} else {
			this.setPos(x, y, ' ');
			this.setPos(x, --y, ElementWorld.MONSTER);
			console.clear();
			console.log(this.render());
		}
	}

	generate(): void {
		for(let x = 0; x < this._world.length; x++){
			for(let y = 0; y < this._world[x].length; y++){
				if (x > 13 && x < 17) {
					this.setPos(x, y, '#');
				}

				if (x === 10 && y === 22) {
					this.setPos(x, y, '?');
				}

				if (x === 10) {
					if ([32, 33, 34, 35, 36, 37, 38].includes(y)) {
						const character = (y % 2 === 0) ? '=' : '?';
						this.setPos(x, y, character);
					}
				}

				if (x === 6 && y === 35) {
					this.setPos(x, y, ElementWorld.BONUS);
				}

				if (x === 13 && y === 8) {
					this.setPos(x, y, ElementWorld.MARIO);
				}

				if (x === 13 && y === 33) {
					this.setPos(x, y, ElementWorld.MONSTER);
				}
			}
		}
	}

	render(): string {
		return this._world.join('\n').replaceAll(',', '');
	}

};

export default World;
