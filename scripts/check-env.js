#!/usr/bin/env node

/**
 * Environment variables check script for Vercel deployment
 * This script helps ensure all required environment variables are set
 */

const requiredEnvVars = [
  'MONGODB_URI',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

const optionalEnvVars = [
  'NODE_ENV',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD'
];

console.log('🔍 Checking environment variables...\n');

let missingRequired = [];
let presentOptional = [];

// Check required variables
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Present`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    missingRequired.push(varName);
  }
});

console.log('\n📋 Optional variables:');
// Check optional variables
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Present`);
    presentOptional.push(varName);
  } else {
    console.log(`⚪ ${varName}: Not set`);
  }
});

console.log('\n📊 Summary:');
console.log(`Required variables: ${requiredEnvVars.length - missingRequired.length}/${requiredEnvVars.length} present`);
console.log(`Optional variables: ${presentOptional.length}/${optionalEnvVars.length} present`);

if (missingRequired.length > 0) {
  console.log('\n⚠️  Missing required environment variables:');
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n🔧 Please set these variables in your Vercel dashboard:');
  console.log('   https://vercel.com/dashboard/project-name/settings/environment-variables');
  process.exit(1);
} else {
  console.log('\n🎉 All required environment variables are present!');
  process.exit(0);
}
