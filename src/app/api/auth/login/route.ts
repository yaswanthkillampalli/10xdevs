import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import connectToDatabase from '@/server/db/connect';
import User from '@/server/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    // Allow users to log in with either their email OR their rollId
    const { identifier, password } = body; 

    if (!identifier || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    // 1. Find the user (checking both email and rollId fields)
    const user = await User.findOne({
      $or: [{ email: identifier }, { rollId: identifier }]
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Create the JWT payload (The data you want to carry around)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';

    const jwt = await new SignJWT({ 
      userId: user._id.toString(), 
      role: user.role,
      rollId: user.rollId 
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('7d') // Token expires in 7 days
      .sign(secret);

    // 4. Set the JWT in an HttpOnly cookie
    // HttpOnly means JavaScript can't read it, making it immune to XSS attacks
    (await cookies()).set('portal_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only requires HTTPS in production
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    // 5. Send back a clean user object for the frontend to use in its state
    return NextResponse.json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}