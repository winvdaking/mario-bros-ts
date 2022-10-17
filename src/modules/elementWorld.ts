class ElementWorld {

	static FLOOR : string = '#';
	static BONUS : string = '[?]';
	static FLOAT_PLAT : string = '_';

	lexique(){
		return `
		# : Représente le sol
		M : Représente Mario
		@ : Représente un Goomba
		= : Représente un bloc
		? : Représente un bloc magique avec un item (en dev)`;
	}
};

export default ElementWorld;