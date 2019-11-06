# Información extra sobre los tests

## ¿Qué es lo que se está testeando?

En el proyecto se está testeando la clase VocManager, cuya documentación
puede ser accedida desde la documentación principal. Esta clase va a ser un puente
entre la API REST que se va a desarrollar más adelante y la estructura de datos (la
clase Vocabulary, la cuál puede ser consultada [aquí](https://vol0kin.github.io/VocabulaRBy/Vocabulary.html)).
De esta forma, todas las peticiones que le lleguen a la API REST serán redirigidas a
esta clase de gestión mediante una llamada a un método. Así, lo que verdaderamente se
encargará de utilizar la estructura de datos es la clase de gestión, desacoplando por
tanto la funcionalidad real de la API REST y facilitando el mantenimiento del código.

## ¿Cómo se están llevando a cabo los tests?

Se sabe que se pretende que toda la información se guarde en una base de datos. Sin
embargo, para testear algunas operaciones muy básicas, se pueden realizar operaciones
sobre ficheros de texto. Esto tiene sus desventajas, y es que en un futuro se tendrá
que reescribir tanto la funcionalidad como los tests. Pero como de momento solo
interesa probar algunas cosas muy básicas como por ejemplo crear una nueva entrada
en lo que en el futuro será la base de datos, recuperarla según si se busca obtener
un elemento en específico o todos aquellos del mismo tipo y modificar la descripción
de una palabra que forma parte del vocabulario, los ficheros de texto serán suficientes.

Funcionalidades un poco más avanzadas como por ejemplo eliminar un elemento del
sistema de almacenamiento o modificarlo ya sí que necesitarían una base de datos
como tal, debido a que estas operaciones se pueden realizar de forma más sencilla
ahí que con ficheros.

## ¿Qué tests se están llevando a cabo?

De momento, se está testeando lo siguiente:

- Que se guarde un elemento con éxito.
- Que, al intentar guardar vocabulario con un tipo no permitido, no se guarde.
- Que se pueda recuperar vocabulario asociado a una palabra en concreto.
- Que se pueda recuperar vocabulario asociado a un conjunto de palabras del mismo tipo.
- Que se pueda cambiar la descripción que tiene el vocabulario asociado a una palabra de un tipo.
