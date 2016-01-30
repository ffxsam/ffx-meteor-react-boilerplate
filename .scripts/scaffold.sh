#!/bin/sh
git checkout -f master
rm -rf .git README.md

# Set up folder structure
mkdir -p lib/collections
