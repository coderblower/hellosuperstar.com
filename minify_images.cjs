const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'assets', 'images');

async function main() {
    const files = fs.readdirSync(imagesDir);
    
    for (const file of files) {
        // Skip already minified images
        if (file.includes('-min.')) continue;
        
        const ext = path.extname(file);
        // Only process standard images
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase())) continue;
        
        const baseName = path.basename(file, ext);
        const minifiedName = `${baseName}-min${ext}`;
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(imagesDir, minifiedName);
        
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping ${file}, minified version exists.`);
            continue;
        }
        
        console.log(`Processing ${file}...`);
        try {
            await sharp(inputPath)
                .resize({ width: 20 }) // 20px width is enough for a blur-up placeholder
                .toFile(outputPath);
            console.log(`Created ${minifiedName}`);
        } catch (e) {
            console.error(`Error processing ${file}:`, e);
        }
    }
    
    console.log("Image minification complete.");
}

main();
