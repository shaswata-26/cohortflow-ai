import { PrismaClient, Role, CourseStatus, CohortStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Password@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cohortflow.ai' },
    update: {},
    create: { name: 'Admin User', email: 'admin@cohortflow.ai', password, role: Role.ADMIN },
  });

  const mentor = await prisma.user.upsert({
    where: { email: 'mentor@cohortflow.ai' },
    update: {},
    create: { name: 'Mentor User', email: 'mentor@cohortflow.ai', password, role: Role.MENTOR },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@cohortflow.ai' },
    update: {},
    create: { name: 'Student User', email: 'student@cohortflow.ai', password, role: Role.STUDENT },
  });

  const course = await prisma.course.upsert({
    where: { slug: 'full-stack-web-development' },
    update: {},
    create: {
      title: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      description: 'Learn React, Next.js, Node.js, NestJS, PostgreSQL and deployment.',
      category: 'Web Development',
      duration: '24 weeks',
      status: CourseStatus.PUBLISHED,
      coverImage: '/course-fullstack.jpg',
    },
  });

  const cohort = await prisma.cohort.create({
    data: {
      name: 'MERN + Next.js Jan 2026',
      courseId: course.id,
      mentorId: mentor.id,
      startDate: new Date('2026-01-10'),
      endDate: new Date('2026-07-10'),
      status: CohortStatus.ACTIVE,
    },
  });

  await prisma.cohortStudent.upsert({
    where: { cohortId_studentId: { cohortId: cohort.id, studentId: student.id } },
    update: {},
    create: { cohortId: cohort.id, studentId: student.id },
  });

  await prisma.lesson.create({
    data: {
      title: 'Introduction to React Components',
      description: 'Understand JSX, components, props and reusability.',
      content: 'React apps are built with reusable components. In this lesson, students learn how to split UI into independent parts.',
      cohortId: cohort.id,
      createdById: mentor.id,
      status: 'PUBLISHED',
      order: 1,
    },
  });

  await prisma.assignment.create({
    data: {
      title: 'Build a React Counter App',
      instructions: 'Create a reusable counter component using useState and Tailwind CSS.',
      dueDate: new Date('2026-02-01'),
      maxMarks: 100,
      cohortId: cohort.id,
      createdById: mentor.id,
    },
  });

  console.log({ admin: admin.email, mentor: mentor.email, student: student.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
