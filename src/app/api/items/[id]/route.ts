import { NextRequest, NextResponse } from 'next/server';
import { deleteItem } from '@/lib/storage';

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const success = deleteItem(id);

  if (!success) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}