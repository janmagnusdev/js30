#!/bin/bash
# exclude dot files, see https://stackoverflow.com/questions/1228466/how-to-filter-files-when-using-scp-to-copy-dir-recursively
scp -r [!.]* homeserver:/tmp/js30-deploy
ssh homeserver '/bin/bash -s' < ./shell-commands-server.sh