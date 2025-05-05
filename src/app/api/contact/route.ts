import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// Form validation function
const validateForm = (
  name: string,
  email: string,
  phone: string,
  message: string
) => {
  const errors: Record<string, string> = {};

  if (!name.trim()) {
    errors.name = 'Emri është i detyrueshëm';
  }

  if (!email.trim()) {
    errors.email = 'Email është i detyrueshëm';
  } else if (!isValidEmail(email)) {
    errors.email = 'Ju lutem vendosni një email të vlefshëm';
  }

  if (phone.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phone)) {
    errors.phone = 'Ju lutem vendosni një numër telefoni të vlefshëm';
  }

  if (!message.trim()) {
    errors.message = 'Mesazhi është i detyrueshëm';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate form inputs
    const validation = validateForm(name, email, phone, message);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'sales@dael.construction.com',
      subject: `DAEL Construction - Mesazh i ri nga ${name}`,
      html: `
        <h1>Mesazh i ri nga forma e kontaktit</h1>
        <p><strong>Emri:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nuk është dhënë'}</p>
        <p><strong>Mesazhi:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Ndodhi një gabim gjatë dërgimit të mesazhit' },
      { status: 500 }
    );
  }
} 