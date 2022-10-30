import ElementWorld from './elementWorld';
import IRender from './interfaces/irender';
import Monster from './monster';


console.clear();

class World implements IRender {

	_world : string[][];
	_entity : any[];
	private _isGenerated : boolean;

	constructor(){
		this._world = Array(16).fill('').map(() => Array(64).fill(ElementWorld.BACKGROUND));
		this._entity = [];
		this._isGenerated = false;
	}

	private initEntity(){
		this._entity.forEach(e => {
			if (e instanceof Monster) {
				this.setPos(e.position.x, e.position.y, ElementWorld.MONSTER);
			} else {
				this.setPos(e.position.x, e.position.y, ElementWorld.MARIO);
			}
			e.init();
		});
	}

	addEntity(entity: any) {
		this._entity.push(entity);
		return this;
	}

	isGenerated(): boolean {
		return this._isGenerated;
	}

	getPos(x: number, y: number): string|undefined {
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

	generate(): void {
		for(let x = 0; x < this._world.length; x++){
			for(let y = 0; y < this._world[x].length; y++){
				if (x > 13 && x < 17) {
					this.setPos(x, y, ElementWorld.FLOOR);
				}

				if (x === 10 && y === 22) {
					this.setPos(x, y, ElementWorld.BONUS);
				}

				if (x === 10) {
					if ([32, 33, 34, 35, 36, 37, 38].includes(y)) {
						const character = (y % 2 === 0) ? ElementWorld.FLOAT_PLAT : ElementWorld.BONUS;
						this.setPos(x, y, character);
					}
				}

				if (x === 6 && y === 35) {
					this.setPos(x, y, ElementWorld.BONUS);
				}

				if (x === 13 && y === 8) {
					this.setPos(x, y, ElementWorld.MARIO);
				}
			}
		}
		this._isGenerated = true;
		this.initEntity();
	}

	render(): string {
		console.clear();
		return this._world.join('\n').replaceAll(',', '') + '\n' + ElementWorld.LEXIQUE;
	}

};

export default World;
