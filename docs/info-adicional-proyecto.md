# Información adicional del proyecto

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [¿De dónde surge la idea?](#mag-%C2%BFde-d%C3%B3nde-surge-la-idea)
- [¿Cuál es la idea general del funcionamiento?](#bulb-%C2%BFcu%C3%A1l-es-la-idea-general-del-funcionamiento)
- [Implementación](#desktop_computer-implementaci%C3%B3n)
- [Tecnologías a utilizar](#wrench-tecnolog%C3%ADas-a-utilizar)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## :mag: ¿De dónde surge la idea?

La idea surge de que muchas personas necesitan un sistema rápido y sencillo de utilizar
para gestionar el vocabulario de una lengua. También, muchas de ellas creen que es conveniente
y práctico tener un sistema de gestión al que puedan acceder en cualquier momento.

## :bulb: ¿Cuál es la idea general del funcionamiento?

La idea principal es, como se ha comentado anteriormente, facilitar la gestión de
vocabulario. Para ello, se pretende que se pueda almacenar en un
**sistema de almacenamiento** las palabras o expresiones que se quieran aprender, asignándoles
una categoría (sustantivo, adjetivo, verbo, etc.), y permitiendo insertar junto a ellas
una serie de definiciones o traducciones, las cuáles serán *descripciones de la palabra*.

Posteriormente, se podrán modificar estas descripciones, añadiendo o quitando
definiciones o traducciones, y se permitirá consultar palabras concretas para obtener
las descripciones, o bien todas las palabras de una categoría, si quiere dedicar un tiempo
a aprender, por ejemplo, los verbos que tiene guardados.

También se podrán eliminar las palabras cuando se crea conveniento, como por ejemplo sería
el caso de que ya han sido aprendidas.

## :desktop_computer: Implementación

Se va a implementar el sistema en **Node.js**. Se usará una base de datos no relacional
para almacenar las palabras, ya que no es información que por sí misma se pueda considerar
estructurada. Se utilizará alguna como por ejemplo *MongoDB*.

Al ser un microservicio, se tiene en mente que toda la comunicación se pueda hacer mediante
una arquitectura **REST**, lo cuál implicará utilizar las cabeceras y peticiones típicas de
*HTTP* para comunicarse con el sistema.

## :wrench: Tecnologías a utilizar

En este proyecto se van a utilizar las siguientes tecnologías, tanto para su desarrollo como
para su posterior despliegue:

- [Node.js](https://nodejs.org/en/): Como se ha dicho antes, se desarrollará el servicio en este lenguaje.
Se usará además el gestor de paquetes que viene incluído con él, **npm**.
- [Express](http://expressjs.com/): Es el *framework* para desarrollar aplicaciones web que
se va a utilizar, debido a que permite desarrollar aplicaciones de forma sencilla y rápida.
Además de eso, es *open source* y dispone de una amplia documentación.
- [Jest](https://jestjs.io/): Es el *framework* de tests que se usará para hacer *unit testing*
a las funcionalidades que se irán incluyendo en el microservicio. Se ha elegido porque es
*open source* y hay mucha documentación disponible.
- [MongoDB](https://www.mongodb.com/): Será la base de datos a utilizar. Se ha elegido porque es
*no relacional*, basada en documentos, *open source* y tiene una amplia documentación, además de
que se puede usar con una gran variedad de lenguajes.
- Para gestionar los *logs*, se utilizará [Logstash](https://www.elastic.co/es/products/logstash)
combinado con [Winston](https://www.npmjs.com/package/winston). De ser necesario, se añadirán más
sistemas para gestionar *logs* más adelante, y se indicará aquí.
- [JSDoc](https://www.npmjs.com/package/jsdoc): Para generar la documentación se utiliza esta API,
la cuál es fácil de instalar y utilizar, además de que es open source.
- Para la integración contínua se utilizarán dos sistemas: [Travis CI](https://travis-ci.org/) y
[Circle CI](https://circleci.com/). [Aquí](https://github.com/Vol0kin/VocabulaRBy/blob/master/docs/extra-doc/razones-travis-circle.md)
se pueden ver los motivos por los que se han elegido.
- [Docker](https://www.docker.com/): Se utilizará para crear *containers*, en los cuáles se ejecutará
la aplicación.
- Para el despliegue en la nube, se usarán [Heroku](https://www.heroku.com/) e, idealmente,
[Azure](https://azure.microsoft.com/es-es/).

