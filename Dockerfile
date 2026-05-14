# 1. Image de base
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

# Déclarer l'ARG pour le build
ARG GROQ_API_KEY
ENV GROQ_API_KEY=$GROQ_API_KEY

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]