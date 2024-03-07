FROM node:18-alpine

ENV NODE_ENV=development

RUN apk add --no-cache libc6-compat

WORKDIR /app

CMD ["npm", "run", "dev"]
