// for authorization use https://github.com/greenpau/caddy-security/blob/main/README.md
//www.youtube.com/watch?v=k8tbbffMGZk&ab_channel=PaulGreenberg

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, File, Files } from 'formidable';
import path, { join } from 'path';
import { mkdir, stat } from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'util';
import { imageSize } from 'image-size';
const sizeOf = promisify(imageSize);

type Data = {
  count: number;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const isFileValid = (file: { mimetype: string | null }) => {
  if (!file.mimetype) {
    return false;
  }
  const validTypes = ['image/jpg', 'image/jpeg'];
  return validTypes.includes(file.mimetype);
};

const initGalleryDir = async (uploadDir: string) => {
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return;
    }
  }
};

const prisma = new PrismaClient();

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise(async (resolve, reject) => {
    if (!process.env.IMAGES_DIR) {
      throw new Error('IMAGES_DIR not set');
    }

    const uploadDir = process.env.IMAGES_DIR;

    await initGalleryDir(uploadDir);

    const form = formidable({
      multiples: true,
      keepExtensions: true,
      uploadDir,
      maxFileSize: 500 * 1024 * 1024, // 500 MB,
      filter: isFileValid,
    });

    form.parse(req, (err, fields, files) => {
      console.log('parsed form');
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export const saveImagesToDb = async (files: Files) => {
  const images = Array.isArray(files['images'])
    ? files['images']
    : [files['images']];
  const createImagePromises = images.map(async (image: File) => {
    const dimensions = await sizeOf(image.filepath);
    if (!dimensions) {
      throw new Error('Could not get image dimensions');
    }
    if (!dimensions.height || !dimensions.width) {
      throw new Error('Could not get image dimensions');
    }
    return prisma.image.create({
      data: {
        name: image.newFilename,
        width: dimensions.width,
        height: dimensions.height,
      },
    });
  });
  return await Promise.all(createImagePromises);
};

// next.js api route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { files } = await parseForm(req);
      const images = await saveImagesToDb(files);
      res.status(200).json({ count: images.length });
    } else {
      res.status(400).json({ count: -1 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ count: -1 });
  }
}
