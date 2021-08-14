import { ReadConverter } from '../types/index'
import { readValue } from './converter'

type GetReturn<T> = [T] extends [undefined]
  ? object & { [property: string]: string }
  : string | undefined

export default function <T extends string | undefined>(
  key: T,
  converter: ReadConverter = readValue
): GetReturn<T> {
  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all.
  const cookies: string[] =
    document.cookie.length > 0 ? document.cookie.split('; ') : []
  const jar: any = {}
  for (let i = 0; i < cookies.length; i++) {
    const parts: string[] = cookies[i].split('=')
    let value: string = parts.slice(1).join('=')

    if (value[0] === '"') {
      value = value.slice(1, -1)
    }

    try {
      const foundKey: string = readValue(parts[0])
      jar[foundKey] = converter(value, foundKey)

      if (key === foundKey) {
        break
      }
    } catch (e) {}
  }

  return key != null ? jar[key] : jar
}
