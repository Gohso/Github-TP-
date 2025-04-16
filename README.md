# TP – Mise en place d'ESLint avec Git et GitHub Actions

## 1. Initialisation du projet et installation d'ESLint

On commence par créer notre dossier, puis on initialise Git et npm :

```bash
git init
npm init -y
```

Ensuite, on installe et configure ESLint avec la commande suivante :

```bash
npx eslint --init
```

Réponses données lors de la configuration :

- √ What do you want to lint? · **javascript**
- √ How would you like to use ESLint? · **problems**
- √ What type of modules does your project use? · **esm**
- √ Which framework does your project use? · **none**
- √ Does your project use TypeScript? · **no / yes**
- √ Where does your code run? · **node**

Le config choisi nécessite les dépendances suivantes :

- `eslint`
- `@eslint/js`

Installation :

```bash
npm install
```

> ☕️ Installation en cours...

```bash
added 1 package, changed 1 package, and audited 89 packages in 881ms

23 packages are looking for funding
run `npm fund` for details
```

On crée ensuite notre fichier `.gitignore` :

```
node_modules/
.eslintcache
```

---

## 2. Test d’ESLint sur un fichier JavaScript

On crée un fichier `app.js` avec un peu de code, puis on exécute :

```bash
npx eslint app.js
```

On constate une **erreur d'indentation** et **deux warnings** liés à `console.log`.

Pour corriger automatiquement :

```bash
npx eslint --fix app.js
```

L’erreur disparaît : la ligne est bien indentée automatiquement.

---

## 3. Intégration avec Git Hooks (Husky)

Installation de Husky :

```bash
npm install husky --save-dev
npx husky install
```

Problème avec la commande `npx husky add .husky/pre-commit "npx eslint ."` car `add` est déprécié.  
On utilise donc `echo` ou on écrit directement dans le fichier `.husky/pre-commit`.

Exemple :

```bash
mkdir .husky
echo "npx eslint ." > .husky/pre-commit
chmod +x .husky/pre-commit
```

Ensuite, on teste un commit.  
On est bien bloqué par Husky avec le message :

```
Expected indentation of 2 spaces but found 0
```

---

## 4. Configuration avancée d’ESLint

Le fichier de config est un `.mjs`, donc on adapte notre configuration.  
On ajoute une commande personnalisée dans le `package.json` :

```json
"scripts": {
  "lint": "eslint ."
}
```

Puis on lance :

```bash
npm run lint
```

Cela affiche bien notre erreur d’indentation ainsi que deux warnings.

---

## 5. Mise en place de GitHub Actions

On ajoute un workflow CI en créant le fichier :  
`.github/workflows/lint.yml`

Contenu du fichier :

```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run ESLint
        run: npm run lint
```

Une fois poussé sur GitHub, on voit apparaître le workflow dans l’onglet **Actions**,  
et une erreur est bien détectée (indentation).

---

## 6. Simulation d’un travail d’équipe

On crée une branche :

```bash
git checkout -b feature/ajout-fonction
```

On y ajoute un fichier `utils.js` avec du code non conforme (indentation et `console.log`).  
Lorsqu’on tente un commit :

```bash
git add .
git commit -m "Code non conforme"
```

On est bloqué par Husky, avec les erreurs suivantes :

```
C:\Users\hugot\Gohso\TP Github\tp-eslint-git\Github-TP-\app.js
  2:1  warning  Unexpected console statement                  no-console
  4:1  warning  Unexpected console statement                  no-console
  4:1  error    Expected indentation of 2 spaces but found 0  indent

C:\Users\hugot\Gohso\TP Github\tp-eslint-git\Github-TP-\utils.js
   4:1  error    Expected indentation of 2 spaces but found 4  indent
   5:1  error    Expected indentation of 0 spaces but found 2  indent
   7:1  error    Expected indentation of 0 spaces but found 2  indent
   8:1  error    Expected indentation of 2 spaces but found 4  indent
   8:5  warning  Unexpected console statement                  no-console
   9:1  error    Expected indentation of 2 spaces but found 4  indent
  10:1  error    Expected indentation of 0 spaces but found 2  indent
  12:1  error    Expected indentation of 0 spaces but found 2  indent
  13:1  error    Expected indentation of 2 spaces but found 4  indent
  14:1  error    Expected indentation of 0 spaces but found 2  indent
  16:1  error    Expected indentation of 0 spaces but found 2  indent
  17:1  error    Expected indentation of 0 spaces but found 2  indent

✖ 15 problems (12 errors, 3 warnings)
  12 errors and 0 warnings potentially fixable with the `--fix` option.
```

On corrige automatiquement avec :

```bash
npx eslint --fix
```

Il ne reste que les **3 warnings**.

On peut maintenant commit et push :

```bash
git add .
git commit -m "Code corrigé"
git push --set-upstream origin feature/ajout-fonction
```

Sur GitHub, une **Pull Request** est proposée : "Compare & pull request".

Lorsqu’on tente de fusionner, GitHub vérifie les conflits et exécute le **workflow GitHub Action**.  
Celui-ci valide qu’il n’y a **pas d’erreurs** avant de fusionner sur la branche `main`.

Tout est bien fonctionnel.

On va essayer avec le code du professeur contenant plus d'erreur mais le resultat va être le même, et les commandes aussi. Celà montre la puissance de lint.

Donc on va modifier notre app.js et coller le code du prof.
Naivement on va essayer de le push. On est bien bloqué avec : 69 problems (59 errors, 10 warnings)
  59 errors and 0 warnings potentially fixable with the `--fix` option.
On va donc utiliser la commande fix pour regler cela automatiquement : npx eslint --fix
On voit donc maintenant : ✖ 10 problems (0 errors, 10 warnings)
On va donc push avec git push --set-upstream origin feature/ajout-fonction sur notre branch dans un premier temps. 
On arrive bien a push sur notre branch on va maintant la récupérer sur notre main et vérifier qu'il passe bien les test de notre workflows.
