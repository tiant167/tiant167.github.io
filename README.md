# tiant167.github.io

This repository contains the source code for my personal blog, built with [Jekyll](https://jekyllrb.com/) and the "[Type on Strap](https://github.com/sylhare/Type-on-Strap)" theme.

## Running Locally

To run the website in a local environment for development, use the following command:

```bash
bundle exec jekyll serve
```

## Asset Management

This project uses `gulp` to optimize images. To convert `jpg` or `png` images to the `.webp` format, navigate to the `assets` directory and run:

```bash
gulp webp
```

## Project Structure

- `_config.yml`: The main Jekyll configuration file for the site.
- `_posts/`: Contains all of the blog posts, written in Markdown.
- `pages/`: Holds the static pages of the site, such as the about and portfolio pages.
- `_data/`: Contains data files for authors, social media links, and other site data.
- `_sass/`: Contains the Sass files for styling the site.
- `assets/`: Holds all static assets, such as images, CSS, and JavaScript.

## Deployment

The site is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch.