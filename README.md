# Portafolio Personal Interactivo

Sitio estático hecho con **HTML5 + CSS3 + JavaScript**. Incluye:
- Menú hamburguesa responsive
- Barras de progreso animadas con IntersectionObserver
- Cards de proyectos con modal accesible
- Formulario de contacto con validación en tiempo real
- Maquetación con CSS Grid / Flexbox, variables CSS y diseño responsivo

## Estructura de directorios
```
Angelina_Valle_Portafolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── profile.svg
│       ├── project1.svg
│       ├── project2.svg
│       └── project3.svg
└── README.md
```

## Cómo ejecutar
Abre `index.html` en tu navegador.

## Comandos Git sugeridos
```bash
# 1) Inicializa y primer commit
git init
git add .
git commit -m "feat: portafolio base (HTML, CSS, JS)"
# 2) Configura rama principal y remoto
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
# 3) Sube tu trabajo
git push -u origin main
# 4) Para actualizar cambios posteriores
git add .
git commit -m "chore: mejoras de estilos y accesibilidad"
git push
```
