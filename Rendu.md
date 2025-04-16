## 1 Initialisation du projet et installation d'ESLint 
On crée notre dossier et on initialise notre git et npm.

On installe et configure eslint : 
- √ What do you want to lint? · javascript
- √ How would you like to use ESLint? · problems
- √ What type of modules does your project use? · esm
- √ Which framework does your project use? · none
- √ Does your project use TypeScript? · no / yes
- √ Where does your code run? · node                                                

Le config que tu as sélectionnée nécessite les dépendances suivantes :

- eslint, @eslint/js, globals

- √ Would you like to install them now? · No / Yes
- √ Which package manager do you want to use? · npm

☕️ Installation en cours...

added 1 package, changed 1 package, and audited 89 packages in 881ms

23 packages are looking for funding
  run `npm fund` for details

Puis on crée notre `.gitignore`: 
node_modules/ .eslintcache


## 2 Test d’ESLint sur un fichier JavaScript 
On crée notre `app.js` et lance `npx eslint app.js` :
On voit une erreur d'indentation remonter et deux warnings liés au `console.log`.

On utilise alors `npx eslint --fix app.js` et l'erreur n'est ensuite plus présente, donc dans ma fonction, la ligne est bien indentée toute seule.

## 3 Intégration avec Git Hooks (Husky)  
On installe Husky : 
npm install husky --save-dev npx husky install

Problème avec le pre-commit : `npx husky add .husky/pre-commit "npx eslint ."` car `add` est déprécié, il faut donc utiliser `echo` ou écrire directement dans le fichier.

On teste ensuite un commit et on est bien bloqué avec notre message : `Expected indentation of 2 spaces but found 0`.

## 4 Configuration avancée d’ESLint 
On ajoute le json. Problème, le fichier qu'on a est un mjs donc on convertit notre json en mjs et on ajoute notre ligne `"lint": "eslint ."` dans notre `package.json`, puis on teste avec `npm run lint`. On verra bien notre erreur et 2 warning ressortir.

## 5 Mise en place de GitHub Actions 
On ajoute un workflow CI en créant : ./github/workflows/lint.yml
avec le code fourni dans le TP
On le pousse sur github et on voit dans Action qu'un workflow et créer on voit bien une erreur, lié a l'indentation.

