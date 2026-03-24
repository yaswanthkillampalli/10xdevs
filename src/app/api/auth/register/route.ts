import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/server/db/connect';
import User from '@/server/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { rollId, email, password, name, role } = body;

    if (!rollId || !email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { rollId }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this Email or Roll ID already exists' },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      rollId,
      email,
      passwordHash,
      name,
      role: role || 'student',
    });

    return NextResponse.json(
      { 
        message: 'User registered successfully', 
        userId: newUser._id 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}