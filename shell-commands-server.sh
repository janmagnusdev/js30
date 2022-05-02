#!/bin/bash

# requires js-thirty container to run
# should be used directly from shell of server
# in directory js30
IMAGE_ID=$(docker ps -qf name=js-thirty)
docker cp ./ "${IMAGE_ID}":/usr/share/nginx/html/
rm -r /tmp/js30-deploy