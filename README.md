# Vocabulary

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
- [Despliegue en PaaS con contenedores](#package-despliegue-en-paas-con-contenedores)
- [Docker Hub](#passenger_ship-docker-hub)
- [Provisionamiento con Ansible utilizando máquina virtual creada con Vagrant](#bread-provisionamiento-con-ansible-utilizando-m%C3%A1quina-virtual-creada-con-vagrant)
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

Despliegue: https://vocabulary-vi.herokuapp.com/

Para obtener más información, consulta [esta página](https://vol0kin.github.io/Vocabulary/despliegue).

## :package: Despliegue en PaaS con contenedores

Contenedor: https://vocabulary-vi.herokuapp.com/

Contenedor: https://vocabulary-vi.azurewebsites.net/

Para obtener más información sobre cómo se ha configurado el contenedor
de Docker, se puede consultar [esta página](https://vol0kin.github.io/Vocabulary/docker)

Para obtener más información sobre como se ha realizado el despliegue
del contenedor, consulta [esta página](https://vol0kin.github.io/Vocabulary/docker-paas).

## :passenger_ship: Docker Hub

URL: https://hub.docker.com/r/volokin/vocabulary

Para obtener más inforación sobre el proceso seguido para subir la imagen,
puedes consultar [esta página](https://vol0kin.github.io/Vocabulary/dockerhub).

## :bread: Provisionamiento con Ansible utilizando máquina virtual creada con Vagrant

Provision: provisioning/playbook.yml

Para consultar información sobre la configuración de la máquina virtual con Vagrant y la
subida a Vagrant Cloud, consulta [esta página](https://vol0kin.github.io/Vocabulary/vagrant).

Para consultar información sobre el provisionamiento con Ansible, consulta
[esta página](https://vol0kin.github.io/Vocabulary/provisionamiento).

Vagrant Cloud: https://app.vagrantup.com/Volokin/boxes/Vocabulary/versions/1.0 

## :mag: Quiero saber más del proyecto

Si eres una mente curiosa y quieres saber más sobre el proyecto,
redirígete a la página de [documentación adicional](https://vol0kin.github.io/Vocabulary/).
