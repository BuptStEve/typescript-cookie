import {
  CookieAttributes,
  CookieAttributesConfig,
  CookieCodecConfig,
  Decoder,
  Encoder
} from '../types/index'
import set from './set'
import get from './get'
import {
  decodeName as defaultNameDecoder,
  decodeValue as defaultValueDecoder,
  encodeName as defaultNameEncoder,
  encodeValue as defaultValueEncoder
} from './codec'

export const DEFAULT_CODEC: CookieCodecConfig<
string | number | boolean | undefined | null,
string
> = Object.freeze({
  decodeName: defaultNameDecoder,
  decodeValue: defaultValueDecoder,
  encodeName: defaultNameEncoder,
  encodeValue: defaultValueEncoder
})

export const DEFAULT_ATTRIBUTES: CookieAttributesConfig = Object.freeze({
  path: '/'
})

export function setCookie (
  key: string,
  value: any,
  attributes: CookieAttributes = DEFAULT_ATTRIBUTES,
  {
    encodeValue = defaultValueEncoder,
    encodeName = defaultNameEncoder
  }: {
    encodeValue?: Encoder<any>
    encodeName?: Encoder<string>
  } = {}
): string {
  return set(key, value, attributes, encodeValue, encodeName)
}

export function getCookie (
  key: string,
  {
    decodeValue = defaultValueDecoder,
    decodeName = defaultNameDecoder
  }: {
    decodeValue?: Decoder<any>
    decodeName?: Decoder<string>
  } = {}
): ReturnType<typeof decodeValue> | undefined {
  return get(key, decodeValue, decodeName)
}

export function getCookies ({
  decodeValue = defaultValueDecoder,
  decodeName = defaultNameDecoder
}: {
  decodeValue?: Decoder<any>
  decodeName?: Decoder<string>
} = {}): object & { [property: string]: ReturnType<typeof decodeValue> } {
  return get(undefined, decodeValue, decodeName)
}

export function removeCookie (
  key: string,
  attributes: CookieAttributes = DEFAULT_ATTRIBUTES
): void {
  setCookie(
    key,
    '',
    Object.assign({}, attributes, {
      expires: -1
    })
  )
}
