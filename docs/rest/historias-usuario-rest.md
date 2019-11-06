# ¿Cómo se ajusta la API REST a las historias de usuario?

Como bien sabemos, hay una serie de requisitos que la API REST y el microservicio
en general deben cumplir, los cuáles pueden verse [aquí]().

Para ello, la API REST se ha diseñado de forma que sea sencilla de
utilizar y para que permita llevarlos a cabo de una manera bastante
intuitiva:

- El método `PUT` permitiría la creación de un nuevo elemento de vocabulario,
especificando en la ruta el elemento a crear y pasando en el cuerpo del mensaje
la descripción.
- Los dos métodos `GET` cumplen con la función de obtener, o bien una palabra
en concreto de un tipo determinado (si es que existe), o bien todas las palabras
de un determinado tipo, si es que hay alguna creada.
- El método `POST` permite la modificación de un vocabulario asociado a una palabra
de un tipo en concreto pasando la nueva descripción en el cuerpo del mensaje
a enviar.
- El método `DELETE` permite eliminar el vocabulario asociado a una palabra de
un tipo en concreto.
