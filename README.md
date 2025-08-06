
# 🛒 Tienda Virtual 

## 📄 Descripción

Aplicación web tipo tienda virtual centrada en la venta de productos de la canasta familiar, con roles diferenciados:

* **Cliente:** explora catálogo, agrega productos al carrito, realiza pedidos y visualiza historial de compras.
* **Administrador:** gestiona inventario, productos, usuarios, órdenes y reportes.
* **Empleado o vendedor interno (opcional):** ayuda a consolidar pedidos y gestionar pagos/envíos.


---

## 📦 Tecnologías recomendadas

* **Frontend:** React, Vue o Angular (SPA moderna)
* **Backend:** Node.js + Express, o PHP + Laravel
* **Base de datos:** MySQL o PostgreSQL
* **Autenticación:** JWT, Bcrypt, control por roles
* **Pasarela de pagos:** Stripe, PayU o integración con pasarelas locales
* **Responsive UI** para acceso desde móvil y PC

---

## 🧩 Módulos y funcionalidades

### Gestión general (Admin)

* CRUD de productos y categorías
* Control de inventario (stock, alertas)
* Gestión de usuarios y roles (Admin, Empleado, Cliente)
* Panel de control con reportes: ventas por día, productos más vendidos, ingresos, etc.

### Cliente

* Registro y login de cuenta
* Visualización de catálogo con stock y precios
* Carrito de compras y checkout con pago en línea o contraentrega
* Historial de pedidos, estado (en preparación, enviado, entregado)
* Perfil personal con dirección y datos de contacto

### Empleado / Vendedor (opcional)

* Gestión de pedidos entrantes
* Confirmación de pago y actualización de estado del pedido
* Asistencia a clientes en sitio o por mensajería

---

## 🛠 Instalación y despliegue

1. Clonar el repositorio
2. Instalar dependencias frontend/backend
3. Configurar archivo `.env` con variables (BD, JWT, pagos, etc.)
4. Crear base de datos: tablas: `usuarios`, `productos`, `categorías`, `pedidos`, `detalles_pedido`, etc.
5. Ejecutar migraciones y datos iniciales (seeders)
6. Iniciar backend y frontend (servidor local o Docker)
7. Probar acceso con rol administrador

---

## 🔧 Rutas de API sugeridas

| Endpoint                 | Método              | Roles permitidos | Descripción                         |
| ------------------------ | ------------------- | ---------------- | ----------------------------------- |
| `/api/auth/register`     | POST                | —                | Registro de usuario                 |
| `/api/auth/login`        | POST                | —                | Autenticación login                 |
| `/api/products`          | GET                 | Todos            | Obtener catálogo disponible         |
| `/api/products`          | POST/PUT/DELETE     | Admin            | Gestión de productos                |
| `/api/orders`            | POST                | Cliente          | Crear nuevo pedido                  |
| `/api/orders`            | GET                 | Cliente / Admin  | Historial de pedidos                |
| `/api/orders/:id/status` | PUT                 | Admin / Empleado | Actualización del estado del pedido |
| `/api/users`             | GET/POST/PUT/DELETE | Admin            | Gestión de usuarios                 |
| `/api/inventory/alerts`  | GET                 | Admin            | Alertas de bajo stock               |
| `/api/reports/sales`     | GET                 | Admin            | Reportes de ventas y productos      |

---

## 🎯 Buenas prácticas

* Asegura rutas con**roles y permisos** bien definidos
* Utiliza validación y sanitización de datos
* Implementa **pruebas unitarias o de integración**
* Optimiza el frontend para rendimiento (lazy loading, caché)
* Si operas en Colombia o en países con facturación electrónica obligatoria, considera integrarla en el sistema

---

## 📝 Licencia

Bajo la licencia Paola Garcia

---
