# Integración con Docker

## Definición de la imagen de Docker

Para crear una imagen de Docker, lo primero que tenemos que hacer es crear
un archivo `Dockerfile` en nuestro proyecto, preferentemente en el directorio
raíz de éste (aunque siempre puede estar en algún subdirectorio).

El `Dockerfile` de este proyecto puede consultarse [aquí](https://github.com/Vol0kin/Vocabulary/blob/master/Dockerfile),
pero en esta página de documentación vamos a ir comentando lo que hace este archivo.

```Dockerfile
FROM node:lts-alpine3.10
```

Indica la imagen base de la que vamos a partir. En este caso, es una imagen
de Node. La versión está indicada en la primera parte de la etiqueta `lts-alpine3.10`.
En este caso, es la versión LTS y, actualmente, ésta es la versión 12. La segunda parte
de la etiqueta indica el sistema operativo base. Se ha escogido Alpine en su versión 3.10,
ya que con Alpine se pueden crear imágenes muy ligeras, muchísimo más que si se
usase por ejemplo Ubuntu o Debian.

```Dockerfile
WORKDIR /app
```

Establece que el directorio de trabajo va a ser `/app`. Se ha decidido hacer esto porque
es una práctica habitual tener un directorio para nuestra aplicación, en vez de tener
todos los archivos en el directorio raíz.

```Dockerfile
COPY src ./src
```

Copia el directorio `src` del proyecto y todo su contenido en el en el directorio `./src` de la imagen,
creando dicho directorio en el proceso. Esto nos evita tener que realizar antes la creación
del directorio.

```Dockerfile
COPY package.json .
```

Copia el archivo `package.json` del proyecto en el directorio de trabajo de la imagen
con el mismo nombre que el archivo original. Es necesario copiarlo ya que todas
las dependencias del proyecto están especificadas en él, y se tienen que instalar
utilizando este archivo.

```Dockerfile
COPY gulpfile.js .
```

Copia el archivo utilizado por la herramienta de construcción `gulpfile.js` dentro de
la imagen con el mismo nombre que el archivo original. Este archivo contiene las tareas
que puede realizar la herramienta, y se utilizará más adelante.

```Dockerfile
RUN npm install
```

Instala las dependencias del proyecto, las cuáles se encuentran en el `package.json`
anteriormente copiado.

```Dockerfile
RUN npm install -g gulp
```

Instala la herramienta de construcción de forma global. Es necesario hacerlo de esta forma
porque, a pesar de que el `package.json` contiene módulos de `gulp` que deben ser instalados,
da problemas si no se instala de forma global.

```Dockerfile
CMD ["gulp", "start-node"]
```

Ejecuta el comando `gulp start-node`. Se usa `CMD` porque este será el comando principal
que se ejecute cuando la imagen de Docker se ejecute sin pasarle ningún parámetro. Se
encarga de iniciar la aplicación utilizando `node` por debajo, sin ningún gestor
de procesos como podría ser PM2.

## Creación y ejecución de la imagen

Una vez creado el `Dockerfile`, para crear la imagen, hace falta ejecutar la siguiente
orden:

```sh
docker build -t vocabulary .
```

La orden `docker build` construye la imagen. Adicionalemnte, le podemos especificar
el *tag* que va a tener con la opción `-t nombre_tag`. El argumento `.` indica
que se va a buscar el `Dockerfile` en el directorio actual.

Para ejecutar la imagen, simplemente basta con ejecutar la siguiente orden:

```sh
docker run -p 8080:8080 vocabulary
```

De esta manera, ejecutamos la imagen que hemos creado con el *tag* `vocabulary`,
y mapeamos el puerto 8080 de la aplicación al 8080 real.
