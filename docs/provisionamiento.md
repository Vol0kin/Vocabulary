# Provisionamiento de una máquina virtual mediante Ansible

El objetivo principal es provisionar una máquina virtual recién creada con todas
las herramientas necesarias para poder ejecutar el microservicio desarrollado
hasta el momento.

La creación de la máquina virtual puede verse en
[esta parte de la documentación]().
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



## Receta: archivo de provisionamiento

## Proceso de provisionamiento


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
