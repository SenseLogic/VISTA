#!/bin/sh
sudo apt install curl python-software-properties build-essential gcc g++
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g npm
sudo npm install -g stylus
sudo npm install -g http-server

