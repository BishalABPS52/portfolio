#!/bin/bash

# Fix all remaining API route files for Next.js 15 compatibility

files=(
  "src/app/api/highscores/[id]/route.ts"
  "src/app/api/game-users/[id]/route.ts"
  "src/app/api/poems/[id]/route.ts"
  "src/app/api/quotes/[id]/route.ts"
  "src/app/api/essays/[id]/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Fix the context parameter type
    sed -i 's/context: { params: { id: string } }/context: { params: Promise<{ id: string }> }/g' "$file"
    
    # Fix the variable extraction
    sed -i 's/const id = context\.params\.id;/const params = await context.params;\n    const id = params.id;/g' "$file"
    
    # Fix context.id references
    sed -i 's/const id = context\.id;/const params = await context.params;\n    const id = params.id;/g' "$file"
    
    echo "Fixed $file"
  else
    echo "File not found: $file"
  fi
done

echo "All API routes fixed!"
