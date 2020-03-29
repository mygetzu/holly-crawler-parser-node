#!/bin/bash
git pull origin master
ps aux | grep 'node /home/mygetzu/projects/holly-crawler-parser-node/node_modules/.bin/ts-node' | grep -v grep | awk '{print $2}' | xargs kill
nohup npm run start &