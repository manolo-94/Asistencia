Proyecto SIPBA

Descripción
La propósito del proyecto es llevar el control de asistencia presencial de las personas que se esperan que asistan a un evento.

¿Como funciona?
1- Se debe tener una lista el servidor de los usuarios que podrán tener acceso a la aplicación una vez instalada la aplicación en el dispositivo móvil.

2- Los usuarios la primera vez al loguearse deben contar con con una conexión a internet para que su toquen pueda ser almacenado en la base de datos local en el dispositivo ya que el token servirá para realizar solicitudes al servidor mas adelante.

3- Una vez dentro de la aplicación el usuario debe ir al apartado descargar donde respectivamente deberá oprimir el botón (Descargar Información )para comenzar con la descarga de una lista que previamente fue asociada a su usuario por los administradores de la API REST. la descarga dependerá de múltiples factores (velocidad de internet, tamaño de la lista, estrés del servidor etc).Por recomendación se aconseja que el usuario espere a que se finalice la descarga para poder realizar otra operación dentro de la aplicación.

4- Ya descargada la información el usuario debe de ir a la sección abrir casilla en este apartado debe de oprimir el botón (abrir casilla).

5- Ya que la información esta descargada y esta abierta la casilla podemos comenzar con la verificación de la asistencia de las personas en el apartado personas. En la barra de búsqueda podrá escribir un nombre si la persona existe o coincide con algún resultado dentro de la base de datos aparecerá en la pantalla al presionar sobre algún registro aparecerá la opción para marcar si la persona asistió o no al evento esta información sera enviada el servidor automáticamente.
En caso de no aparecer nigua resultado que coincida con la persona se puede agregar manualmente a esta nueva persona y marcar su asistencia.

6- Todas los registros generados se pueden ver en el apartado votantes desde ahí podemos si la información del registro fue enviada al servidor o no. En caso de no ser enviada por algún error en la conexión contamos con un botón en la parte superior izquierda para poder reenviar la información de los no enviados es importante verificar que la conexión se haya restablecido si hubo algún problema.

La aplicación cuenta con opción de respaldo en caso de que el servidor principal falle podemos enviar la información de manera manual a otro servidor previamente configurado al igual con un modulo de incidencias para poder enviar un mensaje y que algún operador de soporte se ponga en contacto con el usuario.

[Requerimientos]
*Instalar node

*Instalar ionic
npm install -g @ionic/cli

*Instalar angular
npm install -g @angular/cli

*(opcional)Instalar Android Studio.

*El proyecto es multiplataforma gracias la framework ionic esta aplicación esta pensada para usarse en un dispositivo móvil ya que usa una base de datos en sqlite para almacenar el token del usuario y la información que se descarga de la API, pero para efectos de prueba se puede visualizar en el navegador web usando el siguiente comando.
ionic serve

*El proyecto usa validación de token para loguearse, descargar y enviar información al servidor a travez de una API REST.

[1-NOTA] *si quieres ver el diseño de la aplicación desde el navegador, cambia a la rama devlocal. En la rama devlocal no se valida la autenticación de la app solo se requiere que el campos usuario y password no estén vacíos para poder acceder a la app. Ten en cuenta que esto solo te dará acceso a la aplicación pero no funcionara nada.

* Para cambiar la URL base de la API debes modificar el archivo environment.ts que esta localizado en la siguiente ruta.
src/environments/environment.ts

[2-NOTA] *si quieres instalar la aplicación en un dispositivo debes tener en cuenta las siguientes requerimientos.

-instalar android studio.
-instalar android SDK.
-configurar la herramienta de linea de comando de android asi como las variables de entorno.
-configurar JAVA
-tener un dispositivo android virtual o físico
-Antes de que las aplicaciones se puedan implementar en dispositivos y emuladores de Android, se debe configurar el proyecto nativo, para esto se usa *cordova* 

*TODA la información de lo antes mencionado se puede encontrá en la documentación https://ionicframework.com/docs/developing/android

[Importante] para poder lanzar la aplicación en dispositivo debe de estar configurado muy bien las variables de entorno del Android Studio ya que si no se configura de manera correcta pude o cacinar errores para generar APK.