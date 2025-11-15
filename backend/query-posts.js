const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    select: {
      slug: true,
      title: true,
      category: true,
      excerpt: true,
      status: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log(JSON.stringify(posts, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
