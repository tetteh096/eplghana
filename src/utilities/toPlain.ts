/** Strip Payload/Mongoose docs to plain JSON-safe objects for RSC. */
export function toPlain<T>(value: T): T {
  if (value === undefined || value === null) return value
  return JSON.parse(JSON.stringify(value)) as T
}
