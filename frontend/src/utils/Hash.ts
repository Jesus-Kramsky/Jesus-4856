const PBKDF2_ITERATIONS = 310_000;

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function fromHex(value: string): Uint8Array {
  if (!/^(?:[0-9a-f]{2})+$/i.test(value)) {
    throw new Error("La sal guardada no es válida.");
  }

  return Uint8Array.from(value.match(/.{2}/g) ?? [], (byte) =>
    Number.parseInt(byte, 16),
  );
}

export async function Hash(
  password: string,
  saltHex?: string,
): Promise<{ hash: string; salt: string }> {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      "La protección requiere HTTPS o ejecutar la app en localhost.",
    );
  }

  const salt = saltHex
    ? fromHex(saltHex)
    : globalThis.crypto.getRandomValues(new Uint8Array(16));
  const saltBuffer = new ArrayBuffer(salt.byteLength);
  new Uint8Array(saltBuffer).set(salt);
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return { hash: toHex(new Uint8Array(derivedBits)), salt: toHex(salt) };
}
