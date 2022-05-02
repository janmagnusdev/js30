#!/bin/bash
rsync --recursive --compress --delete --progress ./ homeserver:/tmp/js30-deploy
scp -r [!.]* homeserver:/tmp/js30-deploy
#ssh homeserver '/bin/bash -s' < ./shell-commands-server.sh