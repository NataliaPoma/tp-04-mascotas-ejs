# Adopción de Mascotas

Aplicación web desarrollada con **Node.js**, **Express** y **EJS** para gestionar un catálogo de mascotas en adopción.  
Permite listar, ver detalles, agregar nuevas mascotas y manejar errores de forma dinámica.

---

## Instalación
La instalación de la aplicación es sencilla y se basa en unos pocos pasos básicos:

- Descarga del proyecto: se obtiene el repositorio o los archivos necesarios.
- Dependencias: se instalan las librerías requeridas para que la aplicación funcione correctamente.
- Inicio del servidor: se ejecuta el proyecto y se accede desde el navegador en la dirección local.

En esta etapa se incorporaron algunos elementos nuevos respecto a versiones anteriores:

- Se agregó el uso de comandos para instalar y ejecutar el servidor de manera automática.
- Los datos se cargan desde **mascotas.json** al iniciar, pero los nuevos registros se mantienen solo en memoria y se borran al reiniciar.
- Se ajustó la navegación y los recursos estáticos (logo en SVG y estilos CSS) para que se carguen correctamente al iniciar.

---

## Ejecución
La ejecución de la aplicación consiste en iniciar el servidor y comprobar que todas las rutas y vistas funcionen correctamente.

- Inicio del servidor: al ejecutar el proyecto, se levanta en la dirección local y se accede desde el navegador.

- Página principal: se muestra el título y el logo de la patita como pantalla de bienvenida.

- Listado de mascotas: se renderizan las mascotas registradas en el archivo mascotas.json, o bien aparece el mensaje **“No hay mascotas disponibles”** si el archivo está vacío.

- Detalle de mascota: al ingresar un ID válido, se muestra la ficha completa de la mascota; si el ID no existe, aparece la página de error 404.

- Formulario de nueva mascota: permite agregar mascotas nuevas con validaciones y estados definidos (En adopción, Reservada, Adoptada).
Los registros agregados se mantienen en memoria mientras el servidor está activo, pero desaparecen al reiniciar, volviendo al estado inicial del archivo JSON.

- Códigos de estado HTTP: se verifican respuestas correctas (200), errores de validación (400), inexistencia de mascota (404) y redirecciones tras el alta (302).

En resumen, la ejecución confirma que la aplicación funciona de manera completa: desde la carga inicial hasta la validación de datos y la creación temporal en memoria.

---

## Páginas y rutas de la aplicación
La aplicación está organizada en distintas rutas que corresponden a las páginas principales:

* Inicio (/)  
Muestra el título de la aplicación y el logo de la patita. Es la página de bienvenida.

* Listado de mascotas (/mascotas)  
Presenta todas las mascotas registradas en el archivo mascotas.json.
Si no hay mascotas, aparece el mensaje “No hay mascotas disponibles”.

* Detalle de mascota (/mascotas/:id)  
Muestra la ficha completa de una mascota específica, con nombre, especie, edad, estado, descripción e imagen.
Si el ID no existe, se renderiza la página de error 404.

* Formulario de nueva mascota (/mascotas/nueva)  
Permite registrar una nueva mascota. Incluye validaciones y los estados posibles: En adopción, Reservada y Adoptada.
Si los datos son correctos, se guarda en mascotas.json y redirige al listado.

* Página de error (/mascotas/:id inexistente)  
Cuando se busca una mascota que no existe, se muestra la vista no-encontrado.ejs con el mensaje “Mascota no encontrada”.

---

## Pruebas realizadas
Se recorrieron todas las páginas y flujos obligatorios para comprobar la funcionalidad de la aplicación:

— Inicio (/) → responde 200, muestra título y enlace al catálogo.
— Listado (/mascotas) → responde 200, renderiza las cinco mascotas iniciales.
— Estado vacío → responde 200, muestra mensaje alternativo cuando no hay registros.
— Detalle válido (/mascotas/:id) → responde 200, muestra datos completos e imagen.
— Detalle inexistente → responde 404, renderiza la página de error.
— Formulario (/mascotas/nueva) → responde 200, incluye todos los controles etiquetados.
— Envío incompleto o edad inválida → responde 400, muestra mensaje de error y conserva valores.
— Envío válido (POST /mascotas) → responde 302 seguido de 200, redirige al listado y muestra la nueva tarjeta.
— Recursos estáticos → CSS, SVG y JS cargan correctamente (mensaje en consola visible).
— Reinicio del servidor → responde 200, vuelve al estado inicial con cinco registros, confirmando que los nuevos se borran al reiniciar.

En conclusión, la aplicación cumple con todos los casos de prueba definidos en la consigna y demuestra el comportamiento esperado de creación en memoria y redirección.

---

## Estructura de vistas
La aplicación está organizada en distintas vistas que se combinan con layouts y partials para mantener orden y reutilización:

* Layout principal (main.ejs)  
Es la plantilla base que incluye el encabezado y el pie de página. Todas las demás vistas se renderizan dentro de este layout.

