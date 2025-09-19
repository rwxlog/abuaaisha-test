# Changelog

abuaaisha.com

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
### Added
- Placeholder for upcoming features/pages.
### Changed
- Placeholder for code or config refactors.
### Fixed
- Placeholder for bug/security fixes.
### Removed
- Placeholder for removed/unused code or assets.
---

## [1.3.1] - 2025-09-19  
### Added  
- Support for short and long summaries:  
  - Short summaries for homepage grid cards.  
  - Longer summaries for posts listing page.  

### Fixed  
- Post category filtering and sorting to ensure newest posts are displayed first.  

## [1.3.0] - 2025-09-18  
### Changed  
- Converted project to Hugo for improved SEO and content management.  

### Added  
- Local Hugo configuration.  
- Netlify deployment with Hugo. 

## [1.2.0] - 2025-09-15
### Added
- Post cards dynamically loaded using JSON file.
- Added `posts.json` and `posts.js` to dynamically load cards.

### Fixed
- Header position fixed.

### Removed
- Removed Kalpurush font.

---

## [1.1.0] - 2025-09-5
### Added
- Header and footer dynamically loaded across the site using JavaScript fetch.
- Added components `header.html` and `footer.html`
- Added custom domain to Netlify.

### Fixed
- Fixed broken "Read more" links in `index.html` and `posts.html`.
- Edited navbar CSS slightly for better look on mobile view.

---

## [1.0.0] - 2025-09-02
### Added
- Initial release of the static site.
- Pages: `index.html`, `posts.html`, `about.html`.
- Global stylesheet `style.css`.
- Deployment setup with GitHub → Netlify.
