#!/bin/sh
echo
echo "NPM packages installed. Updating Meteor packages...\c"
meteor update >/dev/null
echo "done!"
echo
echo "Don't forget to do 'npm run scaffold'."
echo
