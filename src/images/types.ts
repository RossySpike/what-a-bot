import { type Brand } from "../utils/branding.js"
export type Base64 = Brand<string, "Base64">;

export function base64Creator(s: string): Base64 | undefined {
  // https://github.com/naptha/tesseract.js/blob/a1ca80d9e31c34512d0ded75ff8821ddcf3f2f91/src/worker/node/loadImage.js#L28-L29
  if (/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(s))
    return s.split(',')[1] as Base64;
  // https://stackoverflow.com/a/475217
  // ^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$
  if (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/g.test(s))
    return s as Base64;
  return undefined
}
