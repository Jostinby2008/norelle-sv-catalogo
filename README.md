# Norelle Ropa — Tienda Online Premium

Sitio de ecommerce tipo boutique para **Norelle Ropa**. Incluye catálogo, categorías,
ficha de producto, búsqueda, favoritos, carrito de compras y checkout por WhatsApp.

## Tecnologías

- HTML5, CSS3 y JavaScript (vanilla, sin frameworks ni build step).
- Datos de productos en `data/products.json` (JSON estático).
- Estilos propios en `assets/css/main.css` (paleta ivory / dusty rose / soft black).
- Estado del carrito y de favoritos en `localStorage`.

No requiere instalación de dependencias: es un sitio estático.

## Estructura

```
index.html            Inicio (hero editorial, categorías, destacados, marca)
404.html              Página de error
config.js             Configuración de la tienda (WhatsApp, contacto)
data/products.json    Catálogo de productos (54 prendas reales del catálogo)
assets/css/main.css   Estilos
assets/js/app.js      Carrito, favoritos, menú móvil
assets/img/products/  Fotos de producto extraídas de catalogo.pdf (600x800)
pages/
  catalogo.html       Catálogo con filtros y orden
  categorias.html     Vista de categorías
  producto.html       Detalle de producto (?id=...)
  buscar.html         Búsqueda en vivo
  favoritos.html      Productos guardados
  carrito.html        Carrito de compras
  checkout.html       Formulario + envío de pedido por WhatsApp
  nosotros.html       Sobre la marca
  contacto.html       Contacto
  faq.html            Preguntas frecuentes
  politicas.html      Políticas
```

## Configuración de WhatsApp

El número de WhatsApp **no está inventado**: la tienda lo lee de `config.js`.

1. Abre `config.js`.
2. Completa `whatsappNumber` con el código de país + número, sin símbolos.
   Ejemplo para El Salvador (+503): `whatsappNumber: '50377777777'`.
3. Opcionalmente copia `.env.example` a `.env` si vas a gestionar los valores por entorno.

Mientras `whatsappNumber` esté vacío, los botones de WhatsApp muestran un aviso claro
al usuario (indicando que aún no está configurado) en lugar de abrir un enlace inválido.

## Ejecutar en local

Cualquier servidor estático sirve. Ejemplos:

```bash
# Python
python -m http.server 8080

# PHP (XAMPP)
php -S localhost:8080 -t .

# Node (si está instalado)
npx http-server . -p 8080
```

Luego abre `http://localhost:8080`.

> Nota: no abras los archivos directamente con `file://` porque el `fetch` de
> `data/products.json` puede ser bloqueado por el navegador; usa un servidor local.

## Precios

Los precios provienen de la lista de referencia proporcionada:

| Producto                     | Precio  |
|------------------------------|---------|
| Pantalón de hombre           | $15.99  |
| Pantalón de mujer            | $12.50  |
| Camisetas                    | $10.85  |
| Blusas                       | $9.99   |
| Suéter mujer                 | $10.99  |
| Suéter hombre                | $10.99  |
| Chaquetas                    | $12.00  |
| Camisetas oversize mujer     | $8.99   |
| Vestidos                     | $10.50  |

Los precios son de referencia y están sujetos a cambios. No se inventan tallas,
colores ni inventario: cualquier detalle no confirmado se coordina por WhatsApp.

## Catálogo

Las 54 prendas provienen directamente de `catalogo.pdf` (9 categorías × 6 estilos):

| Categoría                   | Estilos                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| Pantalones de Hombre        | Jeans Clásicos, De Vestir, Chino, Jogger, Cargo, Relaxed                |
| Pantalones de Mujer         | Wide Leg, Jeans, Recto, Lino, Cargo, Leggings                           |
| Camisetas                   | Lisa, Manga Corta, Estampada, Manga Larga, Oversize, Crop               |
| Blusas                      | Clásica, Sin Mangas, Manga Larga, Estampada, Crop, Oversize             |
| Suéteres de Mujer           | Cuello Redondo, Tejido, Cuello Alto, Cárdigan, Oversize, Con Botones    |
| Suéteres de Hombre          | Cuello Redondo, Tejido Grueso, Cuello Alto, Cárdigan, Con Capucha, Zipper |
| Chaquetas                   | Denim, Cuero, Bomber, Tela Ligera, Puffer, Oversize                     |
| Camisetas Oversize de Mujer | Básica, Tye Dye, Estampada, Minimalista, Gráfica, Con Detalle           |
| Vestidos                    | Casual, Estampado, Midi, Tirantes, Elegante, Suelto                     |

## Contacto

- Correo: norelle.sv@gmail.com
- Instagram: [@norelle.sv](https://www.instagram.com/norelle.sv)
