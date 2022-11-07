ARG NODE_VERSION=16
ARG DEBIAN_VERSION=buster

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as development

WORKDIR /winsoft-app

EXPOSE 3000

ENTRYPOINT ["bash", "-c"]

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as builder

WORKDIR /winsoft-app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN npm ci --ignore-scripts

COPY src src

RUN npm run build

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as release

WORKDIR /winsoft-app

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN mkdir /winsoft-app/tts && \
    addgroup --gid 1001 --system winsoft && \
    adduser --system --uid 1001 --gid 1001 winsoft && \
    chown -R winsoft:winsoft /winsoft-app && \
    chown winsoft:winsoft /tini

RUN mkdir -p /var/logs/winsoft && \
    chown -R winsoft:winsoft /var/logs/winsoft

COPY --chown=winsoft:winsoft --from=builder /winsoft-app/package.json package.json
COPY --chown=winsoft:winsoft --from=builder /winsoft-app/node_modules node_modules
COPY --chown=winsoft:winsoft --from=builder /winsoft-app/dist dist

USER 1001:1001

CMD ["node", "dist/src/http-server.js"]
