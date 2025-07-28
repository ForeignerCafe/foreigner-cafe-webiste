export function eidTemplate({
  subject,
  coupon,
}: {
  subject: string;
  coupon?: string;
}) {
  return `
    <div>
      <h1>${subject}</h1>
      <p>Wishing you a joyous Eid filled with peace and blessings!</p>
      ${
        coupon
          ? `<div style="margin-top:20px;"><strong>Your Coupon:</strong> ${coupon}</div>`
          : ""
      }
    </div>
  `;
}
