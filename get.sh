#!/bin/sh
sudo apt install curl python-software-properties build-essential gcc g++
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g stylus
