import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      images: string[];
    }
  | {
      error: string;
    };

const prisma = new PrismaClient();

const getRandomImages = async (pageSize: number) => {
  return await prisma.$queryRaw<
    { name: string }[]
  >`SELECT name FROM image ORDER BY RANDOM() LIMIT ${pageSize};`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'GET') {
      const { size } = req.query;
      const pageSize = Math.min(size ? Number(size) : 10, 100);
      const images = await getRandomImages(pageSize);
      res.status(200).json({
        images: images.map((image) => image.name),
      });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
