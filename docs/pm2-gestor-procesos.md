# Gestor de procesos: PM2

Vocabulary utiliza el gestor de procesos [PM2](https://pm2.keymetrics.io/),
el cuál es uno de los más famosos y utilizados para Node. Se ha elegido
por la sencillez de uso y por lo fácil que es de configurar.

En el proyecto, se utiliza PM2 para arrancar, parar, reiniciar y recargar
el proceso, tal y como se puede ver en las tareas de `gulpfile.js`. A
continuación se van a desglosar las órdenes de PM2 que se utilizan en cada
tarea, para que se tenga una idea de lo que hace cada una de las tareas de
`gulp`:

- `pm2 start src/index.js -i 4 --name Vocabulary` permite iniciar el gestor
de tareas con el archivo `src/index.js`, el cuál contiene la parte ejecutable
(digamos la parte del servidor) del microservicio. Se inician 4 procesos y se
les asigna de nombre *Vocabulary* (el nombre del proyecto), con el objetivo de
facilitar operaciones posteriores sobre este grupo de procesos, ya que se tendrá
un nombre que los identifique.
- `pm2 stop Vocabulary` para el microservicio, deteniendo todos los procesos
asociados a *Vocabulary*. Es preferible hacerlo de esta forma, utilizando el
identificador asignado a la hora de crear los procesos, ya que si se usase `all`
en su lugar, se podría dar el caso de que se detengan procesos externos.
- `pm2 restart Vocabulary` mata todos los procesos y los vuelve a iniciar. Este
método hace, por tanto, que durante un momento no haya ningún proceso activo,
con lo cuál el microservicio deja de funcionar brevemente.
- `pm2 reload Vocabulary` reinicia el microservicio reiniciando cada tarea de
forma individual. Por tanto, a diferencia de `restart`, el microservicio
no llega a estar inactivo. Para más información, consulta
[esta pregunta](https://stackoverflow.com/questions/44883269/what-is-the-difference-between-pm2-restart-and-pm2-reload).
