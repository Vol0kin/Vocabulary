# Descripción de la configuración de las herramientas de construcción

En esta sección se describe cómo se ha realizado la configuración de las herramientas
de construcción del proyecto. Estas herramientas son TravisCI y CircleCI, cuyas razones
de uso pueden ser consultadas desde el documento principal.

Es importante destacar que las dos herramientas de integración continua testean cosas diferentes:

- TravisCI testea la clase principal y la API REST.
- CircleCI testea que se puede iniciar y parar el microservicio con éxito.

## Configuración de TravisCI

Lo primero que hay que hacer al configurar la herramienta es indicar el lenguaje
a utilizar. En nuesto caso, al utilizar Node, tenemos que indicar lo siguiente:

```yaml
language: node_js
```

Después de eso, se indican las versiones del lenguaje con las que se va a testear de
la siguiente forma:

```yaml
node_js:
  - 8
  - 10
  - 11
  - 12
```

En este caso, se han escogido las versiones 8 (una versión antigua),
10 (la versión LTS actual), 11 (una experimental) y 12 (la última versión), para
tener cierta variedad a la hora de testear.

Ahora, antes de realizar la instalación de las dependencias del proyecto, instalamos
`gulp` de forma global, para poder utilizarlo luego para ejecutar los tests y para
obtener la cobertura de los tests. Para indicárselo a Travis, simplemente basta con
poner la siguiente línea:

```yaml
before_install:
  - npm install -g gulp
```

Ahora vendría la parte de instalación, pero se ha escogido la opción por
defecto que ofrece Travis, ya que esta es `npm install` o `npm ci` si la versión
de `npm` es lo suficientemente moderna. La diferencia es que el primero utiliza
`package.json` y el segundo utiliza `package-lock.json`. Para conocer más sobre
las diferencias entre ambos, se puede consultar
[este enlace](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci).

Para especificar lo que se quiere ejecutar como test, se ha hecho de la siguiente forma:

```yaml
script:
  - gulp test
  - gulp coveralls
```

De esta forma, se ejecutan los tests y, con la salida que generan, se obtiene la
cobertura de los tests, la cuál puede ser consultada desde el documento principal.
En caso de no haber especificado nada en la sección `script`, se hubiese ejecutado
`npm test`, ya que es la opción por defecto.

## Configuración de CircleCI

La configuración de CircleCI se puede consultar en la página principal del proyecto.
Aquí se va a desglosar para entender qué es lo que se está haciendo.

Primero se indica la versión de CircleCI a utilizar. Se ha escogido la última versión,
ya que es la más actual:

```yaml
version: 2.1
```

A continuación, se especifican los trabajos que se deben realizar. Indicamos que
el trabajo a realizar se llama `build`, y especificamos que tiene que usar una imagen
de Docker de Node de la versión LTS. Se utiliza solo una versión en este caso, ya que
probar múltiples versiones es un proceso más difícil que en Travis, debido a que se
tendrían que configurar las imágenes manualmente. También establecemos el directorio
de trabajo, que es donde se realizarán todas las operaciones. Esto se puede ver
en el siguiente trozo del archivo de configuración:

```yaml
jobs:
  build:
    docker:
      - image: circleci/node:lts
    working_directory: ~/Vocabulary
```

Ahora se tienen que especificar los pasos de la tarea, así que se van a comentar uno
por uno.

```yaml
    steps:
      - checkout
```

Se indica que los fuentes clonados se tienen que llevar al directorio de trabajo
especificado anteriormente. Si no se especificase nada en `working_directory`, se
llevarían a `~/project`.

```yaml
      - run:
          name: Install GULP
          command: sudo npm install -g gulp
```

Se instala `gulp`. Se tiene que utilizar `sudo` para obtener los privilegios
necesarios si se quiere instalar de forma global. Esto es así porque la imagen
de Docker utiliza un usuario que no tiene permisos de root.

```yaml
      - run:
          name: Install pm2
          command: sudo npm install -g pm2
```

Se instala PM2, utilizando de nuevo `sudo` para tener los permisos necesarios.

```yaml
      - run:
          name: Install dependencies
          command: npm install .
```

Se instalan las dependencias del proyecto utilizando el `package.json` que
se puede encontrar en el directorio de trabajo.

```yaml
      - run:
          name: Start pm2
          command: gulp start
```

Se inicia el microservicio con `gulp`, el cuál por debajo utiliza pm2.

```yaml
      - run:
          name: Stop pm2
          command: gulp stop
```

Se para el microservicio con `gulp`, el cuál por debajo utiliza pm2.

Si todo hasta aquí ha ido bien, la build será correcta, y por tanto, ésta
pasará.