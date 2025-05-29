/**
 * Environment Variable Validation Utility
 * Ensures all required environment variables are present at startup
 */

import config from './config.js';

export default function validateEnv() {
  const missingVars = [];
  
  // Check for required environment variables
  for (const envVar of config.requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }
  
  // If any variables are missing, log an error and exit
  if (missingVars.length > 0) {
    console.error('❌ Error: Missing required environment variables:');
    missingVars.forEach(variable => {
      console.error(`  - ${variable}`);
    });
    console.error('\nPlease add these variables to your .env file and restart the bot.');
    console.error('See .env.example for reference.');
    
    // Exit with error code
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated successfully.');
  return true;
}