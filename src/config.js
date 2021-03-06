export default {
  PORT: process.env['PORT'] || 8080,
  MARVEL_BASE_URL: process.env['MARVEL_BASE_URL'],
  MARVEL_GET_CHARACTERS: process.env['MARVEL_GET_CHARACTERS'],
  MARVEL_GET_CHARACTER: process.env['MARVEL_GET_CHARACTER'],
  MARVEL_PUBLIC_KEY: process.env['MARVEL_PUBLIC_KEY'],
  MARVEL_PRIVATE_KEY: process.env['MARVEL_PRIVATE_KEY'],
  MARVEL_MAX_LIMIT: process.env['MARVEL_MAX_LIMIT'],
  CACHE_TTL: process.env['CACHE_TTL'] || 60,
}