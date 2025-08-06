const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = 'dist';
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy function
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                            path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy all src files to dist
console.log('Copying src files to dist...');
copyRecursiveSync('src', distDir);

// Copy root index.html to dist
console.log('Copying root index.html...');
fs.copyFileSync('index.html', path.join(distDir, 'index.html'));

// Update the root index.html paths to work from dist
console.log('Updating paths in index.html...');
let indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Fix CSS paths
indexContent = indexContent.replace(/href="src\//g, 'href="');
// Fix JS paths  
indexContent = indexContent.replace(/src="src\//g, 'src="');
// Fix navigation paths
indexContent = indexContent.replace(/href="src\/pages\//g, 'href="pages/');

// Write updated index.html
fs.writeFileSync(path.join(distDir, 'index.html'), indexContent);

// Update navigation in all pages to point to root index.html
console.log('Updating navigation in all pages...');
const pagesDir = path.join(distDir, 'pages');
if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir).forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(pagesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Fix navigation to point to root
            content = content.replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="../index.html"');
            content = content.replace(/href="\.\.\/index\.html"/g, 'href="../index.html"');
            
            fs.writeFileSync(filePath, content);
        }
    });
}

console.log('Build complete! Files ready for deployment in dist folder.');
