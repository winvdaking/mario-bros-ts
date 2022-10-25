import process from 'node:process';
import keypress from "keypress";
import ElementWorld from './elementWorld';
import IRender from './interfaces/irender';

let x = 13, y = 8;

console.clear();

class World implements IRender {

	_world: string[][];

	constructor() {
		this._world = Array(16).fill('').map(() => Array(64).fill(ElementWorld.BACKGROUND));
		setInterval(this.moveMonster.bind(this), 500);
		this.controller();
	}

	getPos(x: number, y: number): string | undefined {
		return this._world[x][y];
	}

	getPosOf(value) {
		const x = this._world.findIndex(arr => arr.includes(value));
		if (x < 0) return [null, null];
		const y = this._world[x].findIndex(a => a === value);
		return [x, y];
	}

	setPos(x: number, y: number, value: string): void {
		this._world[x][y] = value;
	}

	controller(): void {
		keypress(process.stdin);

		process.stdin.on('keypress', (ch, key) => {
			if (key && (key.ctrl && key.name == 'c') || (key.name === 'q')) {
				process.stdin.pause();
				process.exit(0);
			};

			if (key && key.name === 'left') {
				if (this.getPos(x, y - 1)) {
					this.setPos(x, y, ElementWorld.BACKGROUND);
					this.setPos(x, --y, ElementWorld.MARIO);
					console.log(this.render());
				};
			};

			if (key && key.name === 'right') {
				if (this.getPos(x, y + 1)) {
					this.setPos(x, y, ElementWorld.BACKGROUND);
					this.setPos(x, ++y, ElementWorld.MARIO);
					console.log(this.render());
				};
			};

			if (key && key.name === 'space') {
				if (this.getPos(x - 3, y).includes(ElementWorld.BACKGROUND)) {
					this.setPos(x - 4, y, ElementWorld.MARIO);
					this.setPos(x, y, ElementWorld.BACKGROUND);
					this.resetJump(4);
				} else if (this.getPos(x - 3, y).includes(ElementWorld.BONUS)){
					this.setPos(x - 4, y, ElementWorld.ITEM);
					this.setPos(x - 2, y, ElementWorld.MARIO);
					this.setPos(x, y, ElementWorld.BACKGROUND);
					this.resetJump(2);
				}else{
					this.setPos(x - 2, y, ElementWorld.MARIO);
					this.setPos(x, y, ElementWorld.BACKGROUND);
					this.resetJump(2);
				}
			};
		});

		process.stdin.setRawMode(true);
		process.stdin.resume();
	};

	resetJump(xn): void{
		console.log(this.render());
		setTimeout(() => {
			this.setPos(x, y, ElementWorld.MARIO);
			this.setPos(x - xn, y, ElementWorld.BACKGROUND);
			console.log(this.render());
		}, 300);
	}

	moveMonster(): void {
		let [x, y] = this.getPosOf(ElementWorld.MONSTER);
		if (x && y) {
			if (y < 36) {
				this.setPos(x, y, ElementWorld.BACKGROUND);
				this.setPos(x, ++y, ElementWorld.MONSTER);
				console.log(this.render());
			} else {
				this.setPos(x, y, ElementWorld.BACKGROUND);
				this.setPos(x, --y, ElementWorld.MONSTER);
				console.log(this.render());
			};
		};
	};

	generate(): void {
		for (let x = 0; x < this._world.length; x++) {
			for (let y = 0; y < this._world[x].length; y++) {
				if (x > 13 && x < 17) {
					this.setPos(x, y, ElementWorld.FLOOR);
				};

				if (x === 10 && y === 22) {
					this.setPos(x, y, ElementWorld.BONUS);
				}

				if (x === 10) {
					if ([32, 33, 34, 35, 36, 37, 38].includes(y)) {
						const character = (y % 2 === 0) ? ElementWorld.FLOAT_PLAT : ElementWorld.BONUS;
						this.setPos(x, y, character);
					};
				};

				if (x === 6 && y === 35) {
					this.setPos(x, y, ElementWorld.BONUS);
				};

				if (x === 13 && y === 8) {
					this.setPos(x, y, ElementWorld.MARIO);
				};

				if (x === 13 && y === 33) {
					this.setPos(x, y, ElementWorld.MONSTER);
				};
			};
		};
	};

	render(): string {
		console.clear();
		return this._world.join('\n').replaceAll(',', '') + '\n' + ElementWorld.LEXIQUE;
	};
};

export default World;