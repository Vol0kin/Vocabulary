# Descripción de la configuración de las tecnologías

## Configuración de la herramienta de construcción

La herramienta de construcción que se está utilizando en el proyecto es `npm`.
Estrictamente hablando `npm` no es una herramienta de construcción, pero tiene
características que hacen que parezca una.

A continuación se puede ver un ejemplo de *package.json*, el cuál se corresponde
con el del proyecto. Este archivo es utilizado por `npm` para instalar las dependencias
y configurar el entorno de trabajo.

```javascript
{
  "name": "vocabularby",
  "version": "0.1.0",
  "description": "Microservice that manages vocabulary.",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Vol0kin/VocabulaRBy.git"
  },
  "author": "Vladislav Nikolov Vasilev <vladis890@gmail.com>",
  "license": "GPL-3.0",
  "bugs": {
    "url": "https://github.com/Vol0kin/VocabulaRBy/issues"
  },
  "homepage": "https://github.com/Vol0kin/VocabulaRBy#readme",
  "devDependencies": {
    "jest": "^24.9.0",
    "jsdoc": "^3.6.3"
  },
  "dependencies": {
    "doctoc": "^1.4.0",
    "express": "^4.17.1",
    "mongodb": "^3.3.2",
    "winston": "^3.2.1"
  }
}
```

Se puede ver que en este archivo se describe la configuración del proyecto, como
por ejemplo el nombre que tiene, la versión, una descripción del proyecto, el
repositorio del proyecto, si tiene uno, y el autor. Es muy interesante ver que el archivo
permite especificar la licencia que tiene el proyecto, las dependencias que tiene
el proyecto (lo cuál viene especificado por `dependencies`, y las dependencias
de desarrollo, que vienen dadas por `devDependencies`, donde se especifican
dependencias para generar documentación, para marcos de test, etc.

Conociendo estas dependencias, `npm` se encargará de instalarlas y de crear el
directorio `node_modules`, donde se podrán encontrar.


## Configuración de TravisCI

Un ejemplo de la configuración de Travis se puede ver a continuación:

```yaml
language: node_js
node_js:
  - 8
  - 10
  - 11
  - 12
```

Lo que estamos especificando es que el lenguaje que se va a utilizar es Node.JS,
y que las versiones del lenguaje que se usarán para testear serán la 8 (una versión antigua),
la 10 (la versión LTS actual), la 11 (una experimental) y la 12 (la última versión).
El resto de cosas no se han especificado debido a que se han escogido
las opciones por defecto.

Lo primero que hace Travis es utilizar `nvm` para instalar las versiones del lenguaje
correspondiente. Por tanto, se instalarán tantas versiones del lenguaje como se le
hayan especificado.

Por defecto, para instalar las dependencias especificadas en el
*package.json* TravisCI utiliza la orden `npm install`. Sin embargo, si la versión de `npm` es
lo suficientemente moderna, se instalará utilizando `npm ci`. Se diferencia en que
este segundo comando se utiliza para instalar todas las dependencias del proyecto a
la vez utilizando el *package-lock.json*. [Aquí](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci)
se puede ver más información sobre las diferencias.

Para ejecutar los tests, por defecto se ejecuta `npm test`. Esto depende de que en
el *package.json* tenga definido que marco de tests se ejecutará. En este caso, se
utiliza Jest.

## Configuración de CircleCI

Un ejemplo de la configuración de CircleCI se puede ver a continuación:

```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:lts
    working_directory: ~/VocabulaRBy
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install .
      - run:
          name: Test
          command: npm test
```

Al principio se especifica que versión de CircleCI utilizar. En este caso, se ha
elegido la última, la 2.1. Después se indica una serie de tareas o *jobs* que
se tienen que lleva a cabo. En este caso, se define una que se llama `build`, que
es donde se ejecutarán los tests.

Primero se especifica una imagen de docker que utilizar. En este caso, se utiliza
una de Circle la cuál contiene la última versión LTS de Node. Después, se define
el directorio de trabajo con `working_directory`. A continuación vienen una serie de
pasos que se deben hacer. El que más llama la atención es el primero, `checkout`,
el cuál sirve para llevar el código fuente al directorio de trabajo especificado
anteriormente en `working_directory`. Si no se especifica ningún valor, se
hace en uno llamado `~/project`. Finalmente se instalan las dependencias y se
ejecutan los tests utilizando `npm`.
