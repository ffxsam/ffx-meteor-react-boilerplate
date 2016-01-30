#!/bin/sh
echo "Doing the following:"
echo
echo "1. Removing unnecessary files/folders"
echo "2. Creating empty folder structure (lib/collections, etc)"
echo "3. Rewriting package.json"

rm -rf .git README.md

# Set up folder structure
mkdir -p lib/collections client/containers client/components

cat package.json | sed '5,11d' | sed "s/ffx-meteor-react-boilerplate/$USER-project/" | sed 's/1.0.0/0.1.0/' | sed "s/ffxsam/$USER/" | sed 's/Meteor 1.3 + React boilerplate/Description here/' > package.new.json
mv package.new.json package.json

echo
echo "Done!"
echo
