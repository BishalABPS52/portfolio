const fs = require('fs');
const path = require('path');

// Find all [id] route files
const files = [
  'src/app/api/blogs/[id]/route.ts',
  'src/app/api/designs/[id]/route.ts',
  'src/app/api/essays/[id]/route.ts',
  'src/app/api/game-users/[id]/route.ts',
  'src/app/api/highscores/[id]/route.ts',
  'src/app/api/poems/[id]/route.ts',
  'src/app/api/quotes/[id]/route.ts',
  'src/app/api/videos/[id]/route.ts'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix function signatures - replace params type with Promise
    content = content.replace(
      /{ params }: { params: { id: string } }/g,
      '{ params }: { params: Promise<{ id: string }> }'
    );
    
    // Add await params destructuring at the start of each function
    content = content.replace(
      /(export async function (?:GET|PUT|DELETE)\([^}]+\) {\s*try {\s*)(?!.*const { id } = await params)/g,
      '$1\n    const { id } = await params;'
    );
    
    // Replace params.id with id
    content = content.replace(/params\.id/g, 'id');
    
    // Clean up duplicate await params lines
    content = content.replace(
      /(const { id } = await params;\s*\n\s*const { id } = await params;)/g,
      'const { id } = await params;'
    );
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed: ${file}`);
  } else {
    console.log(`❌ Not found: ${file}`);
  }
});

console.log('\n🎉 All API routes updated for Next.js 15!');
