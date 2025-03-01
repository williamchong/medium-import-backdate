# Medium Story Backdating Tool

A simple tool that generates HTML pages with specific publication dates for importing into Medium.com. This allows you to publish stories on Medium with custom backdated timestamps.

## How It Works

Medium.com's import feature respects the `article:published_time` metadata in HTML files. This tool generates pages with the proper metadata format that Medium recognizes during import.

## Usage Instructions

1. Visit the website
2. Select your desired publication date using the date picker
3. Copy the generated link and open it in your browser (format will be `/YYYY-MM-DD`)
4. Copy the URL from your browser's address bar
5. Go to Medium.com and use their "Import story" feature to import the URL
6. Medium will preserve the publication date from the imported HTML
7. Edit your story's content in Medium as needed

For detailed instructions on how to import a post to Medium, see their official help article:
[Importing a post to Medium](https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium)

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

This project is optimized for Cloudflare Pages. To deploy:

1. Fork/clone this repository
2. Connect your repository to Cloudflare Pages
3. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`

## Technical Details

The tool uses Nuxt 3 with the following features:

- TailwindCSS for styling
- Dynamic routes (`/YYYY-MM-DD`) for date-specific pages
- Proper metadata generation for Medium import
- Canonical links pointing to index page

## License

MIT
