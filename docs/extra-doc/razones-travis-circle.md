# ¿Por qué se han elegido Travis y Circle para la integración?

Como primer sitio de integración continua se ha elegido Travis porque es de los más
famosos y utilizados. También es fácil de configurar y entender, tiene mucha documentación
y ayudas para crear entornos de test propios, está muy bien integrado con GitHub y permite
realizar tests modificando múltiples parámetros a la vez (probar el mismo código con múltiples
versiones del mismo lenguaje a la vez o con múltiples sistemas operativos, por ejemplo).
Es un sistema de integración bastante potente y flexible, además de que con muy pocas líneas
de configuración se pueden hacer muchas cosas. Las únicas limitaciones que
tiene son que es un poco lento en general (sobre todo el *set-up* del entorno) y que
no permite hacer pruebas con Windows.

Como segundo sitio de integración continua se ha elegido Circle por unos motivos muy parecidos
a los de Travis; es decir, tiene mucha documentación, es relativamente fácil de utilizar y configurar
y está muy bien integrado con GitHub. Como principal ventaja respecto a Travis es que el *set-up* del
entorno de trabajo es bastante más rápido. Sin embargo, si bien es cierto que la configuración del
entorno se hace en YAML, es un poco más tediosa de hacer que con Travis, ya que hay que
poner de forma explícita cada paso que se tiene que ejecutar.
