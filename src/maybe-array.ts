export default (maybeItem: any) => (value: any) => {
  if (!Array.isArray(value)) return []

  return value.map(maybeItem)
}
