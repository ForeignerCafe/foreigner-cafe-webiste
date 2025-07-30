import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogView from "@/models/BlogView";
import ContactRequest from "@/models/ContactRequest";
import Visitor from "@/models/Visitor";

async function seedAnalytics() {
  try {
    await connectDB();
    console.log("🌱 Starting analytics seeding...");

    // Clear existing analytics data
    await Promise.all([
      BlogView.deleteMany({}),
      Visitor.deleteMany({}), // Set unique visitors to zero as requested
      ContactRequest.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing analytics data");

    // Generate blogs distributed across the last 7 months
    const blogTitles = [
      "The Art of Coffee Brewing: A Complete Guide",
      "Seasonal Menu Highlights for Spring",
      "Behind the Scenes: Our Coffee Sourcing Journey",
      "Customer Spotlight: Local Artists in Our Cafe",
      "The Perfect Pairing: Coffee and Pastries",
      "Sustainability in Our Coffee Shop",
      "New Breakfast Menu Items You'll Love",
      "The History of Our Neighborhood Cafe",
      "Coffee Tasting Notes: Understanding Flavors",
      "Weekend Brunch Specials",
      "Local Community Events at Our Cafe",
      "The Science Behind the Perfect Espresso",
      "Seasonal Decorations and Ambiance",
      "Staff Picks: Favorite Menu Items",
      "Coffee Shop Etiquette: A Friendly Guide",
      "The Journey from Bean to Cup",
      "Customer Reviews and Testimonials",
      "Special Holiday Menu Items",
      "The Art of Latte Making",
      "Cozy Corner: Best Spots for Reading",
      "Local Partnerships and Collaborations",
      "The Perfect Study Environment",
      "Coffee Culture Around the World",
      "Healthy Options on Our Menu",
      "The Story Behind Our Signature Blend",
    ];

    const blogs = [];
    const now = new Date();

    // Create blogs distributed across 7 months
    for (let i = 0; i < 25; i++) {
      const monthsBack = Math.floor(Math.random() * 7); // 0-6 months back
      const blogDate = new Date(now);
      blogDate.setMonth(blogDate.getMonth() - monthsBack);
      blogDate.setDate(Math.floor(Math.random() * 28) + 1); // Random day in month

      const blog = new Blog({
        title: blogTitles[i],
        slug: blogTitles[i]
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+$/, ""),
        content: `<p>This is a comprehensive blog post about ${blogTitles[
          i
        ].toLowerCase()}. It contains detailed information and insights that our readers find valuable.</p><p>Our team has carefully researched this topic to provide you with the most accurate and helpful information.</p>`,
        excerpt: `Learn everything you need to know about ${blogTitles[
          i
        ].toLowerCase()} in this detailed guide.`,
        featuredImage: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
          blogTitles[i]
        )}`,
        author: "Admin",
        status: "published",
        tags: ["coffee", "cafe", "guide"],
        category: "General",
        createdAt: blogDate,
        updatedAt: blogDate,
      });

      const savedBlog = await blog.save();
      blogs.push(savedBlog);
    }

    console.log(`📝 Created ${blogs.length} blogs distributed across 7 months`);

    // Generate blog views distributed across time periods
    const blogViews = [];
    for (const blog of blogs) {
      // Generate views for each blog across different months
      const viewsCount = Math.floor(Math.random() * 500) + 50; // 50-550 views per blog

      for (let i = 0; i < viewsCount; i++) {
        const viewDate = new Date();
        // Distribute views across the last 6 months
        const monthsBack = Math.floor(Math.random() * 6);
        viewDate.setMonth(viewDate.getMonth() - monthsBack);
        viewDate.setDate(Math.floor(Math.random() * 28) + 1);
        viewDate.setHours(Math.floor(Math.random() * 24));
        viewDate.setMinutes(Math.floor(Math.random() * 60));

        const blogView = new BlogView({
          blogId: blog._id,
          ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          viewedAt: viewDate,
        });

        blogViews.push(blogView);
      }
    }

    await BlogView.insertMany(blogViews);
    console.log(
      `👀 Created ${blogViews.length} blog views distributed across months`
    );

    // Generate contact requests with different statuses
    const contactTypes = [
      "general",
      "catering",
      "events",
      "feedback",
      "complaint",
    ];
    const contactRequests = [];

    for (let i = 0; i < 50; i++) {
      const monthsBack = Math.floor(Math.random() * 6); // 0-5 months back
      const requestDate = new Date(now);
      requestDate.setMonth(requestDate.getMonth() - monthsBack);
      requestDate.setDate(Math.floor(Math.random() * 28) + 1);

      const status = Math.random() > 0.6 ? "read" : "pending"; // 40% read, 60% pending

      const contactRequest = new ContactRequest({
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `+1234567${String(i).padStart(3, "0")}`,
        subject: `Inquiry about ${
          contactTypes[Math.floor(Math.random() * contactTypes.length)]
        }`,
        message: "This is a sample contact request message from a customer.",
        type: contactTypes[Math.floor(Math.random() * contactTypes.length)],
        status: status,
        createdAt: requestDate,
        updatedAt: requestDate,
      });

      contactRequests.push(contactRequest);
    }

    await ContactRequest.insertMany(contactRequests);
    console.log(
      `📞 Created ${contactRequests.length} contact requests with various statuses`
    );

    // Summary
    const summary = {
      blogs: blogs.length,
      blogViews: blogViews.length,
      contactRequests: contactRequests.length,
      uniqueVisitors: 0, // Set to zero as requested
    };

    console.log("🎉 Analytics seeding completed successfully!");
    console.log("📊 Summary:", summary);

    return summary;
  } catch (error) {
    console.error("❌ Error seeding analytics:", error);
    throw error;
  }
}

// Run the seeder if called directly
if (require.main === module) {
  seedAnalytics()
    .then(() => {
      console.log("✅ Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}

export default seedAnalytics;
