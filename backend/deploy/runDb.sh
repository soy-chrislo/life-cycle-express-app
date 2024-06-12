#!/bin/bash

docker network create test-network

docker run \
  --rm -d \
  --name test-db \
  -p 5432:5432 \
  -e POSTGRES_USER='d80F.p<pK>s7:0_`G{[MaOpoXa/R,o-M7pn}8#,JiunYQnDM(' \
  -e POSTGRES_PASSWORD='r43V.(aTxM$&Fx£33REl+=^t/E~@MaxI358/24*gGW0?vX' \
  -e POSTGRES_DB=app \
  -v postgres_data_prod:/var/lib/postgresql/data \
  --network test-network \
  postgres:alpine