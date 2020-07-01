set -e
yarn build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:faytw/notes-my-daliy-kin.git master:gh-pages
cd -
