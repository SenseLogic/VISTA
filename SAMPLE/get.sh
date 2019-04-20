#!/bin/sh
set -x
curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
sudo apt install nodejs
nodejs --version
npm --version
sudo npm install stylus -g
