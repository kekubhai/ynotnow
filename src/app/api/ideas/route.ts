// app/api/ideas/route.ts
import { db } from '@/lib/db';
import { ideas, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const publicIdeas = await db
    .select({
      id: ideas.id,
      title: ideas.title,
      description: ideas.description,
      upvotes: ideas.upvotes,
      user: {
        id: users.id,
        name: users.name,
        image: users.image,
      },
    })
    .from(ideas)
    .where(eq(ideas.isPublic, true))
    .leftJoin(users, eq(ideas.userId, users.id));

  return Response.json(publicIdeas);
}
