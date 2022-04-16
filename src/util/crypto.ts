/* 
    Ctyptographic functions to encode strings
    Credits to https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
*/

/**
 * Used to encode strings. In our context, to generate a seemingly random QR URL.
 * @param salt A secret phrase
 * @returns An encoded string
 */
export const cipher = (salt: string) => {
  const textToChars = (text: string) =>
    text.split('').map((c) => c.charCodeAt(0))
  const byteHex = (n: any) => ('0' + Number(n).toString(16)).substring(-2)
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code)

  return (text: string) =>
    text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
}

/**
 * Used to decode QR URL in our context to a readable string.
 * @param salt A secret phrase
 * @returns The original text
 */
export const decipher = (salt: string) => {
  const textToChars = (text: string) =>
    text.split('').map((c: string) => c.charCodeAt(0))
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: number, b: number) => a ^ b, code)
  return (encoded: { match: (arg0: RegExp) => any[] }) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex: string) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode: number) => String.fromCharCode(charCode))
      .join('')
}
