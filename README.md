Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

Este desarrollo se realizo con la version de NODE -v 14.8.0
En el directorio del proyecto se encuentra el Cliente y Servidor, los cuales se pueden ejecutar.

## Cliente
### `npm install`
### `npm start`

Ejecutar este comando en la carpeta **/cliente** corre el cliente la aplicación en modo desarrollador.<br>
Abrir [http://localhost:3000](http://localhost:3000) para visualizar en el navegador.

## Servidor
### `npm install`
### `npm run servidor`

Ejecutar este comando en la carpeta **/servidor** despliega el servidor que consulta la API de Mercado Libre.<br>
El servidor se encuentra corriendo en el puerto 5000: [http://localhost:3000](http://localhost:3000).
Responde a los endpoints:
- /api/items?q=query -->Resultados de la búsqueda
- /api/items/id --> Detalle del producto



**Observaciones!**
- El campo currency al consultar la **API** devuelve ARS, pero para su presentación se convierte al carácter $
- No se encuentra el campo con decimales  en price dentro de la respuesta, por lo que se hardcodean 0.0 como valor.
- El listado de categorías de obtiene del campo `filters` en la respuesta de la **API**. 
- Los breadcrumbs muestran las categorías una vez ingresada una query de búsqueda, y estas se pasan al componente hijo al visualizar el detalle. Cuándo se ingresa mediante la URL particular al detalle de un item no se obtiene el campo `filters` en la respuesta de la **API** para el detalle de un item para mostrar los categorías
-  Se observa que las imágenes de thumbnail que se obtiene de la **API** tienen resolución **90 x 90 px** y se pixelan resolución de **180 x 180 px** que se solicita en las especificaciones

