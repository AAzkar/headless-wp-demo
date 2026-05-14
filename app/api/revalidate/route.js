import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid secret',
      },
      { status: 401 }
    );
  }

  revalidatePath(path);

  return Response.json({
    revalidated: true,
    path,
    message: `Revalidated ${path}`,
  });
}