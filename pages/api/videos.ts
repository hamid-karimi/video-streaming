// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

function uploadvideoStream (req, res){

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const method = req.method

  if(method === 'GET') {
    res.status(200).json({ name: 'Hamid Karimi' })
  }

  if(method === 'POST') {
    return uploadvideoStream(req, res)
  }

  return res.status(405).json({error: `Method ${method} not allowed`})
}
