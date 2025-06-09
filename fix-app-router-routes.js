const fs = require('fs');

const routeFiles = [
  'src/app/api/designs/[id]/route.ts',
  'src/app/api/essays/[id]/route.ts',
  'src/app/api/game-users/[id]/route.ts',
  'src/app/api/highscores/[id]/route.ts',
  'src/app/api/poems/[id]/route.ts',
  'src/app/api/quotes/[id]/route.ts',
  'src/app/api/videos/[id]/route.ts'
];

routeFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix GET function signature
  content = content.replace(
    /export async function GET\(\s*request: NextRequest,\s*(?:{ params }: { params: (?:Promise<)?\{ id: string \}(?: }\)?)? }\s*\)/g,
    'export async function GET(\n  request: NextRequest,\n  context: { params: { id: string } }\n)'
  );

  // Fix PUT function signature
  content = content.replace(
    /export async function PUT\(\s*request: NextRequest,\s*(?:{ params }: { params: (?:Promise<)?\{ id: string \}(?: }\)?)? }\s*\)/g,
    'export async function PUT(\n  request: NextRequest,\n  context: { params: { id: string } }\n)'
  );

  // Fix DELETE function signature
  content = content.replace(
    /export async function DELETE\(\s*request: NextRequest,\s*(?:{ params }: { params: (?:Promise<)?\{ id: string \}(?: }\)?)? }\s*\)/g,
    'export async function DELETE(\n  request: NextRequest,\n  context: { params: { id: string } }\n)'
  );

  // Fix the await params extraction
  content = content.replace(
    /const { id } = await params;/g,
    'const id = context.params.id;'
  );

  // Fix any remaining params.id references
  content = content.replace(/params\.id/g, 'context.params.id');

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed: ${filePath}`);
});

console.log('All route files have been updated with the correct Next.js App Router signature');
