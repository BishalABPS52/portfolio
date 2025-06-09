const fs = require('fs');
const path = require('path');

// List of files to fix
const files = [
  'src/app/api/highscores/[id]/route.ts',
  'src/app/api/game-users/[id]/route.ts',
  'src/app/api/poems/[id]/route.ts',
  'src/app/api/designs/[id]/route.ts',
  'src/app/api/quotes/[id]/route.ts',
  'src/app/api/essays/[id]/route.ts'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix context parameter type and variable extraction
    content = content.replace(
      /context: { params: { id: string } }/g,
      'context: { params: Promise<{ id: string }> }'
    );
    
    content = content.replace(
      /const id = context\.params\.id;/g,
      'const params = await context.params;\n    const id = params.id;'
    );
    
    content = content.replace(
      /const id = context\.id;/g,
      'const params = await context.params;\n    const id = params.id;'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('All API routes fixed!');
