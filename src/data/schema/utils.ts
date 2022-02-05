function objFromArray(
  arr: Array<{ [key: string]: any }>,
  identifierKey: string
) {
  const obj: any = {}
  arr.forEach((e) => {
    obj[e[identifierKey]] = e
  })
  return obj
}

export { objFromArray }
