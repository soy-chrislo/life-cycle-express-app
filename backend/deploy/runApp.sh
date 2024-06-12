#!/bin/bash

docker network create test-network

docker run \
  -d \
  --name test-backend \
  -p 3000:3000 \
  -v ./env/:/home/node/app/env/ \
  -v ./logs/:/home/node/app/logs/ \
  --network test-network \
  test-backend