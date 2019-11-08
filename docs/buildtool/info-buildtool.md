# Información adicional sobre la _buildtool_

Como *buildool* se ha elegido `gulp`, una herramienta de
construcción sencilla de utilizar y muy potente. Para obtener
más información sobre esta, se recomienda visitar la [página principal](https://gulpjs.com/).

Para este proyecto, la *buildtool* se ha utilizado para facilitar los procesos
de testing, generación de la documentación, obtención de cobertura
de los tests e inicialización, reinicio y parada del microservicio
mediante el gestor de tareas [PM2](https://pm2.keymetrics.io/),
escogido porque es el gestor de tareas más famoso y usado para
Node.

## ¿Cómo usar la _buildtool_ con el proyecto?

Para usar `gulp` con este proyecto, tenemos que situarnos en el
nivel raíz del directorio donde está clonado el proyecto, donde está
definido el archivo `gulpfile.js` con las tareas de `gulp`. Este archivo
con las tareas puede ser consultado [aquí](https://github.com/Vol0kin/Vocabulary/blob/master/gulpfile.js).

Las tareas que soporta son las siguientes:

* `gulp test`: Ejecuta los tests que se encuentran en `test/`.
* `gulp coveralls`: Se tiene que ejecutar después de `gulp test`, y permite
obtener cobertura del código.
* `gulp start`: Inicia el microservicio utilizando PM2.
* `gulp restart`: Reinicia el microservicio, matando el proceso que se está ejecutando
e iniciandolo de nuevo. Para ello utiliza PM2.
* `gulp reload`: Reinicia el microservicio sin matarlo mediante PM2. Es más eficiente
que `gulp restart`.
* `gulp stop`: Para el microservicio mediante PM2.
* `gulp doc`: Genera la documentación de los archivos fuentes encontrados en
el directorio `src/`, donde está tanto la clase de gestión como la API REST, entre
otros. Para generarla, hace uso de [JSDoc](https://jsdoc.app/about-getting-started.html)
y [apiDoc](https://apidocjs.com/).
