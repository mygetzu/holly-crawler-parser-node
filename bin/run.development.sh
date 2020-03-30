#!/bin/bash
pm2 stop holly-crawler
git pull origin master
npm run build
pm2 start holly-crawler
