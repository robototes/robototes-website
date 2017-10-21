FROM node:8
LABEL name='robototes-website' service='www' version='2.0.0-alpha' maintainer='webmaster@robototes.com'

# Build arguments
ARG domain='robototes.com'
ARG hpkpHashes='lCppFqbkrlJ3EcVFAkeip0+44VaoJUymbnOaEUk7tEU=,58qRu/uxh4gFezqAcERupSkRYBlBAvfcw7mEjGPLnNU=,grX4Ta9HpZx6tSHkmCrvpApTQGo67CYDnvprLg5yRME=,klO23nT2ehFDXCfx3eHTDRESMz3asj1muO+4aIdjiuY=,x9SZw6TwIqfmvrLZ/kz1o0Ossjmn728BnBKpUFqGNVM=,tey1EE7fk3hATntrqvJd0pRDLpjqawZ7YSlOiA/staQ='
ARG analyticsId='UA-84502206-1'

# Install our dependencies
RUN [ 'yarn', 'install', '--production', '--non-interactive' ]

# Copy the server files
COPY server.js package.json yarn.lock views/ routes/ configs/ ./

# Basic configuration
ENV PORT=3000 IP='0.0.0.0' DOMAIN=$domain HPKP_HASHES=$hpkpHashes G_TRACKING_ID=$analyticsId

# Tell the user what ports to expose
EXPOSE 3000/tcp

CMD [ 'yarn', 'start' ]
