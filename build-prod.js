const fs = require('fs');
const path = require('path');

// Production build system for fluxlove portfolio
console.log('🚀 Building optimized production version...\n');

// Create dist directory
const distDir = 'dist';
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Create subdirectories
const subdirs = ['css', 'js', 'pages', 'assets'];
subdirs.forEach(dir => {
    fs.mkdirSync(path.join(distDir, dir), { recursive: true });
});

// Copy function with optimization
function copyRecursiveSync(src, dest, shouldOptimize = false) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName),
                shouldOptimize
            );
        });
    } else {
        if (shouldOptimize) {
            optimizeFile(src, dest);
        } else {
            fs.copyFileSync(src, dest);
        }
    }
}

// File optimization function
function optimizeFile(src, dest) {
    const ext = path.extname(src).toLowerCase();
    const content = fs.readFileSync(src, 'utf8');
    
    switch (ext) {
        case '.css':
            const CleanCSS = require('clean-css');
            const optimizedCSS = new CleanCSS({
                level: 2,
                returnPromise: false
            }).minify(content);
            fs.writeFileSync(dest, optimizedCSS.styles);
            console.log(`✓ Optimized CSS: ${path.basename(src)} (${getCompressionRatio(content, optimizedCSS.styles)}% smaller)`);
            break;
            
        case '.js':
            const { minify } = require('terser');
            minify(content, {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log', 'console.info', 'console.debug']
                },
                mangle: true,
                format: {
                    comments: false
                }
            }).then(result => {
                fs.writeFileSync(dest, result.code);
                console.log(`✓ Optimized JS: ${path.basename(src)} (${getCompressionRatio(content, result.code)}% smaller)`);
            }).catch(err => {
                console.warn(`⚠ Could not optimize ${src}:`, err.message);
                fs.copyFileSync(src, dest);
            });
            break;
            
        case '.html':
            const { minify: minifyHTML } = require('html-minifier');
            try {
                const optimizedHTML = minifyHTML(content, {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    minifyCSS: true,
                    minifyJS: true
                });
                fs.writeFileSync(dest, optimizedHTML);
                console.log(`✓ Optimized HTML: ${path.basename(src)} (${getCompressionRatio(content, optimizedHTML)}% smaller)`);
            } catch (err) {
                console.warn(`⚠ Could not optimize ${src}:`, err.message);
                fs.copyFileSync(src, dest);
            }
            break;
            
        default:
            fs.copyFileSync(src, dest);
            break;
    }
}

function getCompressionRatio(original, optimized) {
    return Math.round((1 - optimized.length / original.length) * 100);
}

// Copy and optimize source files
console.log('📦 Copying and optimizing source files...');
copyRecursiveSync('src', distDir, true);

// Process root index.html
console.log('🏠 Processing root index.html...');
optimizeFile('index.html', path.join(distDir, 'index.html'));

// Update paths in the optimized index.html
let indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Fix paths for production
indexContent = indexContent.replace(/href="src\//g, 'href="');
indexContent = indexContent.replace(/src="src\//g, 'src="');
indexContent = indexContent.replace(/href="src\/pages\//g, 'href="pages/');

// Add production optimizations to HTML
indexContent = indexContent.replace(
    '<head>',
    `<head>
    <!-- Preload critical resources -->
    <link rel="preload" href="css/main.css" as="style">
    <link rel="preload" href="js/main-new.js" as="script">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style">
    
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">`
);

// Write the updated index.html
fs.writeFileSync(path.join(distDir, 'index.html'), indexContent);

// Create a simple asset manifest
const manifest = {
    name: "fluxlove Portfolio",
    short_name: "fluxlove",
    description: "Strategic Communicator • Visual Storyteller • Artist",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#7c3aed",
    icons: [
        {
            src: "assets/images/icon-192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: "assets/images/icon-512.png",
            sizes: "512x512",
            type: "image/png"
        }
    ]
};

fs.writeFileSync(path.join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Create robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://fluxlove.com/sitemap.xml`;

fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

// Create basic sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://fluxlove.com/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://fluxlove.com/pages/art-new.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://fluxlove.com/pages/films-new.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://fluxlove.com/pages/music-new.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://fluxlove.com/pages/poetry-new.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://fluxlove.com/pages/about-new.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

console.log('\n🎉 Production build completed successfully!');
console.log('📊 Build summary:');
console.log(`   📁 Output directory: ${distDir}/`);
console.log('   ✅ Files optimized and minified');
console.log('   ✅ Paths updated for production');
console.log('   ✅ Manifest.json created');
console.log('   ✅ Robots.txt created');
console.log('   ✅ Sitemap.xml created');
console.log('\n🚀 Ready for deployment!');
