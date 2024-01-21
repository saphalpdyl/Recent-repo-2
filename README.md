# Recent Repo 2
The successor to Recent Repo - now written in Typescript and hosted on Vercel. Further changes or development will be commited here. 

The renders an SVG card that displays information about your most recently updated GitHub repository, including:

- Repository name
- Full name
- Last updated ..... time ago
- Recent commits (will be made adjustable)
- Repository size

Designed to be easily embedded within your GitHub-flavored README.md files for a visual showcase of your activity!

## Usage
- Go to the [API directly](https://recent-repo-2.vercel.app/api/repo) to start on default settings
### To load the card

DO ✔️ :
```html
<img src="https://recent-repo-2.vercel.app/api/repo?pos=0" height="150" width="450" />
```

DON'T ❌ :
```markdown
![](https://recent-repo-2.vercel.app/api/repo?pos=0)
```

#### WHY?
> Loading it Markdown way takes 1-1.5 minutes for updates to appear. On the other hand, loading through <img> updates the image within 10 seconds after changes have been made.

--

## Example
![](https://recent-repo-2.vercel.app/api/repo)

## Customization

- Edit the CONSTANTS section within the code to adjust:
- `COMMITS_TO_REQUEST`: Number of commits to display
- `TRUNCATE_CHAR_THRESHOLD`: Maximum length of commit messages
- `GITHUB_USERNAME`: Your GitHub username

##### Further Customization will be added soon

## Additional Notes
- The SVG card is designed with a width of 600px and a height of 200px.
- The function uses the GitHub public API to retrieve repository data.
