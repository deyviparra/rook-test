import { NextResponse } from 'next/server'
import mongodb from '@/backend/config/database/mongodb'

export async function GET(request) {
  const res = { text: 'Hello' }

  return new Response(JSON.stringify(res), {
    status: 200,
  })
}
export async function POST(request) {
  const client = await mongodb
  const db = client.db('rook')
  const collection = db.collection('events')
  const body = await request.json()
  await collection.insertOne(body)
  return NextResponse.json({ok:'ok'}, {
    status: 200,
  })
}
