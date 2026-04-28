import { createHash } from "crypto";

type PayfastFieldValue = string | number | null | undefined;
type PayfastFields = Record<string, PayfastFieldValue>;

const PAYFAST_PROCESS_URL = "https://www.payfast.co.za/eng/process";

function normalisePayfastValue(value: PayfastFieldValue) {
  return String(value ?? "").trim();
}

function encodePayfastValue(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

function buildPayfastQuery(fields: PayfastFields, passphrase?: string) {
  const params = Object.entries(fields)
    .filter(([key, value]) => key !== "signature" && normalisePayfastValue(value) !== "")
    .map(([key, value]) => `${key}=${encodePayfastValue(normalisePayfastValue(value))}`)
    .join("&");

  if (passphrase) {
    return `${params}&passphrase=${encodePayfastValue(passphrase.trim())}`;
  }

  return params;
}

export function createPayfastSignature(fields: PayfastFields, passphrase?: string) {
  const query = buildPayfastQuery(fields, passphrase);
  return createHash("md5").update(query).digest("hex");
}

export function validatePayfastSignature(fields: PayfastFields, passphrase?: string) {
  const incomingSignature = normalisePayfastValue(fields.signature);

  if (!incomingSignature) {
    return false;
  }

  return createPayfastSignature(fields, passphrase) === incomingSignature;
}

export function buildPayfastRedirect(fields: PayfastFields, passphrase?: string) {
  return {
    url: PAYFAST_PROCESS_URL,
    params: {
      ...fields,
      signature: createPayfastSignature(fields, passphrase),
    },
  };
}
