# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack
- **Jekyll** static site generator with **Type on Strap** theme
- **Ruby** for Jekyll ecosystem (gems: jekyll-paginate, jekyll-seo-tag, jekyll-feed)
- **Node.js** for asset management via **Gulp** (tasks: webp, imagemin, js/css minification)
- **Sass** for styling, organized in `_sass/` directory
- **Markdown** for content authoring

## Key Commands

### Development & Build
```bash
# Local development server
bundle exec jekyll serve

# Asset optimization (from assets/ directory)
cd assets && gulp webp          # Convert images to WebP format
cd assets && gulp img           # Optimize images with imagemin
cd assets && gulp js            # Minify JavaScript
cd assets && gulp css           # Minify CSS
cd assets && gulp default       # Run all optimization tasks

# Create new blog post (from assets/ directory)
cd assets && gulp post -n "Post Title"
```

### Site Structure
- **`_posts/`** - Blog posts in Markdown format
- **`pages/`** - Static pages (about, portfolio, tours, etc.)
- **`_data/`** - Configuration data (authors.yml, social.yml, icons.yml)
- **`_layouts/`** - Jekyll templates (post, page, home, etc.)
- **`_includes/`** - Reusable components (navbar, footer, social)
- **`assets/`** - Static assets (images, CSS, JS, fonts)
- **`_sass/`** - Sass stylesheets organized by component

### Configuration Files
- **`_config.yml`** - Main Jekyll configuration (site metadata, plugins, pagination)
- **`Gemfile`** & `type-on-strap.gemspec` - Ruby dependencies
- **`assets/package.json`** & `assets/gulpfile.js` - Node.js asset pipeline

### Content Management
- Posts use front matter with `layout: post`, `title`, `tags`, optional `feature-img`
- Portfolio items use similar structure in `_portfolio/` (currently empty)
- Theme supports KaTeX math rendering and Mermaid diagrams
- Color themes: auto, dark, or light (configured in _config.yml)

### Deployment
- GitHub Pages auto-deploys from `main` branch
- Uses remote theme: `sylhare/Type-on-Strap`
- No custom build process required for deployment