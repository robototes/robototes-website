FROM node:8
LABEL name='robototes-website' service='webhooks' version='2.0.0-alpha' maintainer='dannytech@users.noreply.github.com'

# Install our dependencies
RUN [ 'yarn', 'install', '--production', '--non-interactive' ]

# Copy the server files
COPY server.js package.json yarn.lock webhooks/ ./

# Basic configuration
ENV PORT=3000 IP='0.0.0.0' DATABASE_HOST='0.0.0.0' DATABASE_IP=27012

# Tell the user what ports to expose
EXPOSE 3000/tcp

# Run the server
CMD [ 'node', 'server.js' ]
