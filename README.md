# FrontEnd Clínica Dental TrueSmile

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo-🎯">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto-🔎">Sobre el proyecto</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#vistas">Vistas</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo 🎯
El objetivo de este proyecto es generar un Frontend que pueda conectarse a un Backend ya generado anteriormente y poder gestionar su base de datos mediante solicitudes HTTP

## Sobre el proyecto 🔎
El proyecto es un frontEnd de una clínica dental, donde los visitantes a la web pueden registrarse y mediante su usuario podrán crear, visualizar y eliminar citas de las intervenciones dentales ofrecidas por la clínica. La web tiene tres tipos de usuario con distintos permisos:
    - Cliente
    - Dentista
    - Administrador
  
Mediante el login con sus credenciales, los tres tipos de usuarios podrán revisar sus datos en la vista datos de perfil de usuario.

Clientes y dentistas podrán ver únicamente sus citas, en cambio el administrador podrá revisar las citas tanto de todos los clientes como de todos los dentistas.

Solamente podrán crear citas los usuarios clientes, sin embargo si que podrán elimiar citas los tres tipos de usuario.

El usuario administrador, además también podrá ver la información de todos los perfiles de usuario que existan en la base de datos.

Todos los campos de entrada de datos del login de ususario, registro de usuario y registro de cita tienen su control de errores.
  
## Deploy 🚀
<div align="center">
    <a href="https://front-end-clinica-dental-true-smile.vercel.app/"><strong>Url a producción </strong></a>🚀🚀🚀
</div>

## Stack
<div align="center">
<a href="https://www.reactjs.com/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>
<a href="https://www.postman.com">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
</a>
<a href="https://vercel.com/">
    <img src= "https://img.shields.io/badge/railway-%23000000.svg?style=for-the-badge&logo=railway&logoColor=white"/>
</a><br>
<a href="https://developer.mozilla.org/es/docs/Web/HTML">
    <img src= "https://img.shields.io/badge/HTML5-FF6C37?style=for-the-badge&logo=HTML5&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/CSS">
    <img src= "https://img.shields.io/badge/css-1D7CF2?style=for-the-badge&logo=css3&logoColor=white"/>
</a>
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white"/>
</a>
<a href="https://nextjs.org/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
 </div>

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. ``` $ npm run dev ```

## Vistas
Home

<img src="./src/img/Screenshot_1.jpg">

Register

<img src="./src/img/Screenshot_2.jpg">

Login

<img src="./src/img/Screenshot_3.jpg">

Profile

<img src="./src/img/Screenshot_4.jpg">

Crear citas

<img src="./src/img/Screenshot_6.jpg">

Revisar citas

<img src="./src/img/Screenshot_5.jpg">

## Futuras funcionalidades
✅ Crear cita mediante botones seleccionables
⬜ Editar campos del perfil de usuario
⬜ Filtar citas mediante buscador
 

## Licencia
Este proyecto se encuentra bajo licencia MIT
 

## Contacto

<a href = "mailto:rgolfe81@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/ruben-golfe/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>
