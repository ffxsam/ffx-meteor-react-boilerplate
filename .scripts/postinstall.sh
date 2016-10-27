#!/bin/sh
echo
echo "NPM packages installed. Updating Meteor packages..."
echo
meteor update --all-packages
echo
echo "Done! Don't forget to do 'npm run scaffold'."
echo
