'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;

    console.log('Starting demo data insertion...');

    // -------------------------------------------------
    // 1. COURSES
    // -------------------------------------------------
    await sequelize.query(`
      INSERT IGNORE INTO courses
      (code, name, semester, department, createdAt, updatedAt)
      VALUES
      ('BCA301', 'Web Technology', 'TYBCA',
       'Computer Applications', NOW(), NOW()),

      ('BCA302', 'Full Stack Development', 'TYBCA',
       'Computer Applications', NOW(), NOW()),

      ('BCA303', 'UI/UX Design', 'TYBCA',
       'Computer Applications', NOW(), NOW())
    `);

    console.log('Courses inserted.');

    // -------------------------------------------------
    // 2. INSTRUCTORS
    // -------------------------------------------------
    await sequelize.query(`
      INSERT IGNORE INTO instructors
      (name, email, department, createdAt, updatedAt)
      VALUES
      ('Dr. Anjali Naik',
       'anjali.naik@example.com',
       'Computer Applications',
       NOW(), NOW()),

      ('Prof. Rohan Desai',
       'rohan.desai@example.com',
       'Computer Applications',
       NOW(), NOW())
    `);

    console.log('Instructors inserted.');

    // -------------------------------------------------
    // 3. STUDENTS
    // -------------------------------------------------
    await sequelize.query(`
      INSERT IGNORE INTO students
      (rollNo, name, email, course, createdAt, updatedAt)
      VALUES
      ('2405041',
       'Student One',
       'student1@example.com',
       'TYBCA',
       NOW(), NOW()),

      ('2405042',
       'Student Two',
       'student2@example.com',
       'TYBCA',
       NOW(), NOW()),

      ('2405043',
       'Student Three',
       'student3@example.com',
       'TYBCA',
       NOW(), NOW())
    `);

    console.log('Students inserted.');

    // -------------------------------------------------
    // 4. GET REAL COURSE IDs
    // -------------------------------------------------
    const [courses] = await sequelize.query(`
      SELECT id, code
      FROM courses
      WHERE code IN ('BCA301', 'BCA302', 'BCA303')
      ORDER BY code
    `);

    // -------------------------------------------------
    // 5. GET REAL INSTRUCTOR IDs
    // -------------------------------------------------
    const [instructors] = await sequelize.query(`
      SELECT id, email
      FROM instructors
      WHERE email IN (
        'anjali.naik@example.com',
        'rohan.desai@example.com'
      )
      ORDER BY email
    `);

    if (courses.length !== 3) {
      throw new Error(
        'Could not find all 3 courses. Check the courses table.'
      );
    }

    if (instructors.length !== 2) {
      throw new Error(
        'Could not find both instructors. Check the instructors table.'
      );
    }

    // Find IDs by their actual codes/emails
    const webCourse = courses.find(c => c.code === 'BCA301');
    const fullStackCourse = courses.find(c => c.code === 'BCA302');
    const uiuxCourse = courses.find(c => c.code === 'BCA303');

    const anjali = instructors.find(
      i => i.email === 'anjali.naik@example.com'
    );

    const rohan = instructors.find(
      i => i.email === 'rohan.desai@example.com'
    );

    // -------------------------------------------------
    // 6. FEEDBACK FORMS
    // -------------------------------------------------
    await sequelize.query(
      `
      INSERT INTO feedback_forms
      (
        title,
        description,
        deadline,
        active,
        courseId,
        instructorId,
        createdAt,
        updatedAt
      )
      SELECT
        ?,
        ?,
        ?,
        1,
        ?,
        ?,
        NOW(),
        NOW()
      WHERE NOT EXISTS
      (
        SELECT 1
        FROM feedback_forms
        WHERE title = ?
      )
      `,
      {
        replacements: [
          'Web Technology Course Evaluation',
          'Evaluate teaching and course content.',
          '2027-12-31 23:59:59',
          webCourse.id,
          anjali.id,
          'Web Technology Course Evaluation'
        ]
      }
    );

    await sequelize.query(
      `
      INSERT INTO feedback_forms
      (
        title,
        description,
        deadline,
        active,
        courseId,
        instructorId,
        createdAt,
        updatedAt
      )
      SELECT
        ?,
        ?,
        ?,
        1,
        ?,
        ?,
        NOW(),
        NOW()
      WHERE NOT EXISTS
      (
        SELECT 1
        FROM feedback_forms
        WHERE title = ?
      )
      `,
      {
        replacements: [
          'Full Stack Development Feedback',
          'Evaluate the Full Stack Development course.',
          '2027-12-31 23:59:59',
          fullStackCourse.id,
          rohan.id,
          'Full Stack Development Feedback'
        ]
      }
    );

    await sequelize.query(
      `
      INSERT INTO feedback_forms
      (
        title,
        description,
        deadline,
        active,
        courseId,
        instructorId,
        createdAt,
        updatedAt
      )
      SELECT
        ?,
        ?,
        ?,
        1,
        ?,
        ?,
        NOW(),
        NOW()
      WHERE NOT EXISTS
      (
        SELECT 1
        FROM feedback_forms
        WHERE title = ?
      )
      `,
      {
        replacements: [
          'UI/UX Design Feedback',
          'Evaluate the UI/UX Design course.',
          '2027-12-31 23:59:59',
          uiuxCourse.id,
          anjali.id,
          'UI/UX Design Feedback'
        ]
      }
    );

    console.log('Feedback forms inserted.');
    console.log('Demo data completed successfully.');
  },

  async down(queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;

    await sequelize.query(`
      DELETE FROM feedback_forms
      WHERE title IN (
        'Web Technology Course Evaluation',
        'Full Stack Development Feedback',
        'UI/UX Design Feedback'
      )
    `);

    await sequelize.query(`
      DELETE FROM students
      WHERE email IN (
        'student1@example.com',
        'student2@example.com',
        'student3@example.com'
      )
    `);

    await sequelize.query(`
      DELETE FROM instructors
      WHERE email IN (
        'anjali.naik@example.com',
        'rohan.desai@example.com'
      )
    `);

    await sequelize.query(`
      DELETE FROM courses
      WHERE code IN (
        'BCA301',
        'BCA302',
        'BCA303'
      )
    `);

    console.log('Demo data removed.');
  }
};