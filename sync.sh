#!/bin/bash

# Sincronizar el directorio de trabajo con el servidor de pruebas
rsync -av --delete /root/proyectos/vgr-event-manager/ /var/www/html/vgr-event-managerw/

# Mensaje de finalización
echo "Sincronización completada."
