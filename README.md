# VocabulaRBy

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## :thinking: ¿Qué es VocabulaRBy?

VocabulaRBy pretende ser un microservicio que permita la gestión de vocabulario
a la hora de aprender una lengua.

## :sunglasses: ¿Por qué VocabulaRBy?

Cuando se aprende una nueva lengua, además de la gramática, una parte muy importante
es el vocabulario. Gestionar y almacenar el vocabulario que se quiere aprender por medios
convencionales es costoso e ineficiente, ya que buscar una palabra o expresión concreta u
organizar el vocabulario por categorías lleva un tiempo considerable.

## :mag: ¿De dónde surge la idea?

La idea surge de que muchas personas necesitan un sistema rápido y sencillo de utilizar
para gestionar el vocabulario de una lengua. También, muchas de ellas creen que es conveniente
y práctico tener un sistema de gestión al que puedan acceder en cualquier momento.

## :bulb: ¿Cuál es la idea general del funcionamiento?

La idea principal es, como se ha comentado anteriormente, facilitar la gestión de
vocabulario. Para ello, se pretende que el usuario sea capaz de almacenar en un
**sistema de almacenamiento** las palabras o expresiones que quiera aprender, asignándoles
una categoría (sustantivo, adjetivo, verbo, etc.), y permitiendo insertar junto a ellas
una serie de definiciones o traducciones, las cuáles serán *descripciones de la palabra*.

Posteriormente, el usuario podrá modificar estas descripciones, añadiendo o quitando
definiciones o traducciones, y se le permitirá consultar palabras concretas para obtener
las descripciones, o bien todas las palabras de una categoría, si quiere dedicar un tiempo
a aprender, por ejemplo, los verbos que tiene guardados.

El usuario también podrá eliminar las palabras cuando crea que ya no necesita que estén en
su lista de palabras por aprender, debido a que por ejemplo ya las ha aprendido.

## :desktop_computer: Implementación

Se va a implementar el sistema en **Node.js**. Se usará una base de datos no relacional
para almacenar las palabras, ya que no es información que por sí misma se pueda considerar
estructurada. Se utilizará alguna como por ejemplo *MongoDB*.

Al ser un microservicio, se tiene en mente que toda la comunicación se pueda hacer mediante
una arquitectura **REST**, lo cuál implicará utilizar las cabeceras y peticiones típicas de
*HTTP* para comunicarse con el sistema.
