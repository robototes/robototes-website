FROM node:8
LABEL name="robototes-website" service="web" version="2.0.0-alpha" maintainer="webmaster@robototes.com"

# Install our dependencies
RUN [ "yarn", "install", "--production", "--non-interactive" ]

# Copy the server files
COPY server.js package.json yarn.lock views/ routes/ configs/ ./

# Basic configuration
ENV PORT=3000 IP="0.0.0.0"

# Tell the user what ports to expose
EXPOSE 3000/tcp

CMD [ "yarn", "start" ]
