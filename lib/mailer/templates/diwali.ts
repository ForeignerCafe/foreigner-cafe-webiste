// /lib/mailer/templates/diwali.ts
export function diwaliTemplate({
  subject,
  coupon,
}: {
  subject: string;
  coupon?: string;
}) {
  return `
    <div>
      <h1>${subject}</h1>
      <p>May the Festival of Lights bring happiness to you and your family!</p>
      ${
        coupon
          ? `<div style="margin-top:20px;"><strong>Diwali Special Coupon:</strong> ${coupon}</div>`
          : ""
      }
    </div>
  `;
}
