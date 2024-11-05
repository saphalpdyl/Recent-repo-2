# Recent Repo 2
The successor to Recent Repo - now written in Typescript and hosted on Vercel. Further changes or development will be commited here. 

The renders an SVG card that displays information about your most recently updated GitHub repository, including:

- Repository name
- Full name
- Last updated ..... time ago
- Recent commits (will be made adjustable)
- Repository size

Designed to be easily embedded within your GitHub-flavored README.md files for a visual showcase of your activity!

[![Tech Stack](https://skillicons.dev/icons?i=next,typescript,svg)]()

## Usage
- Go to the [API directly](https://recent-repo-2.vercel.app/api/repo) to start on default settings

### Query Parameters
- `username` : You Github Username
- `pos` : The position of the displayed repo ( pos=0 corresponds to the latest repo )
- `backgroundColor` : Background color in HEX format without '#'
- `borderColor` : Color of the border in HEX format without '#'
- `minimalism` : when `true` hide the design on the top right
- `disableBackgroundGrid`: when `true` hide the dotted grid in the background

### To load the card

DO ✔️ :
```html
<img src="https://recent-repo-2.vercel.app/api/repo?username=<github_username>&pos=0" height="150" width="450" />
```

DON'T ❌ :
```markdown
![](https://recent-repo-2.vercel.app/api/repo?username=<github_username>&pos=0)
```

#### WHY?
> Loading it Markdown way takes 1-1.5 minutes for updates to appear. On the other hand, loading through <img> updates the image within 10 seconds after changes have been made. ( Source: me )

## Examples ( Default + Configurations through query parameters )
![](https://recent-repo-2.vercel.app/api/repo?username=saphalpdyl)
![](https://recent-repo-2.vercel.app/api/repo?username=saphalpdyl&pos=1&backgroundColor=0d1117&borderColor=596679&minimalism=true)
![](https://recent-repo-2.vercel.app/api/repo?username=saphalpdyl&pos=2&backgroundColor=0ff3&borderColor=fff&disableBackgroundGrid=true)

## Customization
Fork the repo and host it on vercel for further customization.

##### Further Customization will be added soon

## Additional Notes
- The SVG card is designed with a width of 600px and a height of 200px.
- The function uses the GitHub public API to retrieve repository data.
