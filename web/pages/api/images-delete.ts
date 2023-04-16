import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { unlink } from 'fs/promises';

const prisma = new PrismaClient();

type Data =
  | {
      message: string;
    }
  | {
      error: string;
    };

const deleteImageById = async (id: number) => {
  const image = await prisma.image.findUnique({
    where: {
      id: id,
    },
  });

  if (!image) {
    throw new Error('Image not found');
  }

  if (!process.env.IMAGES_DIR) {
    throw new Error('IMAGES_DIR not set');
  }

  const imagePath = path.join(process.env.IMAGES_DIR, image.name);
  await unlink(imagePath);
  await prisma.image.delete({
    where: {
      id: id,
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        res.status(400).json({ error: 'Invalid image ID' });
        return;
      }

      const imageId = Number(id);
      await deleteImageById(imageId);

      res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
