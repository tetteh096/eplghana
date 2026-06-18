/** Strip Payload/Mongoose docs to plain JSON-safe objects for RSC. */
export function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
