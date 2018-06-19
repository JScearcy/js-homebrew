# Set the base image to node
FROM node
ENV LZZ_COMPAT=1

# Provides cached layer for node_modules
ADD ./js-homebrew-recipe-server/package.json /tmp/server/package.json
RUN cd /tmp/server && npm install

ADD ./js-homebrew-recipe-client/package.json /tmp/client/package.json
RUN cd /tmp/client && npm install

# Define working directory
RUN mkdir -p /src
WORKDIR /src
ADD . /src
RUN cp -a /tmp/client/node_modules ./js-homebrew-recipe-client
RUN cp -a /tmp/server/node_modules ./js-homebrew-recipe-server
RUN npm run build

# Expose port
ENV PORT=3001
EXPOSE 3001

# Run app using npm
CMD ["npm", "start"]
