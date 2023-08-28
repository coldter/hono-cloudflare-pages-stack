/**
 * @description
 * @param obj
 */
export async function hashObject(obj: Record<string, any>): Promise<string> {
  const jsonString = JSON.stringify(obj);
  const encoded = new TextEncoder().encode(jsonString);

  const digest = await crypto.subtle.digest(
    {
      name: 'SHA-256',
    },
    encoded, // The data you want to hash as an ArrayBuffer
  );
  return arrayBufferToBase64(digest);
}
/**
 * @description Convert array buffer to base64
 * @param buffer
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
