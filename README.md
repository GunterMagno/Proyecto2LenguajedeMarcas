# Gunter's Forge

**Gunter's Forge** es una empresa dedicada a la creación artesanal de espadas de alta calidad, forjadas a mano desde cero, principalmente esta enfocada en la creación de katanas pero tambien ofrece una variedades distintas de espadas y otros productos similares. La misión de nuestra empresa es preservar el arte de la herrería tradicional, ofreciendo espadas únicas que combinan técnica, diseño y pasión, aunque aparte tambien hacemos espadas inspiradas en animes y peliculas.

## Descripción

En **Gunter's Forge** cada espada es una obra de arte. Nuestro equipo de herreros experimentados se especializa en la forja de espadas personalizadas, desde el diseño hasta la fabricación final. Ya sea para coleccionistas o uso funcional, cada pieza se trabaja con atención al detalle y materiales de la más alta calidad.

## Características de la página

- **Diseño responsivo**: La página web está diseñada para adaptarse a dispositivos móviles, tabletas y escritorios, asegurando una experiencia de usuario óptima en cualquier dispositivo.
- **Estilo atractivo**: La página cuenta con un diseño visualmente atractivo, utilizando una paleta de colores que refleja la esencia de la herrería artesanal.
- **Navegación intuitiva**: El diseño de la página permite una navegación fácil y rápida, con un menú claro y accesible, lo que mejora la experiencia del usuario al explorar las secciones.
- **Animaciones suaves**: Se han implementado animaciones sutiles para transiciones de páginas y botones interactivos, brindando un toque dinámico sin sobrecargar al usuario.
- **Formulario de contacto**: Un formulario de contacto fácil de usar para que los usuarios puedan hacer consultas o solicitar más información sobre productos personalizados.
- **Integración con redes sociales**: La página tiene botones de acceso directo a las redes sociales, permitiendo a los usuarios compartir productos y contenido con facilidad.
- **Blog integrado**: Sección de blog donde se publican artículos relacionados con el proceso de fabricación, historia de las espadas y otros temas relevantes para los clientes interesados.

# Instrucciones para visualizarlo

### 1. Logo de la tienda (Encabezado)
- **Enlace**: Redirige a la **página de inicio**.
- **Ubicación**: En el encabezado, junto al título "La Forja de Gunter". El logo es un **enlace de texto**.

### 2. Formulario de búsqueda (Encabezado)
- Permite ingresar texto para realizar una búsqueda.
- **Ubicación**: En el encabezado, dentro de un formulario con un ícono de **lupa**.

### 3. Iconos (Encabezado)
- **Icono de Pregunta**: Página de **Contacto**.
- **Icono de Carrito**: Página del **Carrito**.
- **Icono de Usuario**: Página de **Cuenta**.
- **Icono de Casa**: Página de **Inicio**.

### 4. Enlaces de navegación (Seccion: Menu principal)
- **Productos**: Redirige a la página de **productos**.
- **Blog**: Redirige a la página del **blog**.
- **Contacto**: Redirige a la página de **contacto**.


## Tecnologías utilizadas

- HTML
- CSS

  
## Validación

Este proyecto ha sido validado utilizando las herramientas del W3C para asegurarse de que el código cumpla con los estándares web.

### Validación de HTML

1. El código HTML ha sido validado utilizando el [Validador HTML del W3C](https://validator.w3.org/).
2. Se corrigieron errores relacionados con la estructura semántica, como el uso adecuado de etiquetas `<header>`, `<footer>`, `<article>`, y `<section>`.
3. **Errores mínimos encontrados**:
   - Se recomienda usar la etiqueta `<h1>` solo como encabezado principal.
   - Falta un encabezado (`<h2>` a `<h6>`) en algunas secciones.
   - Algunos artículos carecen de un encabezado (`<h2>` a `<h6>`).

### Validación de CSS

1. El código CSS ha sido validado utilizando el [Validador CSS del W3C](https://jigsaw.w3.org/css-validator/).
2. Se optimizó el código para eliminar reglas redundantes y mejorar la eficiencia.
3. **Errores encontrados**:
   - Error de sintaxis (Parse Error).
   - La propiedad `animation-range` no existe.
Estos errores se deben a las animaciones de scroll que hay.

### Lenguajes de Script de Cliente

Los lenguajes de script de cliente son aquellos que se ejecutan en el navegador del usuario. Los más comunes son:

**JavaScript**: Es el lenguaje de script más utilizado en la web. Permite manipular el DOM, gestionar eventos y crear interactividad en las páginas web. Desde la llegada de ES6 (ECMAScript 2015), JavaScript ha incorporado características modernas como `let`, `const`, `arrow functions`, `template literals`, y más.

**TypeScript**: Es un superset de JavaScript que añade tipado estático. Es especialmente útil en proyectos grandes para mejorar la mantenibilidad del código.

### Métodos de Selección del DOM

En este proyecto se han utilizado los siguientes métodos para seleccionar elementos del DOM:
- **querySelector**: Selecciona el primer elemento que coincide con el selector. Útil para seleccionar un único elemento.
- **querySelectorAll**: Selecciona todos los elementos que coinciden con el selector. Devuelve una NodeList.
- **getElementById**: Selecciona un elemento por su ID. Es más rápido que `querySelector` para seleccionar por ID.

# Ejemplos de Manipulación del DOM

## 1. Seleccionar y Acceder a Elementos
Se utilizan métodos como `querySelector`, `querySelectorAll` y `getElementById` para seleccionar y acceder a elementos del DOM.

https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/75565807e07ba6d7514357911d9d9312018df817/scripts.js#L64-L65
https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/75565807e07ba6d7514357911d9d9312018df817/scripts.js#L7

## 2. Crear y Añadir Nuevos Elementos
Se crean nuevos elementos dinámicamente y se añaden al DOM.

https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L118-L126
https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L137-L139

## 3. Modificar Contenido y Atributos
Se modifican el contenido y los atributos de elementos existentes.

https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L21-L22

## 4. Eliminar Elementos
Se eliminan elementos del DOM según criterios específicos.

https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L132-L135
https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L143-L147

## 5. Manipular Estilos
Se manipulan estilos directamente desde JavaScript.  

https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L81
https://github.com/GunterMagno/Proyecto2LenguajedeMarcas/blob/9852179fbaf9f17249f1e42b8ae79ba6ebc1d67b/js/scripts.js#L292-L295
