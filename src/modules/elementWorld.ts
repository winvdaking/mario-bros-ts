class ElementWorld {

	static readonly FLOOR : string = '#';
	static readonly BONUS : string = '?';
	static readonly FLOAT_PLAT : string = '=';
	static readonly MARIO : string = 'M';
	static readonly MONSTER : string = '@';

	lexique(){
		return `
		# : Représente le sol
		M : Représente Mario
		@ : Représente un Goomba
		= : Représente un bloc
		? : Représente un bloc magique avec un item (en dev)
		<- : Pour que Mario marche vers la gauche
		-> : Pour que Mario marche vers la droite
		CTRL+C : Pour arrêter la partie`;
	}
};

export default ElementWorld;