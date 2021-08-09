FROM node:12.18-alpine

ENV NODE_ENV = production

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ENV DOMAIN http://localhost:3001
ENV REACT_APP_LOGIN $DOMAIN/login
ENV REACT_APP_QUERY $DOMAIN/query
ENV REACT_APP_REGISTER $DOMAIN/sign-in


WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
