#!/bin/bash
CURRENT_VERSION=$(cat latestVersion.txt)
DEPLOYED_VERSION=$(curl -s https://getl2d.ordosx.tech/latestVersion.txt)

if [ $DEPLOYED_VERSION != $CURRENT_VERSION ];
then
    mkdir files
    wget -q -i latestURL.txt -P files/
    ossutil cp -rf files/ oss://getl2d-ordosx/files/
    ossutil cp -f versions.json oss://getl2d-ordosx/
    ossutil cp -f latestVersion.txt oss://getl2d-ordosx/
fi