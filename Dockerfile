FROM node:latest

RUN apt-get update && apt-get install -y wget gnupg2 ca-certificates procps libxss1 \
    libappindicator1 libappindicator3-1 fonts-liberation libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 \
    libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils libgbm1 \
    libxshmfence1 nano --no-install-recommends

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

RUN apt-get upgrade

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

CMD ["tail", "-f", "/dev/null"]
