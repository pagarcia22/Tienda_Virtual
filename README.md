# Tienda Virtual (demo)

Demo de una tienda en línea de productos de la canasta familiar, hecha con Next.js, React y TypeScript. Este repositorio contiene la **interfaz (frontend)**; no incluye backend, base de datos ni pasarela de pagos.

## Qué incluye

- Catálogo de productos con categorías y subcategorías.
- Búsqueda por nombre, filtro por rango de precio y ordenamiento.
- Vista en cuadrícula o en lista.
- Lista de favoritos.
- Carrito de compras.
- Proceso de compra en varios pasos con formulario de datos y número de pedido al finalizar.

## Tecnologías

Next.js 15 · React 19 · TypeScript · Tailwind CSS · shadcn/ui

## Instalación

```bash
git clone https://github.com/pagarcia22/Tienda_Virtual.git
cd Tienda_Virtual
pnpm install      # o: npm install
pnpm dev          # o: npm run dev
```

Abre `http://localhost:3000`.

## Estado del proyecto

Proyecto de práctica. Los datos de los productos y los pedidos se manejan en la propia aplicación.

## Próximos pasos

- Backend con API REST y base de datos (productos, usuarios, pedidos).
- Autenticación y roles (cliente y administrador).
- Pasarela de pagos.
