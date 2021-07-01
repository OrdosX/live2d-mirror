#!/bin/bash
CURRENT_VERSION=$(cat latestVersion.txt)
DEPLOYED_VERSION=$(curl -s https://getl2d.ordosx.tech/latestVersion.txt)

echo $CURRENT_VERSION
echo $DEPLOYED_VERSION

if [ $DEPLOYED_VERSION = $CURRENT_VERSION ];
then
    mkdir files
    cd files
    wget -i ../latestURL.txt
    ossutil cp -rf . oss://getl2d-ordosx/
fi