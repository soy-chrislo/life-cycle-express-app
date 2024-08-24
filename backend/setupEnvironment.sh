#!/bin/bash

sudo chmod -R 777 ./postgres/logs
# sudo chown -R :avahi ./postgres/logs
# sudo find ./postgres/logs -type d -exec chmod 770 {} \;
# sudo find ./postgres/logs -type f -exec chmod 660 {} \;
# sudo chmod g+s ./postgres/logs


# sudo usermod -aG avahi $(whoami)
# newgrp avahi
