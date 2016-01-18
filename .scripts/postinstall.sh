#!/bin/sh
echo
echo "NPM packages installed. Updating Meteor packages...\c"
meteor update >/dev/null
echo "done!"

echo "Setting up folder structure...\c"

rm -rf .git
echo "All set! Be sure to edit package.json to your needs."
echo
