#!/bin/bash

set -e

for i in `find -name "*.js" -not -path "./node_modules/*"`; do
    node -c $i
done
