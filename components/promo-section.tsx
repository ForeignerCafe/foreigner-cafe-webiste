export default function PromoSection() {
  return (
    <section id="promo" className="bg-gray-50 py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="animate-fade-in-up">
          <h3 className="text-[15px] font-bold mb-4 tracking-[1px] text-black">WINTER WONDERLAND</h3>
          <div className="text-[12px] text-gray-700 max-w-4xl leading-relaxed space-y-3">
            <p>
              Embrace winter in our <span className="font-semibold text-black">Winter Wonderland</span> courtyard is
              reserved for groups dining at The Cafe or The Garden Restaurant. Bookings are essential and subject to
              availability. Please contact our reservations team for availability and to make a booking.
            </p>
            <p>
              Please note we cannot hold existing or new bookings for the Winter Wonderland courtyard without
              confirmation that it be available during <span className="font-semibold text-black">private venue</span>{" "}
              bookings.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
