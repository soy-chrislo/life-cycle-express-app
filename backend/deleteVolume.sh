#!/bin/bash

VOLUME_NAME="backend_postgres_data"

docker volume rm $VOLUME_NAME

echo "Volumen $VOLUME_NAME eliminado exitosamente."
