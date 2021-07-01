#!/bin/bash
CURRENT_VERSION=$(cat latestVersion.txt)
DEPLOYED_VERSION=$(curl -s https://getl2d.ordosx.tech/latestVersion.txt)

if [ $DEPLOYED_VERSION = $CURRENT_VERSION ];
then
    wget -i latestURL.txt
fi