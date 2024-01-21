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

## Customization

- Edit the CONSTANTS section within the code to adjust:
- `COMMITS_TO_REQUEST`: Number of commits to display
- `TRUNCATE_CHAR_THRESHOLD`: Maximum length of commit messages
- `GITHUB_USERNAME`: Your GitHub username

##### Further Customization will be added soon

## Additional Notes
- Caching is worked around, but the card stills takes ~1 minute to update in the README.md file.
- The SVG card is designed with a width of 600px and a height of 200px.
- The function uses the GitHub public API to retrieve repository data.
