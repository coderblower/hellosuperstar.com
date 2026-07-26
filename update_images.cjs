const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'resources', 'views');

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

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Match <img ... src="/assets/images/something.ext" ... >
    // We will use a regex to find all <img ...> tags
    const imgRegex = /<img\s+[^>]*>/g;
    
    let modified = false;
    content = content.replace(imgRegex, (imgTag) => {
        // Only process images from /assets/images/ that don't end in -min.ext
        if (!imgTag.includes('src="/assets/images/')) return imgTag;
        if (imgTag.includes('-min.')) return imgTag; // Already lazy
        
        // Extract the src
        const srcMatch = imgTag.match(/src="(\/assets\/images\/[^"]+)"/);
        if (!srcMatch) return imgTag;
        
        const originalSrc = srcMatch[1];
        
        // Build minified src
        const ext = path.extname(originalSrc);
        const baseName = path.basename(originalSrc, ext);
        const minifiedSrc = `/assets/images/${baseName}-min${ext}`;
        
        // Replace src with minified src and add data-src
        let newImgTag = imgTag.replace(`src="${originalSrc}"`, `src="${minifiedSrc}" data-src="${originalSrc}"`);
        
        // Add lazy-image class
        if (newImgTag.includes('class="')) {
            newImgTag = newImgTag.replace('class="', 'class="lazy-image ');
        } else {
            newImgTag = newImgTag.replace('<img ', '<img class="lazy-image" ');
        }
        
        modified = true;
        return newImgTag;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function main() {
    const files = getFiles(viewsDir);
    for (const file of files) {
        processFile(file);
    }
    console.log("Blade templates updated.");
}

main();
