# Usa la imagen oficial de Node.js como imagen base
FROM node:18.14.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes para la caché de capas
COPY . .

# Instala las dependencias de la aplicación
RUN npm install



# Comando para ejecutar la aplicación
CMD ["npm", "start"]

