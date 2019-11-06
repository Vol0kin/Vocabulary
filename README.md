# VocabulaRBy

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.org/Vol0kin/VocabulaRBy.svg?branch=master)](https://travis-ci.org/Vol0kin/VocabulaRBy)
[![CircleCI](https://circleci.com/gh/Vol0kin/Vocabulary.svg?style=svg)](https://circleci.com/gh/Vol0kin/Vocabulary)
[![Coverage Status](https://coveralls.io/repos/github/Vol0kin/VocabulaRBy/badge.svg?branch=master)](https://coveralls.io/github/Vol0kin/VocabulaRBy?branch=master)

## Tabla de contenidos

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [¿Qué es Vocabulary?](#thinking-%C2%BFqu%C3%A9-es-vocabulary)
- [¿Por qué Vocabulary?](#sunglasses-%C2%BFpor-qu%C3%A9-vocabulary)
- [Quiero saber más del proyecto](#mag-quiero-saber-m%C3%A1s-del-proyecto)
- [Instalación del proyecto](#keyboard-instalaci%C3%B3n-del-proyecto)
- [Ejecución de los tests](#heavy_check_mark-ejecuci%C3%B3n-de-los-tests)
- [Integración continua](#repeat-integraci%C3%B3n-continua)
- [Herramienta de construcción](#building_construction-herramienta-de-construcci%C3%B3n)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## :thinking: ¿Qué es Vocabulary?

Vocabulary es un microservicio que permite la gestión de vocabulario
a la hora de aprender una lengua.

## :sunglasses: ¿Por qué Vocabulary?

Cuando se aprende una nueva lengua, además de la gramática, una parte muy importante
es el vocabulario. Gestionar y almacenar el vocabulario que se quiere aprender por medios
convencionales es costoso e ineficiente, ya que buscar una palabra o expresión concreta u
organizar el vocabulario por categorías lleva un tiempo considerable.

## :mag: Quiero saber más del proyecto

Si quieres tener más información sobre el proyecto, como por ejemplo de dónde surge la idea,
cómo se ha implementado y qué tecnologías utiliza, consulta
[esta parte](https://github.com/Vol0kin/Vocabulary/blob/master/docs/info-adicional-proyecto.md)
de la documentación.

## :keyboard: Instalación del proyecto

Para poder instalar y trabajar con el proyecto, se necesita tener instalado `node`, `npm` y `gulp`
en el equipo.

Teniéndolos instalados, nos situamos dentro del directorio raíz del proyecto e instalamos las dependencias
de este proyecto con la orden:

```bash
npm install .
```

## :heavy_check_mark: Ejecución de los tests

Para ejecutar los tests, situándonos en el directorio clonado, basta con hacer lo siguiente:

```bash
gulp test
```

De esta forma, se ejecutan los tests definidos en el directorio `src/test`. Estos tests hacen pruebas
tanto sobre la clase de gestión como sobre la API REST definida. Para tener más información sobre estos
tests, se puede consultar esta página de la documentación.

Para tener más información sobre qué clases y APIs se están testeando, se recomienda consultar
[esta página]().

Para tener más información sobre qué es lo que se está teseanto y como se está haciendo, se recomienda
leer [esta página](https://vol0kin.github.io/Vocabulary/info-tests).

## :repeat: Integración continua

Para entender por qué se ha elegido cada una de las herramientas de integración continua, se recomienda
consultar la información de este [documento](https://vol0kin.github.io/Vocabulary/razones-travis-circle).

Si se quiere saber más sobre cómo se han configurado las herramientas de construcción, se
recomienda seguir [este enlace](https://vol0kin.github.io/Vocabulary/config-integracion).

## :building_construction: Herramienta de construcción

En este proyecto se está utilizando la siguiente _buildtool_:

```
buildtool: gulpfile.js
```

Para tener más información sobre qué opciones ofrece, se recomienda consultar el
siguiente [enlace]().
