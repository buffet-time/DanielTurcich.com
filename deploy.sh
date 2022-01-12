#!/usr/bin/env sh

# abort on errors
set -e

# set email and user
git config --global init.defaultBranch "master"
git config --global user.email "github@danielTurcich.com"
git config --global user.name "buffet-time"

# build
npm install
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/buffet-time/DanielTurcich.com.git master:gh-pages

cd -