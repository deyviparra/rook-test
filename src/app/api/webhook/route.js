import { NextResponse } from 'next/server'
import mongodb from '@/backend/config/database/mongodb'

export async function GET(request) {
  const res = { text: 'Hello' }

  return new Response(JSON.stringify(res), {
    status: 200,
  })
}
export async function POST(request) {
  try{
    const client = await mongodb
    console.log('connected')
    const db = client.db('rook')
    const collection = db.collection('events')
    const body = await request.json()
    console.log(body)
    await collection.insertOne(body)
    console.log('inserted')
    return NextResponse.json({ok:'ok'}, {
      status: 200,
    })
  } catch(e){
    console.log(e)
    const error = {error:e}
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
