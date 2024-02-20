# e-commerce - Backend en CoderHouse

El proyecto "e-commerce - Backend de Coderhouse" es una aplicación backend desarrollada para respaldar las operaciones de un sistema de comercio electrónico. Este backend proporciona una API RESTful que permite la gestión de productos y carritos de compra.

La funcionalidad principal del proyecto incluye la creación, consulta, actualización y eliminación de productos, así como la creación de carritos de compra, agregado de productos a dichos carritos y consulta de los mismos. Utiliza tecnologías como Express.js para el enrutamiento de solicitudes HTTP, y se integra con un sistema de archivos para almacenar la información de productos y carritos en archivos JSON.

El proyecto está diseñado para ser escalable y fácilmente integrable con un frontend de aplicación web o móvil, proporcionando una sólida base para construir una plataforma de comercio electrónico completa.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript fuera de un navegador web.
- **Express.js**: Framework de aplicación web de Node.js que simplifica el proceso de creación de API RESTful y aplicaciones web.
- **File System (fs)**: Módulo de Node.js que proporciona una API para interactuar con el sistema de archivos del sistema operativo.
- **Path**: Módulo de Node.js que proporciona utilidades para trabajar con rutas de archivos y directorios.
- **Joi**: Biblioteca de validación de datos para JavaScript que permite definir esquemas para validar objetos JavaScript.
- **TypeScript**: Superset de JavaScript que agrega tipado estático opcional al lenguaje y facilita el desarrollo de aplicaciones más robustas y mantenibles.
- **JSON**: Formato de datos ligero utilizado para el intercambio de datos entre el cliente y el servidor, así como para el almacenamiento de información en archivos.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/NacorDiego/backend2-Coder.git
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

## Uso

**Modo de desarrollo**

Para ejecutar el proyecto en modo de desarrollo, que permite reiniciar automáticamente el servidor cuando se detectan cambios en el código fuente, ejecutá el siguiente comando:

```bash
npm run dev
```

**Modo de Producción**

Para ejecutar el proyecto en modo de producción, que compila el código TypeScript a JavaScript y luego ejecuta el archivo resultante, sigue estos pasos:

```bash
npm run build
npm start
```

### Aclaraciones

- Asegúrate de tener Node.js y npm instalados en tu sistema.
- Si es necesario, ajusta las variables de entorno y la configuración del archivo tsconfig.json para adaptar el proyecto a tus necesidades específicas.

## Endpoints de Productos

### Obtener Productos

Este endpoint permite obtener una lista de productos, opcionalmente limitada por el número especificado.

- **URL:** `/api/products/`
- **Método HTTP:** GET
- **Parámetros de Consulta:**
  - `limit` (opcional): Limita el número de productos a devolver. Si no se proporciona, devuelve todos los productos.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Contenido:** JSON con la lista de productos.
    ```json
    {
      "status": 200,
      "message": [ { "product_1_info" }, { "product_2_info" }, ... ]
    }
    ```
- **Respuesta de Error:**
  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.
    ```json
    {
      "status": 500,
      "message": "Mensaje de error"
    }
    ```
- **Ejemplo de Uso:**

  ```bash
  GET /api/products/?limit=10
  ```

  ```json
  {
    "status": 200,
    "message": [
      { "id": 1, "name": "Producto 1", ... },
      { "id": 2, "name": "Producto 2", ... },
      ...
    ]
  }
  ```

### Obtener Producto por ID

Este endpoint permite obtener un producto específico mediante su ID.

- **URL:** `/api/products/:pid`
- **Método HTTP:** GET
- **Parámetros de Ruta:**
  - `pid`: ID del producto a obtener.
- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** JSON con la información del producto.

    ```json
    {
      "status": 200,
      "message": { "product_info" }
    }
    ```

- **Respuesta de Error (Producto no encontrado):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que el producto no se encontró.

    ```json
    {
      "status": 404,
      "message": "Producto no encontrado. No existe un producto con el ID proporcionado."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Mensaje de error"
    }
    ```

- **Ejemplo de Uso:**

  ```bash
  GET /api/products/123
  ```

  ```json
  {
    "status": 200,
    "message": { "id": 123, "name": "Producto", ... }
  }
  ```

### Crear Nuevo Producto

Este endpoint permite crear un nuevo producto.

- **URL:** `/api/products`
- **Método HTTP:** POST
- **Cuerpo de la Solicitud:**

  ```json
  {
    "title": "Producto Nuevo",
    "description": "Descripción del producto nuevo.",
    "code": 123456,
    "price": 10.99,
    "status": true,
    "stock": 100,
    "category": "Electrónicos",
    "thumbnail": "https://example.com/product_image.jpg"
  }
  ```

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Mensaje de éxito.

    ```json
    {
      "status": 200,
      "message": "Producto agregado con éxito."
    }
    ```

- **Respuesta de Error (Campos Requeridos Faltantes):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando los campos requeridos faltantes.

    ```json
    {
      "status": 404,
      "message": "Error al crear el producto: Deben enviarse los campos requeridos."
    }
    ```

- **Respuesta de Error (ID de Producto Indicado en la Solicitud):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que el ID del producto no debe indicarse en la solicitud.

    ```json
    {
      "status": 404,
      "message": "El ID del producto se genera automáticamente y no debe indicarse en la solicitud."
    }
    ```

- **Respuesta de Error (Error de Validación):**

  - **Código:** 400 Bad Request
  - **Contenido:** Mensaje de error de validación.

    ```json
    {
      "status": 400,
      "message": "Mensaje de error de validación."
    }
    ```

