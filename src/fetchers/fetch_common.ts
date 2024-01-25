export const GITHUB_API_HEADER = new Headers({
  'Authorization' : `Bearer ${process.env.GITHUB_TOKEN}`,
  'Content-Type' : 'application/json'
})
