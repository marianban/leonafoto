import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { ImageDto } from './ImageDto';

type Data =
  | {
      images: ImageDto[];
    }
  | {
      error: string;
    };

const prisma = new PrismaClient();

export const getImagesByCursor = async (pageSize: number, id?: number) => {
  const images = await prisma.image.findMany({
    cursor: id
      ? {
          id: id,
        }
      : undefined,
    take: pageSize,
    skip: id ? 1 : 0,
    orderBy: {
      id: 'desc',
    },
  });
  return images;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'GET') {
      const { size, cursor } = req.query;
      const pageSize = Math.min(size ? Number(size) : 10, 100);
      const id = cursor ? Number(cursor) : undefined;
      const images = await getImagesByCursor(pageSize, id);
      res.status(200).json({
        images: images.map((image) => ({
          id: image.id,
          name: image.name,
          width: image.width,
          height: image.height,
        })),
      });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
