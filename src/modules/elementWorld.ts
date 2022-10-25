
import chalk  from 'chalk';
export default class ElementWorld {

	static readonly FLOOR : string = chalk.hex('#027100')('#');
	static readonly BONUS : string = chalk.bgBlue('?');
	static readonly FLOAT_PLAT : string = chalk.bgBlue('=');
	static readonly MARIO : string = chalk.bgBlue(chalk.red('M'));	
	static readonly MONSTER : string = chalk.bgBlue(chalk.hex('#cb610d')('@'));
	static readonly ITEM : string = chalk.bgBlue(chalk.hex('#fff705')('*'));

	static readonly LEXIQUE : string =
`		** Mario Bros (by Théo & Dorian) **
+--------------------------------------------------------------+
| ${ElementWorld.FLOOR} : Représente le sol					       |
| ${chalk.red(chalk.reset(ElementWorld.MARIO))} : Représente Mario					       |
| ${ElementWorld.MONSTER} : Représente un Goomba				       |
| ${ElementWorld.FLOAT_PLAT} : Représente un bloc				       |
| ${ElementWorld.BONUS} : Représente un bloc magique avec un item                  |
| ${ElementWorld.ITEM} : Représente un item (une étoile)	  		       |
| <- : Pour que Mario marche vers la gauche	     	       |
| -> : Pour que Mario marche vers la droite		       |
| SPACE : Pour que Mario saute verticalement	 	       |
| CTRL+C : Pour arrêter la partie			       |
+--------------------------------------------------------------+`;
};