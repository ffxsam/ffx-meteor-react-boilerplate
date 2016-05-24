#!/bin/sh
echo "Doing the following:"
echo
echo "1. Rewriting package.json"
echo "2. Removing unnecessary files/folders"
echo "3. meteor reset (wipes out .meteor/local)"
echo

cp .scripts/package-dist.json package.json

rm -rf .git README.md .scripts
meteor reset

echo
echo "Done!"
echo
