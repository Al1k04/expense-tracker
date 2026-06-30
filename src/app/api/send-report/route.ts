import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST() {
  const session = await auth();
  const email = session?.user?.email;
  const userId = session?.user?.id;

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const total = transactions.length;
  const totalBalance = totalIncome - totalExpense;

  console.log(email);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "alikprog04@gmail.com",
    subject: "Your Financial Report",
    html: `

<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
  <div style="background: #1D9E75; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Financial Report</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Hello, ${session.user.name}!</p>
  </div>
  
  <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 16px; background: #f0fdf4; border-radius: 8px; text-align: center; width: 33%;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">Total Income</p>
          <p style="color: #1D9E75; font-size: 24px; font-weight: bold; margin: 8px 0 0;">$${totalIncome}</p>
        </td>
        <td style="width: 16px;"></td>
        <td style="padding: 16px; background: #fef2f2; border-radius: 8px; text-align: center; width: 33%;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">Total Expenses</p>
          <p style="color: #A32D2D; font-size: 24px; font-weight: bold; margin: 8px 0 0;">$${totalExpense}</p>
        </td>
        <td style="width: 16px;"></td>
        <td style="padding: 16px; background: #eff6ff; border-radius: 8px; text-align: center; width: 33%;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">Balance</p>
          <p style="color: #1d4ed8; font-size: 24px; font-weight: bold; margin: 8px 0 0;">$${totalBalance}</p>
        </td>
      </tr>
    </table>
    
    <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 30px;">
      This report was generated automatically by ExpenseTracker
    </p>
  </div>
</div>
`,
  });

  return NextResponse.json(
    { message: "Email sent successfully" },
    { status: 200 },
  );
}
