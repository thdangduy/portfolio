import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
const bucket = process.env.CLOUDFLARE_R2_BUCKET;
const uploadPrefix = process.env.CLOUDFLARE_R2_UPLOAD_PREFIX || "portfolio/images";
const publicBaseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL;

if (!endpoint) {
  throw new Error("Missing CLOUDFLARE_R2_ENDPOINT environment variable");
}

if (!bucket) {
  throw new Error("Missing CLOUDFLARE_R2_BUCKET environment variable");
}

if (!process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
  throw new Error("Missing CLOUDFLARE_R2_ACCESS_KEY_ID environment variable");
}

if (!process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
  throw new Error("Missing CLOUDFLARE_R2_SECRET_ACCESS_KEY environment variable");
}

if (!publicBaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL environment variable");
}

const client = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

function getExtensionFromMime(mimeType: string) {
  const parts = mimeType.split("/");
  return parts[1] || "png";
}

function isBase64Image(value: string) {
  return /^data:image\/[a-zA-Z0-9+\-.]+;base64,/.test(value);
}

export async function uploadBase64ImageToR2(base64Image: string): Promise<string> {
  if (!base64Image || !isBase64Image(base64Image)) {
    return base64Image;
  }

  const match = base64Image.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 image string");
  }

  const mimeType = match[1];
  const data = match[2];
  const extension = getExtensionFromMime(mimeType);
  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  const key = `${uploadPrefix}/${filename}`;
  const buffer = Buffer.from(data, "base64");

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  return `${publicBaseUrl}/${filename}`;
}

export async function replaceBase64ImagesInHtml(html: string): Promise<string> {
  const regex = /src="(data:image\/[^;]+;base64,[^"]+)"/g;
  let updatedHtml = html;
  const matches = [...html.matchAll(regex)];

  for (const match of matches) {
    const base64 = match[1];
    const uploadedUrl = await uploadBase64ImageToR2(base64);
    updatedHtml = updatedHtml.replace(match[0], `src="${uploadedUrl}"`);
  }

  return updatedHtml;
}

export async function replaceBase64ImagesInMarkdown(markdown: string): Promise<string> {
  const regex = /!\[([^\]]*)\]\((data:image\/[^)]+)\)/g;
  let updatedMarkdown = markdown;
  const matches = [...markdown.matchAll(regex)];

  for (const match of matches) {
    const altText = match[1];
    const base64 = match[2];
    const uploadedUrl = await uploadBase64ImageToR2(base64);
    updatedMarkdown = updatedMarkdown.replace(
      match[0],
      `![${altText}](${uploadedUrl})`,
    );
  }

  return updatedMarkdown;
}