* Partials (encabezado.ejs y pie.ejs)  
Contienen los elementos comunes de navegación y cierre de la página.
El encabezado incluye el logo de la patita y los enlaces de navegación (Catálogo y Agregar mascota).

* Vista de inicio  
Muestra el título de la aplicación y el logo. Es la página de bienvenida.

* Vista de listado (lista.ejs)  
Renderiza todas las mascotas registradas. Si no hay datos, muestra el mensaje “No hay mascotas disponibles”.

* Vista de detalle (detalle.ejs)  
Presenta la ficha completa de una mascota: imagen, nombre, especie, edad, estado y descripción.

* Vista de formulario (nueva.ejs)  
Permite registrar una nueva mascota. Incluye validaciones y los estados posibles: En adopción, Reservada y Adoptada.

* Vista de error (no-encontrado.ejs)  
Se muestra cuando se intenta acceder a una mascota inexistente. Contiene el mensaje “Mascota no encontrada”.

---

## Recursos estáticos
La aplicación utiliza recursos estáticos que complementan las vistas dinámicas y le dan identidad visual:

- Hojas de estilo (CSS):  
Se encuentran en la carpeta public/css/estilos.css. Definen la apariencia general de la aplicación: colores, tipografía y disposición de los elementos.

- Imágenes (SVG):  
En la carpeta public/img/mascota.svg se incluye el logo. Este recurso se usa en el encabezado y da coherencia al tema de adopción.

- JavaScript:  
En la carpeta public/js/app.js se encuentra un archivo que muestra un mensaje en consola:
**Recursos estáticos cargados**
Esto confirma que el recurso se sirve correctamente desde Express.

---

## Formulario de nueva mascota
La aplicación incluye un formulario que permite registrar mascotas nuevas en el sistema.
Este formulario es una parte clave porque asegura que los datos ingresados sean correctos y se mantengan temporalmente en memoria.

Campos principales: nombre, especie, edad, descripción, imagen y estado.
Estados disponibles: En adopción, Reservada y Adoptada.
Validaciones: controla que todos los campos estén completos y que los valores sean válidos (por ejemplo, la edad debe ser positiva).
Comportamiento:
- Si hay errores, se muestra un mensaje indicando que los datos son inválidos.
- Si todo está correcto, la mascota se agrega al arreglo en memoria y se redirige al listado.

Los datos agregados se mantienen solo mientras el servidor está activo; al reiniciar desaparecen, cumpliendo con la consigna de creación temporal en memoria.

Este formulario completa el flujo de la aplicación, permitiendo que el catálogo de mascotas se mantenga actualizado y cumpla con las consignas del trabajo práctico.

---

## Persistencia de los datos

En la aplicación, los registros creados con el formulario no deben permanecer después de reiniciar el servidor.
Esto se debe a que los datos se manejan únicamente en memoria, sin escritura en el archivo mascotas.json.

Mientras el servidor está activo:  
Las mascotas nuevas se agregan al array en memoria y aparecen en el listado.

Al reiniciar el servidor:  
Esa memoria se pierde y se vuelven a cargar solo las mascotas originales desde el archivo mascotas.json.
Los registros agregados desaparecen, cumpliendo con la consigna.

Diferencia clave:
- Memoria: datos temporales, se borran al reiniciar.
- Persistencia: datos guardados en disco, permanecen después de reiniciar.

---

## Conceptos y funcionamiento
Diferencia entre layout, vista y parcial:

* El layout es la plantilla principal que define la estructura general de la página (encabezado, pie, espacio central).

* La vista es el contenido específico que se muestra dentro del layout (ejemplo: listado, detalle, formulario).

* El parcial es un fragmento reutilizable de código (como el encabezado o el pie) que se incluye en varias vistas.

* Datos enviados a una vista mediante res.render:  
Cuando se llama a res.render, se pasa el nombre de la vista y un objeto con datos. Esos datos se insertan en la plantilla EJS y se muestran dinámicamente en la página.

* Función de express.static:  
Permite servir archivos estáticos (CSS, imágenes, JavaScript) desde la carpeta public, para que el navegador pueda cargarlos directamente.

* Función de express.urlencoded:  
Habilita la lectura de datos enviados desde formularios HTML. Convierte la información en un objeto accesible dentro de req.body.

* Recorrido POST, redirección y GET:
  - El usuario completa el formulario y envía los datos con un POST.
  - El servidor valida y guarda la información, luego hace una redirección.
  - Finalmente, el navegador realiza un GET al listado, mostrando la nueva mascota.

* Motivo por el cual el nuevo registro desaparece al reiniciar:  
Si los datos solo se guardan en memoria, al detener el servidor se pierden. Para evitarlo, se implementó la escritura en el archivo mascotas.json. Sin persistencia, los registros creados desaparecen al reiniciar porque nunca se guardaron en disco.
