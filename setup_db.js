const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env
const envPath = './.env';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  console.log('Checking storage bucket...');
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
    } else {
      console.log('Current buckets:', buckets.map(b => b.name));
      const hasBucket = buckets.some(b => b.name === 'analytics-screenshots');
      if (!hasBucket) {
        console.log('Creating bucket analytics-screenshots...');
        const { data, error } = await supabase.storage.createBucket('analytics-screenshots', {
          public: false, // private bucket as signed URLs are required
          fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
        });
        if (error) {
          console.error('Error creating bucket:', error);
        } else {
          console.log('Bucket created successfully:', data);
        }
      } else {
        console.log('Bucket analytics-screenshots already exists.');
      }

      const hasProofsBucket = buckets.some(b => b.name === 'verification-proofs');
      if (!hasProofsBucket) {
        console.log('Creating bucket verification-proofs...');
        const { data, error } = await supabase.storage.createBucket('verification-proofs', {
          public: false, // private bucket
          fileSizeLimit: 2 * 1024 * 1024, // 2MB limit
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
        });
        if (error) {
          console.error('Error creating verification-proofs bucket:', error);
        } else {
          console.log('Bucket verification-proofs created successfully:', data);
        }
      } else {
        console.log('Bucket verification-proofs already exists.');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
