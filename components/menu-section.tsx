export default function MenuSection() {
  const featuredItems = [
    {
      name: "Signature Espresso",
      description: "Rich, bold blend with notes of dark chocolate and caramel",
      price: "$4.50",
      image:
        "https://49thcoffee.com/cdn/shop/files/Lifestyle2_6f83823c-0980-4c5e-b202-5d98b0c71da4.png?v=1698448473",
    },
    {
      name: "Artisan Croissant",
      description: "Buttery, flaky pastry baked fresh daily",
      price: "$3.25",
      image:
        "https://theartisanbakery.com/cdn/shop/products/croissant.jpg?v=1624259835",
    },
    {
      name: "Matcha Latte",
      description: "Ceremonial grade matcha with steamed oat milk",
      price: "$5.25",
      image:
        "https://www.acozykitchen.com/wp-content/uploads/2017/04/IcedMatchaLatte-1.jpg",
    },
  ];

  return (
    <section id="menu" className="bg-white section-padding texture-concrete">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <h2 className="text-display-md font-display mb-6 animate-fade-in-up">
            MENU HIGHLIGHTS
          </h2>
          <p
            className="text-body-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our carefully crafted selection of artisanal coffee, fresh
            pastries, and seasonal dishes
          </p>
        </div>

        {/* Featured Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-center group animate-fade-in-up hover-lift h-full"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gray-100 h-64 mb-6 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg?height=200&width=300"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-orange transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-body-md text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <p className="text-lg font-bold text-orange">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center animate-fade-in-up">
            <div className="bg-gray-100 h-48 mb-6 overflow-hidden">
              <img
                src="https://www.datocms-assets.com/20941/1663765103-best-coffee-drinks.png?w=1000&fit=max&fm=jpg"
                alt="Coffee Menu"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">
              COFFEE & DRINKS
            </h3>
            <p className="text-body-md text-gray-600">
              Expertly roasted beans and signature beverages
            </p>
          </div>

          <div
            className="text-center animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-gray-100 h-48 mb-6 overflow-hidden">
              <img
                src="https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg?semt=ais_hybrid&w=740"
                alt="Food Menu"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">
              FOOD & PASTRIES
            </h3>
            <p className="text-body-md text-gray-600">
              Fresh baked goods and seasonal dishes
            </p>
          </div>

          <div
            className="text-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-gray-100 h-48 mb-6 overflow-hidden">
              <img
                src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/xkdarnij/ba4a02ac-6b4e-4f63-8e9b-a9fce4a4f2dc"
                alt="Special Menu"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">
              SEASONAL SPECIALS
            </h3>
            <p className="text-body-md text-gray-600">
              Limited time offerings and chef's selections
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-secondary hover-lift">View Full Menu</button>
        </div>
      </div>
    </section>
  );
}
