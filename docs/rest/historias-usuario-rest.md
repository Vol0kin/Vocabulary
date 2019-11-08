# ¿Cómo se ajusta la API REST a las historias de usuario?

Como bien sabemos, hay una serie de requisitos que la API REST y el microservicio
en general deben cumplir, los cuáles pueden verse [aquí](https://vol0kin.github.io/Vocabulary/project-info/info-adicional-proyecto#cu%C3%A1l-es-la-idea-general-del-funcionamiento).

Para ello, la API REST se ha diseñado de forma que sea sencilla de
utilizar y para que permita llevar a cabo estos requerimientos de una manera
bastante intuitiva.

Las rutas del vocabulario tienen la estructura `/tipo/palabra`, donde
`tipo` es alguno de los permitidos y `palabra` la palabra que forma parte
del vocabulario. Estas rutas representan elementos individuales.
Sobre estas rutas, se pueden hacer las siguientes operaciones:

- **Crear un nuevo elemento del vocabulario.** Para ello, se tiene que enviar
una petición con el método `PUT` a la ruta `/tipo/palabra` deseada.
La descripción tiene que enviarse en el cuerpo de la petición.
- **Obtener un elemento del vocabulario.** Para ello, se tiene que enviar una
petición con el método `GET` a la ruta `/tipo/palabra` correspondiente.
- **Modificar la descripción de un elemento del vocabulario.** Para ello, se tiene que mandar
una petición con el método `POST` a la ruta `/tipo/palabra` correspondiente,
enviando la nueva descripción en el cuerpo del mensaje.
- **Eliminar un elemento del vocabulario.** Para ello, se tiene que mandar una
petición con el método `DELETE` a la ruta `/tipo/palabra` que se desee eliminar.
Después de eso, esa ruta dejará de estar disponible.

Para ajustarse a los requisitos, la API REST permite acceder a vocabulario
que tiene el mismo tipo, utilizando para ello rutas con la forma `/tipo`. Este tipo
de rutas permite **obtener un conjunto de vocabulario del mismo tipo**, si es que existe
alguno. Por tanto, la única petición que soporta es un `GET` a la ruta `/tipo`
correpsondiente, devolviendo como respuesta todos los elementos del vocabulario
que puedan ser encontrados con ese tipo.
