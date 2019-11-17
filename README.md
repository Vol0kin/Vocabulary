# VocabulaRBy

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.org/Vol0kin/Vocabulary.svg?branch=master)](https://travis-ci.org/Vol0kin/Vocabulary)
[![CircleCI](https://circleci.com/gh/Vol0kin/Vocabulary.svg?style=svg)](https://circleci.com/gh/Vol0kin/Vocabulary)
[![Coverage Status](https://coveralls.io/repos/github/Vol0kin/Vocabulary/badge.svg?branch=master)](https://coveralls.io/github/Vol0kin/Vocabulary?branch=master)

## Tabla de contenidos

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [¿Qué es Vocabulary?](#thinking-%C2%BFqu%C3%A9-es-vocabulary)
- [¿Por qué Vocabulary?](#sunglasses-%C2%BFpor-qu%C3%A9-vocabulary)
- [Instalación del proyecto](#keyboard-instalaci%C3%B3n-del-proyecto)
- [Ejecución de los tests](#heavy_check_mark-ejecuci%C3%B3n-de-los-tests)
- [Herramienta de construcción](#building_construction-herramienta-de-construcci%C3%B3n)
- [Despliegue en un PaaS](#cloud-despliegue-en-un-paas)
- [Quiero saber más del proyecto](#mag-quiero-saber-m%C3%A1s-del-proyecto)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## :thinking: ¿Qué es Vocabulary?

Vocabulary es un microservicio que permite la gestión de vocabulario
a la hora de aprender una lengua.

## :sunglasses: ¿Por qué Vocabulary?

Cuando se aprende una nueva lengua, además de la gramática, una parte muy importante
es el vocabulario. Gestionar y almacenar el vocabulario que se quiere aprender por medios
convencionales es costoso e ineficiente, ya que buscar una palabra o expresión concreta u
organizar el vocabulario por categorías lleva un tiempo considerable.

## :keyboard: Instalación del proyecto

Para poder instalar y trabajar con el proyecto, se necesita tener instalado `node`, `npm` y `gulp`
en el equipo.

Teniéndolos instalados, nos situamos dentro del directorio raíz del proyecto e instalamos las dependencias
del proyecto con la orden:

```bash
npm install .
```

## :heavy_check_mark: Ejecución de los tests

Para ejecutar los tests, situándonos en el directorio clonado, basta con ejecutar:

```bash
gulp test
```

De esta forma, se ejecutan los tests definidos en el directorio `test/`.

## :building_construction: Herramienta de construcción

En este proyecto se está utilizando la siguiente _buildtool_:

```
buildtool: gulpfile.js
```

Para tener más información sobre ésta, consulta
[esta página](https://vol0kin.github.io/Vocabulary/buildtool).

Para obtener información sobre el gestor de procesos, utilizado
por `gulp`, consulta [esta página](https://vol0kin.github.io/Vocabulary/pm2-gestor-procesos).

## :cloud: Despliegue en un PaaS

Despliegue: [https://vocabulary-vi.herokuapp.com/](https://vocabulary-vi.herokuapp.com/)

Para obtener más información, consulta [esta página](https://vol0kin.github.io/Vocabulary/despliegue).

## :mag: Quiero saber más del proyecto

Si eres una mente curiosa y quieres saber más sobre el proyecto, como por ejemplo qué tecnologías y
requisitos tiene el microservicio, qué opciones tienes a la hora de utilizar la *buildtool* en el
proyecto, o simplemente quieres consultar la documentación de las clases y de la API REST, por favor,
redirigete a la página de [documentación adicional](https://vol0kin.github.io/Vocabulary/).
