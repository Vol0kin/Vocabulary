# VocabulaRBy

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.org/Vol0kin/VocabulaRBy.svg?branch=master)](https://travis-ci.org/Vol0kin/VocabulaRBy)
[![CircleCI](https://circleci.com/gh/Vol0kin/VocabulaRBy.svg?style=svg)](https://circleci.com/gh/Vol0kin/VocabulaRBy)
[![Coverage Status](https://coveralls.io/repos/github/Vol0kin/VocabulaRBy/badge.svg?branch=master)](https://coveralls.io/github/Vol0kin/VocabulaRBy?branch=master)

## Tabla de contenidos

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [¿Qué es VocabulaRBy?](#thinking-%C2%BFqu%C3%A9-es-vocabularby)
- [¿Por qué VocabulaRBy?](#sunglasses-%C2%BFpor-qu%C3%A9-vocabularby)
- [Quiero saber más del proyecto](#quiero-saber-m%C3%A1s-del-proyecto)
- [Instalación del proyecto](#keyboard-instalaci%C3%B3n-del-proyecto)
- [Ejecución de los tests](#heavy_check_mark-ejecuci%C3%B3n-de-los-tests)
- [Herramientas de construcción e integración continua](#building_construction-herramientas-de-construcci%C3%B3n-e-integraci%C3%B3n-continua-repeat)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## :thinking: ¿Qué es VocabulaRBy?

VocabulaRBy es un microservicio que permite la gestión de vocabulario
a la hora de aprender una lengua.

## :sunglasses: ¿Por qué VocabulaRBy?

Cuando se aprende una nueva lengua, además de la gramática, una parte muy importante
es el vocabulario. Gestionar y almacenar el vocabulario que se quiere aprender por medios
convencionales es costoso e ineficiente, ya que buscar una palabra o expresión concreta u
organizar el vocabulario por categorías lleva un tiempo considerable.

## :mag: Quiero saber más del proyecto

Si quieres tener más información sobre el proyecto, como por ejemplo de dónde surge la idea,
cómo se ha implementado y qué tecnologías utiliza, consulta
[esta parte](https://github.com/Vol0kin/VocabulaRBy/blob/master/docs/extra-doc/info-adicional-proyecto.md)
de la documentación.

## :keyboard: Instalación del proyecto

Para poder instalar el proyecto, se necesita tener instalado `node` y `npm` en el equipo. Teniendo esto,
lo primero que hay que hacer es clonar el repositorio con `git clone`.
Una vez hecho esto, nos situamos dentro del directorio e instalamos las dependencias del proyecto
con la siguiente orden:

```bash
npm install .
```

## :heavy_check_mark: Ejecución de los tests

Para ejecutar los tests, situándonos en el directorio clonado, basta con hacer lo siguiente:

```bash
npm test
```

De esta forma, se ejecutan los tests definidos en el directorio `src/test`. Estos tests crean un directorio
donde escriben la salida, que es `out-test`. Este directorio está a nivel raíz, y contiene un archivo que se
va sobreescribiendo con cada test. Si se quiere eliminar este directorio, solo se tiene que ejecutar
la siguiente orden:

```bash
rm -rf out-test
```

Para tener más información sobre la clase que se está testeando, se recomienda consultar la
[siguiente](https://vol0kin.github.io/VocabulaRBy/VocManager.html) página de documentación. Para
entender qué es lo que se está testeando, se recomienda leer
[esta](https://github.com/Vol0kin/VocabulaRBy/blob/master/docs/extra-doc/info-tests.md) página.

## :building_construction: Herramientas de construcción e integración continua :repeat:

Para consultar información sobre qué herramientas de construcción se están utilizando y cómo están
configuradas las herramientas de integración continua, se recomienda consultar
[este enlace](https://github.com/Vol0kin/VocabulaRBy/blob/master/docs/extra-doc/config-tecnologias.md).

Para entender por qué se ha elegido cada una de las herramientas de integración continua, se recomienda
consultar la información de este [documento](https://github.com/Vol0kin/VocabulaRBy/blob/master/docs/extra-doc/razones-travis-circle.md).
