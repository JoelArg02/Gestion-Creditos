# Usar la imagen oficial de Node.js como imagen base. "node:latest" siempre tendrá la última versión estable de Node.js y npm.
FROM node:latest

# Instalar dependencias necesarias para Chrome y Puppeteer, y también nano
RUN apt-get update && apt-get install -y wget gnupg2 ca-certificates procps libxss1 \
    libappindicator1 libappindicator3-1 fonts-liberation libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 \
    libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils libgbm1 \
    libxshmfence1 nano --no-install-recommends

# Descargar e instalar la última versión de Google Chrome para Puppeteer
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# Configurar el entorno de trabajo para el backend
WORKDIR /app/backend

# Copiar el `package.json` y `package-lock.json` (si está disponible) al directorio de trabajo
COPY backend/package*.json ./

# Instalar las dependencias del proyecto definidas en el package.json
RUN npm install

# Copiar el resto del código fuente del proyecto en el directorio de trabajo del contenedor
COPY backend/ .

# Configurar Puppeteer para que se ejecute como un usuario no root por razones de seguridad
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Cambiar a un usuario no root
USER pptruser

# Dejar el contenedor corriendo para que puedas ejecutar comandos manualmente
CMD ["tail", "-f", "/dev/null"]
