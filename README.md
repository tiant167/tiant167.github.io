# Experimental Blog

This branch uses Next.js to build a static website.

The key point is `getStaticProps` and path configs in `next.config.js` to generate static pages on the server-side.

The output in the `out` folder is a completely static website.

use the command `npm run build && npm run export` to generate a static site.

Problems I met:
- `antd` meets `CSS modules` will break down, should exclude CSS modules setting for node_modules
- `javascriptEnabled` should be set to true for `antd`
- `fs` module can only be used in server-side code
- when use github page, an empty file `.nojekyll` should be added. jekyll will ignore folder starts with `_`
