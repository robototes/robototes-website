FROM node:8
LABEL name='robototes-website' service='webhooks' version='2.0.0-alpha' maintainer='webmaster@robototes.com'

# Build arguments
ARG databaseHost='0.0.0.0'
ARG databasePort=27012

# Install our dependencies
RUN [ 'yarn', 'install', '--production', '--non-interactive' ]

# Basic configuration
ENV PORT=3000 IP='0.0.0.0' DATABASE_HOST=$databaseHost DATABASE_PORT=$databasePort

# Tell the user what ports to expose
EXPOSE 3000/tcp

# Run the server
CMD [ 'yarn', 'start' ]
