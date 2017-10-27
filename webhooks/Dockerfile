FROM node:8
LABEL name="robototes-website" service="api" version="2.0.0-alpha" maintainer="webmaster@robototes.com"

# Copy the server files
COPY . /robototes-website-api
WORKDIR /robototes-website-api

# Install our dependencies
RUN [ "yarn", "install", "--production", "--non-interactive", "--pure-lockfile" ]

# Basic configuration
ENV PORT=3000 IP="0.0.0.0"

# Tell the user what ports to expose
EXPOSE 3000/tcp

# Run the server
CMD [ "yarn", "start" ]