- **Respuesta de Error (Producto Duplicado):**

  - **Código:** 409 Conflict
  - **Contenido:** Mensaje indicando que ya existe un producto con el código proporcionado.

    ```json
    {
      "status": 409,
      "message": "Ya existe un producto con el código proporcionado."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error interno del servidor."
    }
    ```

### Actualizar Producto

Este endpoint permite actualizar la información de un producto existente.

- **URL:** `/api/products/:pid`
- **Método HTTP:** PUT

- **Parámetros de Ruta:**

  - `pid`: ID del producto a actualizar.

- **Cuerpo de la Solicitud:**
  Se debe enviar un objeto JSON con los campos que se desean actualizar del producto.

  ```json
  {
    "title": "Nuevo título del producto",
    "description": "Nueva descripción del producto",
    "code": 987654,
    "price": 15.99,
    "status": false,
    "stock": 50,
    "category": "Hogar",
    "thumbnail": "https://example.com/new_product_image.jpg"
  }
  ```

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Mensaje de éxito.

    ```json
    {
      "status": 200,
      "message": "Producto actualizado con éxito."
    }
    ```

- **Respuesta de Error (Producto No Encontrado):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que no se encontró el producto con el ID proporcionado.

    ```json
    {
      "status": 404,
      "message": "No se encontró el producto con el ID proporcionado."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error interno del servidor."
    }
    ```

### Eliminar Producto

Este endpoint permite eliminar un producto existente.

- **URL:** `/api/products/:pid`
- **Método HTTP:** DELETE

- **Parámetros de Ruta:**

  - `pid`: ID del producto a eliminar.

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Mensaje de éxito.

    ```json
    {
      "status": 200,
      "message": "Producto eliminado con éxito."
    }
    ```

- **Respuesta de Error (Producto No Encontrado):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que no se encontró el producto con el ID proporcionado.

    ```json
    {
      "status": 404,
      "message": "No se encontró el producto con el ID proporcionado."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error interno del servidor."
    }
    ```

## Endpoints de Carritos

### Obtener Carritos

Este endpoint permite obtener todos los carritos existentes.

- **URL:** `/api/carts`
- **Método HTTP:** GET
- **Permisos:** Solo administrador.

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Lista de carritos.

    ```json
    {
      "status": 200,
      "message": [ { "id": 1, "products": [...] }, { "id": 2, "products": [...] }, ... ]
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error interno del servidor."
    }
    ```

### Obtener Carrito por ID

Este endpoint permite obtener un carrito específico por su ID.

- **URL:** `/api/carts/:cid`
- **Método HTTP:** GET
- **Permisos:** Cualquier usuario.

- **Parámetros de Ruta:**

  - `:cid` - ID del carrito que se desea obtener.

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Detalles del carrito.

    ```json
    {
      "status": 200,
      "message": { "id": 1, "products": [...] }
    }
    ```

- **Respuesta de Error (Carrito No Encontrado):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que no se encontró ningún carrito con el ID proporcionado.

    ```json
    {
      "status": 404,
      "message": "Error: No existe ningún carrito con ese ID."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error interno del servidor."
    }
    ```

### Crear Nuevo Carrito

Este endpoint permite crear un nuevo carrito.

- **URL:** `/api/carts`
- **Método HTTP:** POST

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Mensaje de éxito.

    ```json
    {
      "status": 200,
      "message": "Carrito creado con éxito."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error al crear el carrito."
    }
    ```

### Agregar Producto al Carrito

Este endpoint permite agregar un producto al carrito especificado.

- **URL:** `/api/carts/:cid/product/:pid`
- **Método HTTP:** POST

- **Parámetros de la URL:**

  - `:cid`: ID del carrito.
  - `:pid`: ID del producto.

- **Respuesta Exitosa:**

  - **Código:** 200 OK
  - **Contenido:** Mensaje de éxito.

    ```json
    {
      "status": 200,
      "message": "Producto agregado al carrito."
    }
    ```

- **Respuesta de Error (Producto No Encontrado):**

  - **Código:** 404 Not Found
  - **Contenido:** Mensaje indicando que no existe un producto con el ID proporcionado.

    ```json
    {
      "status": 404,
      "message": "No existe un producto con ese ID."
    }
    ```

- **Respuesta de Error (Error del Servidor):**

  - **Código:** 500 Internal Server Error
  - **Contenido:** Mensaje de error detallado.

    ```json
    {
      "status": 500,
      "message": "Error al agregar el producto al carrito: Mensaje de error."
    }
    ```

## Lógica Principal

La aplicación es un backend para un sistema de e-commerce que gestiona productos y carritos de compras. La lógica principal se basa en la manipulación de datos de productos y carritos almacenados en archivos JSON.

Para los productos, se pueden realizar operaciones como agregar, actualizar, eliminar y obtener productos, junto con la validación de los campos y la verificación de duplicados.

Para los carritos de compras, se pueden realizar operaciones como crear un nuevo carrito, obtener todos los carritos y agregar productos a un carrito específico. Se verifican los IDs de productos y carritos, y se manejan los errores en caso de que el producto o carrito solicitado no exista.

La aplicación utiliza Express.js para el enrutamiento y gestión de solicitudes HTTP, y se integra con un sistema de archivos para almacenar y recuperar datos de productos y carritos. Se utiliza TypeScript para proporcionar tipado estático y mejorar la escalabilidad y mantenibilidad del código.

## Contacto

- **Github:** https://github.com/NacorDiego/
- **LinkedIn:** https://www.linkedin.com/in/diego-ezequiel-nacor-97657b245/
- **Correo:** diegoenacor@gmail.com
