const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../manifest.base.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const isDev = process.env.NODE_ENV === 'dev';
const privateKey = process.env.EXTENSION_PRIVATE_KEY;

/**
 * set env variable:
        
    export NODE_ENV=development
    export EXTENSION_PRIVATE_KEY="your-private-key-content-here"

    private key is generated by: openssl genpkey -algorithm RSA -out extension-key.pem -pkeyopt rsa_keygen_bits:2048

    This is for cloud sync feature testing. Need to include a private key in manifest.json 
    to let the local deployed Leetcode-Mastery-Scheduler instances in different devices share the same extension id, by which sync data will be
    shared across instances.
 * 
 */

if (isDev && privateKey) {
  manifest.key = privateKey;
}

const outputPath = path.join(__dirname, '../', 'manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`Manifest generated for ${isDev ? 'development' : 'production'} environment`);
