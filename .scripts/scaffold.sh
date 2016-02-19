#!/bin/sh
echo "Doing the following:"
echo
echo "1. Removing unnecessary files/folders"
echo "2. meteor reset (wipes out .meteor/local)"
echo "3. Creating empty folder structure (lib/collections, etc)"
echo "4. Rewriting package.json"
echo

rm -rf .git README.md .scripts
meteor reset

# Set up folder structure
mkdir -p client/components \
  features/SomeFeature/client/components \
  features/SomeFeature/client/containers \
  features/SomeFeature/server
touch server/publications.js

cat package.json | sed '5,11d' | \
  sed "s/ffx-meteor-react-boilerplate/$USER-project/" | \
  sed 's/"version": "1.0.0"/"version": "0.1.0"/' | \
  sed "s/ffxsam/$USER/" | \
  sed 's/Meteor 1.3 + React boilerplate/Description here/' > package.new.json
mv package.new.json package.json

echo
echo "Done!"
echo
