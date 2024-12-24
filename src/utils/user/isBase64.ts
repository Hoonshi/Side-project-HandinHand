export const isBase64 = (str: string) => {
  const regex = /^data:image\/(png|jpg|jpeg);base64,/
  return regex.test(str)
}
