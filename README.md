# LPU TGPA & CGPA Calculator

A single-page TGPA/CGPA calculator designed for Lovely Professional University
students. It includes interactive calculators, advanced layout styling, and a
step-by-step guide that mirrors the LPU Touch and UMS portal workflow.

## How to run locally

1. From the repository root, start a static file server:

   ```bash
   python -m http.server 8000
   ```

2. Open the site in your browser:

   ```
   http://127.0.0.1:8000/
   ```

If you open `index.html` directly without a local server, some browsers may show
"Not Found" for assets. Running a simple HTTP server ensures the calculator,
styles, and images load correctly.

## Assets

The LPU logo and campus visuals are bundled locally under `assets/` so that the
site works offline without relying on external image hosts.

## Resolving git merge conflicts

If you see merge conflicts while pulling or merging, use this quick checklist:

1. Check which files are conflicted:

   ```bash
   git status -sb
   ```

2. Open each conflicted file and resolve the `<<<<<<<`, `=======`, `>>>>>>>`
   markers by choosing the correct content.
3. Mark files as resolved:

   ```bash
   git add <file-path>
   ```

4. Finish the merge:

   ```bash
   git commit
   ```

If you want to abort the merge and return to the previous state, run:

```bash
git merge --abort
```
