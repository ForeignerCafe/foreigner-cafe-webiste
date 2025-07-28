export function chrotdtmanTemplate({
  subject,
  coupon,
}: {
  subject: string;
  coupon?: string;
}) {
  return `
    <div>
      <h1>${subject}</h1>
      <p>Celebrate Christmas with joy and love!</p>
      ${
        coupon
          ? `<div style="margin-top:20px;"><strong>Your Gift Coupon:</strong> ${coupon}</div>`
          : ""
      }
    </div>
  `;
}
