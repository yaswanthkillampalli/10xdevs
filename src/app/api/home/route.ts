import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import connectToDatabase from '@/server/db/connect';
import User from '@/server/models/User';
import Project from '@/server/models/Project';
import AcademicWork from '@/server/models/AcademicWork';
import Certification from '@/server/models/Certification';
import Achievement from '@/server/models/Achievement';

export async function GET() {
  try {
    // 1. Grab the secure cookie directly from the Next.js headers
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_session')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized - No session found' }, { status: 401 });
    }

    // 2. Verify the token using jose and your secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    // 3. Connect to the database
    await connectToDatabase();

    // 4. Fetch the user's basic info for the Navbar and Greeting
    const user = await User.findById(userId).select('name avatarUrl role');
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 5. Run the counters in PARALLEL for maximum speed
    const [
      projectsCount,
      academicWorksCount,
      certificationsCount,
      achievementsCount
    ] = await Promise.all([
      Project.countDocuments({ ownerId: userId }),
      AcademicWork.countDocuments({ ownerId: userId }),
      Certification.countDocuments({ ownerId: userId }),
      Achievement.countDocuments({ ownerId: userId })
    ]);

    // 6. Send the perfectly formatted data back to your Bento Box UI
    return NextResponse.json({
      user: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role
      },
      stats: {
        projects: projectsCount,
        academicWorks: academicWorksCount,
        certifications: certificationsCount,
        achievements: achievementsCount
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Home API Error:', error);
    return NextResponse.json(
      { message: 'Invalid session or Server Error' },
      { status: 401 }
    );
  }
}