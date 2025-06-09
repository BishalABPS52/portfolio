#!/bin/bash

# Find all [id] route files
echo "Checking for any remaining params.id references in route files..."

grep -r "params.id" --include="*.ts" src/app/api/

echo "Checking for any remaining { params } function signatures in route files..."

grep -r "{ params }: { params:" --include="*.ts" src/app/api/

echo "Done!"
