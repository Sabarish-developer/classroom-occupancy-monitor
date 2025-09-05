FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY src ./src
COPY keys/public.key ./keys/public.key  # only public key, safe
# private.key will come from Render secret file, not copied

EXPOSE 8080

CMD ["node", "src/index.js"]
