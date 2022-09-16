# Semi1-Grupo5-Proyecto1

Amazon Web Services (AWS) es una plataforma de servicios de nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otra funcionalidad para ayudar a las empresas a escalar y crecer.

## :computer: Integrantes
| Carnet | Integrante |
| -------- | -------- |
| 201504236| Adriana Marié Gómez Dávila|
| 201900853| Gerardo Steve Muñoz Contreras|
| 201903848| Emiliano José Alexander Velásquez Najera|
| 201904012| Alexandro Provenzale Pérez|

Link de la página:
http://appweb-grupo5-p1.s3-website.us-east-2.amazonaws.com

---

# Manual técnico :computer: 

## Objetivos del Manual

* Explicar la arquitectura interna utilizada e implementada en cada uno de los servicios de aws en la aplicación.
* Identificar usuarios IAM creados para la administración de identidades y acceso a los servicios y recursos implementados, con los roles asignados a cada uno.

## Explicación de Arquitectura del proyecto

Toda la plataforma hace uso de servicios proporcionados por AWS en la cobertura de su capa gratuita. Consta de 5 servicios:

### 1. Sitio Web Estatico

O bien el front-end el cuál fue desarrollado con React y está almacenado en un bucket de S3.

### 2. Load Balancer

Verifica el estado de los 2 servidores EC2. Redirecciona la solicitud de acceso a alguno de los servidores, el que tenga menor tráfico.

### 3. EC2

El back-end, almacenado en 2 máquinas virtuales EC2, la primera con un servidor realizado en python y la otra con un servidor de NodeJS. Se divide la carga haciendo uso del Load Balancer.

### 4. Bucket de Imágenes

El almacenamiento de archivos en la nube se hace por medio de S3 con buckets, estos están configurados para que se puedan enviar los archivos desde el backend y que se puedan visualizar desde cualquier parte.

### 5. Bases de Datos

La base de datos DynamoDB está montada en una instancia privada a la cual se accede desde alguna de las EC2.

![](https://i.imgur.com/JDCH195.png)

## Descripción de cada usuario de IAM creado con las políticas asociadas.

![](https://i.imgur.com/Y4csebF.jpg)

Cada usuario cuenta con el mismo rol que los demás, lo que los diferencia son los grupos a los que pertenecen.

![](https://i.imgur.com/DpjceXm.jpg)

* DBA: Acceso completo al servicio DynamoDB
* BackendDev: Acceso completo al servicio EC2
* StorageAdministratos Acceso completo al servicio de S3

## Capturas y descripción de cómo se configuro cada servicio.

### DynamoDB
![](https://i.imgur.com/LFGBymW.png)

### EC2
![](https://i.imgur.com/x8bVTxt.png)


### S3

![](https://i.imgur.com/1Z5ISPz.png)
![](https://i.imgur.com/ioOFVWJ.png)
![](https://i.imgur.com/Jv6SgBN.png)


## Conclusiones
* Aplicar las tecnologías de la nube a un entorno real.
* Una de las ventajas de AWS es que nos proporciona distintos servicios de capa gratuita, lo cual nos permite practicar para poder familiarizarnos con los servicios en la nube.
* AWS es una herramienta que nos ofrece recursos bajo demanda lo cual permite alta escalabilidad y soluciones computacionales.






---

# Manual de usuario :pencil: 

## Objetivos del Manual
* Conocer el funcionamiento del proyecto.
* Conocer como evitar errores al ingresar información.
* Desarrollar una aplicación que sea capaz de compartir archivos de manera segura.
* Desarrollar una aplicación que sea capaz de agregar usuarios y crear su propia red de amistad.

## Explicación y descripción de la aplicación.
Super-storage nace de la necesidad de poder compartir archivos de manera segura, con una red de amigos seleccionada.

Los usuarios puden agregar amigos, creando así su propia red de amistades. También es posible subir archivos públicos o privados, dichos archivos pueden ser renombrados, cambiados de nivel de privacidad y eliminados de la plataforma de forma sencilla, esto nos permite utilizar la plataforma como un almacen o solo como un método de difusión a un grupo controlado de personas.


## Pasos con capturas de cómo utilizar la aplicación.
#### 1. Login
La página principal que vera el usuario, será el login.
En esta vista, debe de colocar su nombre de usuario y su password para poder ingresar.

![](https://i.imgur.com/F8JMOBL.png)


#### 2. Registro
Si el usuario no se encuentra registrado en la plataforma, puede registrarse en el apartado de 'Registrar', donde deberá ingresar todos los campos necesarios para su solicitud.

![](https://i.imgur.com/rSA6dq3.png)


#### 3. Dashboard principal
En la pantalla principal del usuario se muestra la foto de perfil como el nombre del usuario y correo.
También se pueden ver los archivos del usuario divididos
en 2 secciones. Archivos Públicos y archivos privados.

![](https://i.imgur.com/TgyIdkF.png)

#### 4. Subir archivos 
En esta pantalla se pide seleccionar un archivo a subir desde el ordenador. Se muestra la ruta del archivo seleccionado. También se puede modificar el nombre del archivo como será guardado y elegir la visibilidad en modo público o privado.

![](https://i.imgur.com/CxsXFWr.png)


#### 5. Eliminar archivos
En esta pantalla únicamente se pedirá seleccionar el archivo que se quiera eliminar.



#### 6. Editar archivos
En esta pantalla se podrá cambiar el modo de visibilidad del archivo de privado a publico y viceversa.

![](https://i.imgur.com/RklnI3R.png)


#### 7. Agregar amigos
En la sección de agregar amigos, aparecen todos los usuarios creados en la plataforma. Cuenta con una opción de buscar a un usuario por su username.
También cuenta con un contador de cuantos archivos públicos tiene ese usuario y la opción de agregar a ese amigo.


#### 8. Visualización de archivos
En esta sección aparecen todos los archivos públicos de los amigos que se han agregado. Tiene una opción de poder ver estos archivos ya sea una imagen o un archivo de
texto .txt o .pdf.

![](https://i.imgur.com/ZEBRdQX.png)

