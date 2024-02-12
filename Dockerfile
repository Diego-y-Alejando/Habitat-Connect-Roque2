# Usa la imagen oficial de Node.js como imagen base
FROM node:18.14.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /habitad-connet-mvp-app

# Copia los archivos de definición de paquetes para la caché de capas
COPY package.json .

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos y directorios restantes al directorio de trabajo
COPY . .

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
