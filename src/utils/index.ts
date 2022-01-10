// 转换query
export const FQ = (query: object) => {
  const queryArr: string[] = []
  for (const key in query) {
    const value = query[key]
    if (key !== 'totalNum' && !['', null, undefined].includes(value)) {
      queryArr.push(`${key}=${value}`)
    }
  }
  return queryArr.join('&')
}
