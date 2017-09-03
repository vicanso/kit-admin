export default function prefix(req) {
  if (req.url.charAt(0) === '/') {
    req.url = `/api${req.url}`;
  }
}
