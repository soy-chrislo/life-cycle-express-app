#!/bin/bash

VOLUME_NAME=(
  "backend_app_db_dev"
  "backend_app_db_prod"
  "backend_app_db_test"
)

docker volume rm $VOLUME_NAME

echo "Volumen $VOLUME_NAME eliminado exitosamente."
