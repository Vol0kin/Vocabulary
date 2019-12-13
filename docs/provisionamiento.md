# Provisionamiento de una máquina virtual mediante Ansible

El objetivo principal es provisionar una máquina virtual recién creada con todas
las herramientas necesarias para poder ejecutar el microservicio desarrollado
hasta el momento.

La creación de la máquina virtual puede verse en
[esta parte de la documentación](https://vol0kin.github.io/Vocabulary/vagrant).
Aquí vamos a ver cómo podemos provisionar dicha máquina una vez ha sido creada.

La manera más sencilla de provisionar la máquina es utilizar Ansible, una
herramienta que utiliza YAML permite hacerlo de forma sencilla. Vamos a ver
a continuación los archivos que se tienen que configurar para que este
proceso funcione.

## Archivo de configuración

El primer archivo que veremos es `ansible.cfg`, el cuál especifica la configuración
general de Ansible. Dicho archivo puede verse
[aquí](https://github.com/Vol0kin/Vocabulary/blob/master/ansible.cfg),
aunque su desglose puede encontrarse a continuación:

```ini
[defaults]
host_key_checking = False
inventory = ./ansible_hosts
```

Realmente, el archivo no tiene demasiado contenido, ya que solo nos interesa
modificar, en este caso, unas pocas opciones. `[defaults]` indica que ésta
será la configuración utilizada por defecto. `host_key_checking = False` indica
que no se preguntará si se quiere aceptar o no la llave a la hora de realizar
una conexión mediante SSH si el *host* no está dentro de la lista de `known_hosts`.
De esta forma, algunas actividades que no deberían ser interacticas, como
los provisionamientos y algunos comandos de Ansible se pueden llevar a cabo,
ya que no se esperará a la respuesta del usuario. `inventory = ./ansible_hosts`
indica dónde se encuentra el archivo de inventario, el cuál contiene los *hosts* con
los cuáles se trabajará.

## Inventario: archivo de hosts

El siguiente archivo que veremos es el `ansible_hosts`, donde se especificará una
lista con los *hosts* con los que se quiere trabajar. El archivo puede ser escrito en
formato INI o an YAML. En este caso se ha optado por YAML, ya que es algo más fácil de
entender. El archivo puede encontrarse [aquí](https://github.com/Vol0kin/Vocabulary/blob/master/ansible_hosts),
aunque como siempre hacemos, vamos a desglosarlo:

```yaml
Vocabulary:
  hosts:
    Vocabulary:
      ansible_host: 127.0.0.1
      ansible_port: 2222
      ansible_ssh_private_key_file: .vagrant/machines/Vocabulary/virtualbox/private_key
  vars:
    ansible_user: vagrant
```

La primera línea indica que se está creando un grupo de *hosts* llamado *Vocabulary*.
Después, indicamos los *hosts* que forman parte de este grupo. En este caso, tenemos
un solo *host* al cuál también hemos llamado *Vocabulary*, ya que es el nombre de la
máquina virtual creada con Vagrant. Para este *host*, especificamos una serie de variables.
Indicamos por ejemplo que su dirección IP es la `127.0.0.1`, que el puerto mediante el
cuál ansible tiene que conectarse por SSH es el `2222` en vez del `22` por defecto, y
que la clave privada para acceder por SSH se encuentra en el directorio
`.vagrant/machines/Vocabulary/virtualbox/private_key`. Estas variables se han declarado
como específicas al *host* debido a que son susceptibles de cambio en caso de tener
otras máquinas en el mismo grupo. La siguiente parte, `vars:`, indica que las variables
que van a aparecer a continuación se aplican sobre todo el grupo `Vocabulary`. En este
caso, se indica que el usuario mediante el cuál se va a establecer una conexión de
SSH se llama `vagrant`. Esta variable se ha dejado como variable de grupo ya que nos
puede interesar tener más de una máquina en el grupo que haya sido creada con Vagrant
para provisionarla, ya que entonces tendrán todas el mismo usuario definido.

> **Nota**: Algunos de los nombres de variables se han adaptado a las últimas versiones
> de Ansible, ya que `ansible_ssh_port`, `ansible_ssh_host` y `ansible_ssh_user`
> han sido deprecados y sustituidos por los nombres que se pueden ver en el archivo.

## Receta: archivo de provisionamiento

El último archivo que queda por ver es el `playbook.yml`, el cuál es la piedra angular
en el provisionamiento, ya que se especifica qué es lo que se va a provisionar. Este
archivo o *playbook* puede verse
[aquí](https://github.com/Vol0kin/Vocabulary/blob/master/provisioning/playbook.yml).
Vamos primero a ver el archivo de forma general y después comentaremos cada
parte.

```yaml
---
- hosts: Vocabulary
  become: yes
  vars:
    NODEJS_VERSION: "12"
    ansible_distribution_release: "bionic"
  
  tasks:
    - name: Instalar git
      apt:
        pkg: git
        state: present
    
    - name: Instalar clave gpg para Node
      apt_key:
        url: "https://deb.nodesource.com/gpgkey/nodesource.gpg.key"
        state: present
  
    - name: Añadir repositorio de Node
      apt_repository:
        repo: "deb https://deb.nodesource.com/node_{{ NODEJS_VERSION }}.x {{ ansible_distribution_release }} main"
        state: present
        update_cache: yes
  
    - name: Instalar la version de Node
      apt:
        name: nodejs
        state: present
    
    - name: Instalar PM2
      npm:
        name: pm2
        global: yes
    
    - name: Instalar Gulp
      npm:
        name: gulp
        global: yes
    
    - name: Crear usuario vladislav
      user:
        name: vladislav
        shell: /bin/bash
    
    - name: Agregar clave publica para vladislav para conectarse por SSH
      authorized_key:
        user: vladislav
        state: present
        key: "{{ lookup('file', '/home/vladislav/.ssh/id_rsa.pub') }}"
```

> Antes de continuar, y como pequeña nota aclaratoria, me gustaría decir que se
> ha intentado instalar Node utilizando `nvm` aunque sin demasiado éxito ya que,
> o no se instalaba correctamente o había problemas para acceder a los recursos
> instalados. Buscando alguna solución, encontré que la forma más sencilla
> de instalar alguna versión específica de Node es la que se puede ver en
> [esta respusta](https://stackoverflow.com/a/45844178). Por tanto, he
> cogido la respuesta proporcionada y la he adaptado a lo que necesitaba.

Vamos a ver ahora qué es lo que hace cada línea:

- La línea de `hosts` incluye el grupo al que se quiere provisionar. En este caso,
se trata del grupo `Vocabulary` definido en el `ansible_hosts`.
- `become: yes` indica que se van a adquirir permisos de super usuario para poder
realizar las tareas que vienen a continuación.
- `vars` indica una lista de variables que pueden sernos útiles más adelante. En
este caso, definimos la versión de Node que queremos instalar (la 12) en la variable
`NODEJS_VERSION`, y el nombre de la distribución en `ansible_distribution_release`,
el cuál es **bionic**.
- `tasks:` especifica un conjunto de tareas que se quieren llevar a cabo.
  - La primera tarea se encarga de comprobar si está instalado `git` mirando en la lista de paquetes instalados. Si no lo está, lo instala mediante `apt`.
  - La segunda tarea añade la clave **gpg** de Node a las que tenemos en `apt` valiéndose de `apt-key`. De esta forma se está autenticando la fuente de los paquetes de Node.
  - La tercera tarea se encarga de añadir a la lista de repositorios el repositorio asociado a la versión de Node 12 para nuestra distribución (Bionic),  actualizando en el proceso la caché de `apt` mediante `update_cache: yes`, ya que posteriormente tendremos que instalar el paquete correspondiente.
  - La cuarta tarea instala la versión de Node especificada anteriormente mediante `apt`.
  - La quinta tarea instala de forma global (`global: yes`) el gestor de procesos `pm2`, valiéndose para ello de `npm`.
  - La sexta tarea instala la herramienta de construcción `gulp` de forma global, utilizando de nuevo `npm`.
  - La séptima tarea crea un usuario llamado `vladislav` y le asocia un *shell*, el cuál será `/bin/bash`. Este usuario será el que en un futuro ejecute el servicio.
  - La octava tarea permite loguearse como `vladislav` mediante SSH utilizando un par de claves pública-privada. Lo que hace es copiar la clave pública que se puede encontrar en `/home/vladislav/.ssh/id_rsa.pub` y la asocia al usuario `vladislav` creado anteriormente.

## Proceso de provisionamiento

Ahora ya solo nos queda provisionar la máquina. Para ello, lo primero que hace
falta hacer es levantar la máquina virtual, bien mediante `vagrant up --no-provision`
o bien mediante `gulp up-no-provision` (queremos provisionar la máquina con Ansible,
no con Vagrant). Un ejemplo se puede ver a continución:

```bash
$ vagrant up --no-provision
Bringing machine 'Vocabulary' up with 'virtualbox' provider...
==> Vocabulary: Importing base box 'ubuntu/bionic64'...
==> Vocabulary: Matching MAC address for NAT networking...
==> Vocabulary: Checking if box 'ubuntu/bionic64' version '20191211.0.0' is up to date...
==> Vocabulary: Setting the name of the VM: Vocabulary
==> Vocabulary: Clearing any previously set network interfaces...
==> Vocabulary: Preparing network interfaces based on configuration...
    Vocabulary: Adapter 1: nat
==> Vocabulary: Forwarding ports...
    Vocabulary: 8080 (guest) => 8080 (host) (adapter 1)
    Vocabulary: 22 (guest) => 2222 (host) (adapter 1)
==> Vocabulary: Running 'pre-boot' VM customizations...
==> Vocabulary: Booting VM...
==> Vocabulary: Waiting for machine to boot. This may take a few minutes...
    Vocabulary: SSH address: 127.0.0.1:2222
    Vocabulary: SSH username: vagrant
    Vocabulary: SSH auth method: private key
    Vocabulary: Warning: Connection reset. Retrying...
    Vocabulary: Warning: Remote connection disconnect. Retrying...
    Vocabulary: 
    Vocabulary: Vagrant insecure key detected. Vagrant will automatically replace
    Vocabulary: this with a newly generated keypair for better security.
    Vocabulary: 
    Vocabulary: Inserting generated public key within guest...
    Vocabulary: Removing insecure key from the guest if it's present...
    Vocabulary: Key inserted! Disconnecting and reconnecting using new SSH key...
==> Vocabulary: Machine booted and ready!
==> Vocabulary: Checking for guest additions in VM...
    Vocabulary: The guest additions on this VM do not match the installed version of
    Vocabulary: VirtualBox! In most cases this is fine, but in rare cases it can
    Vocabulary: prevent things such as shared folders from working properly. If you see
    Vocabulary: shared folder errors, please make sure the guest additions within the
    Vocabulary: virtual machine match the version of VirtualBox you have installed on
    Vocabulary: your host and reload your VM.
    Vocabulary: 
    Vocabulary: Guest Additions Version: 5.2.34
    Vocabulary: VirtualBox Version: 6.0
==> Vocabulary: Mounting shared folders...
    Vocabulary: /vagrant => /home/vladislav/Universidad/Cuarto/Vocabulary
==> Vocabulary: Machine not provisioned because `--no-provision` is specified.
```

Una vez se ha levantado la máquina, podemos provisionarla. Para ello, podemos
ejecutar o bien `ansible-playbook provisioning/playbook.yml` o bien
`gulp provision`. En el ejemplo siguient se ha hecho de la primera forma,
para que quede más claro:

```bash
$ ansible-playbook provisioning/playbook.yml 
[WARNING]: Found both group and host with same name: Vocabulary


PLAY [Vocabulary] ****************************************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ***********************************************************************************************************************************************************************************************************************
ok: [Vocabulary]

TASK [Instalar git] **************************************************************************************************************************************************************************************************************************
ok: [Vocabulary]

TASK [Instalar clave gpg para Node] **********************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Añadir repositorio de Node] ************************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Instalar la version de Node] ***********************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Instalar PM2] **************************************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Instalar Gulp] *************************************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Crear usuario vladislav] ***************************************************************************************************************************************************************************************************************
changed: [Vocabulary]

TASK [Agregar clave publica para vladislav para conectarse por SSH] **************************************************************************************************************************************************************************
changed: [Vocabulary]

PLAY RECAP ***********************************************************************************************************************************************************************************************************************************
Vocabulary                 : ok=9    changed=7    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

```

Podemos ver en la salida que se ha provisionado la máquina correctamente, y que
`git` ya estaba instalado (el `status` de la primera tarea estaba a `present` desde
el principio). El resto de tareas se han tenido que ejecutar, ya que se ve que a su
lado aparece `changed`.

Ahora nos podemos loguear en la máquina y ver que todo está correctamente instalado.
Para ello, vamos a conectarnos utilizando el usuario creado anteriormente y vamos
a ver que todo está presente:

```bash
$ ssh -p 2222 vladislav@localhost

vladislav@ubuntu-bionic:~$ git --version
git version 2.17.1
vladislav@ubuntu-bionic:~$ node --version
v12.13.1
vladislav@ubuntu-bionic:~$ pm2 --version
[PM2] Spawning PM2 daemon with pm2_home=/home/vladislav/.pm2
[PM2] PM2 Successfully daemonized
4.2.1
vladislav@ubuntu-bionic:~$ gulp --version
CLI version: 2.2.0
Local version: Unknown
```
