#!/bin/sh
echo "Doing the following:"
echo
echo "1. Rewriting package.json"
echo "2. Removing unnecessary files/folders"
echo "3. meteor reset (wipes out .meteor/local)"
echo "4. Creating empty folder structure (lib/collections, etc)"
echo

cp .scripts/package-dist.json package.json

rm -rf .git README.md .scripts
meteor reset

# Set up folder structure
mkdir -p client/components \
  features/SomeFeature/client/components \
  features/SomeFeature/client/containers \
  features/SomeFeature/lib \
  features/SomeFeature/server
touch server/publications.js

echo
echo "Done!"
echo
