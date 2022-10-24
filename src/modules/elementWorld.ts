export default class ElementWorld {

	static readonly FLOOR : string = '#';
	static readonly BONUS : string = '?';
	static readonly FLOAT_PLAT : string = '=';
	static readonly MARIO : string = 'M';
	static readonly MONSTER : string = '@';
	static readonly ITEM : string = '*';

	static readonly LEXIQUE : string =
`		** Mario Bros (by Théo & Dorian) **
+--------------------------------------------------------------+
| # : Représente le sol					       |
| M : Représente Mario					       |
| @ : Représente un Goomba				       |
| = : Représente un bloc				       |
| ? : Représente un bloc magique avec un item (en dev)         |
| <- : Pour que Mario marche vers la gauche	     	       |
| -> : Pour que Mario marche vers la droite		       |
| SPACE : Pour que Mario saute verticalement	 	       |
| CTRL+C : Pour arrêter la partie			       |
+--------------------------------------------------------------+`;
};