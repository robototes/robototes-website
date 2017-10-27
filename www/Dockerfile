FROM node:8
LABEL name="robototes-website" service="web" version="2.0.0-alpha" maintainer="webmaster@robototes.com"

# Copy the server files
COPY . /robototes-website-web
WORKDIR /robototes-website-web

# Install our dependencies
RUN [ "yarn", "install", "--production", "--non-interactive", "--pure-lockfile" ]

# Basic configuration
ENV PORT=3000 IP="0.0.0.0"

# Tell the user what ports to expose
EXPOSE 3000/tcp

CMD [ "yarn", "start" ]
