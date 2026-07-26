const fs = require('fs');
const path = require('path');
const https = require('https');

const viewsDir = path.join(__dirname, 'resources', 'views');
const imagesDir = path.join(__dirname, 'public', 'assets', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(destPath)) {
            resolve();
            return;
        }
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => {});
            reject(err);
        });
    });
}

async function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /https:\/\/hellosuperstar\.com\/wp-content\/uploads\/[a-zA-Z0-9\/\-_@.]+/g;
    
    let matches = content.match(regex);
    if (!matches) return;
    
    // Deduplicate matches
    matches = [...new Set(matches)];
    
    let modified = false;
    for (const url of matches) {
        // Extract just the filename to save it locally
        const filename = path.basename(url);
        const destPath = path.join(imagesDir, filename);
        
        console.log(`Downloading ${url} to ${filename}...`);
        try {
            await downloadImage(url, destPath);
            // Replace globally in the content
            const localUrl = `/assets/images/${filename}`;
            content = content.split(url).join(localUrl);
            modified = true;
        } catch (e) {
            console.error(`Error downloading ${url}:`, e);
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else if (name.endsWith('.blade.php')) {
            files.push(name);
        }
    }
    return files;
}

async function main() {
    const files = getFiles(viewsDir);
    for (const file of files) {
        await processFile(file);
    }
    console.log("Done!");
}

main();
