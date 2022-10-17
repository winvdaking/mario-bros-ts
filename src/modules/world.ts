const IRender = require('./interfaces/irender');

class World implements IRender {

	private _world : string[][];

	constructor(){
		this._world = Array(16).fill('').map(() => Array(32).fill('1'));
	}

	getPos(x: number, y: number): string|undefined {
		return this._world[x][y];
	}

	setPos(x: number, y: number, value: string): void {
		this._world[x][y] = value;
	}

	render(): string {
		return this._world.join('\n');
	}

};

export default World;