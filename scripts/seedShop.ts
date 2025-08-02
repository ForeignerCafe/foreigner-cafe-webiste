import mongoose from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";
import { connectDB } from "../lib/db";

// 🔧 Utility to create URL-friendly slugs from names
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces & symbols with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

const categories = [
  {
    name: "Coffee & Beverages",
    description:
      "Premium coffee beans, specialty drinks, and refreshing beverages",
  },
  {
    name: "Pastries & Desserts",
    description: "Freshly baked pastries, cakes, and sweet treats",
  },
  {
    name: "Breakfast & Brunch",
    description: "Hearty breakfast items and brunch specialties",
  },
  {
    name: "Sandwiches & Wraps",
    description: "Gourmet sandwiches and healthy wraps",
  },
  {
    name: "Merchandise",
    description: "Branded items and cafe merchandise",
  },
];

// Add slug field to each category
const categoriesWithSlugs = categories.map((category) => ({
  ...category,
  slug: slugify(category.name),
}));

const products = [
  // Coffee & Beverages
  {
    title: "Ethiopian Single Origin Coffee",
    description:
      "Premium single origin coffee beans from the highlands of Ethiopia. Rich, complex flavor with notes of chocolate and berries.",
    price: 24.99,
    stock: 50,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Coffee & Beverages",
  },
  {
    title: "Signature Cappuccino",
    description:
      "Our signature cappuccino made with expertly steamed milk and our house blend espresso.",
    price: 4.5,
    stock: 100,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Coffee & Beverages",
  },
  {
    title: "Cold Brew Concentrate",
    description:
      "Smooth, rich cold brew concentrate. Perfect for iced coffee lovers. Just add water or milk.",
    price: 12.99,
    stock: 30,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Coffee & Beverages",
  },

  // Pastries & Desserts
  {
    title: "Chocolate Croissant",
    description:
      "Buttery, flaky croissant filled with rich Belgian chocolate. Baked fresh daily.",
    price: 3.75,
    stock: 25,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Pastries & Desserts",
  },
  {
    title: "New York Cheesecake Slice",
    description:
      "Classic New York style cheesecake with graham cracker crust and berry compote.",
    price: 6.5,
    stock: 15,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Pastries & Desserts",
  },
  {
    title: "Artisan Macarons (6-pack)",
    description:
      "Delicate French macarons in assorted flavors: vanilla, chocolate, raspberry, pistachio, lemon, and rose.",
    price: 18.0,
    stock: 20,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Pastries & Desserts",
  },

  // Breakfast & Brunch
  {
    title: "Avocado Toast Deluxe",
    description:
      "Sourdough toast topped with smashed avocado, cherry tomatoes, feta cheese, and everything bagel seasoning.",
    price: 12.5,
    stock: 40,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Breakfast & Brunch",
  },
  {
    title: "Breakfast Burrito",
    description:
      "Flour tortilla filled with scrambled eggs, bacon, hash browns, cheese, and salsa verde.",
    price: 9.75,
    stock: 35,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Breakfast & Brunch",
  },

  // Sandwiches & Wraps
  {
    title: "Grilled Chicken Club",
    description:
      "Grilled chicken breast with bacon, lettuce, tomato, and mayo on toasted sourdough bread.",
    price: 11.25,
    stock: 30,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Sandwiches & Wraps",
  },
  {
    title: "Mediterranean Wrap",
    description:
      "Hummus, grilled vegetables, feta cheese, olives, and mixed greens in a spinach tortilla.",
    price: 10.5,
    stock: 25,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Sandwiches & Wraps",
  },

  // Merchandise
  {
    title: "Foreigner Cafe Mug",
    description:
      "Premium ceramic mug with our signature logo. Perfect for your morning coffee. Dishwasher safe.",
    price: 15.99,
    stock: 75,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Merchandise",
  },
  {
    title: "Cafe T-Shirt",
    description:
      "Comfortable cotton t-shirt with vintage Foreigner Cafe design. Available in multiple sizes.",
    price: 22.99,
    stock: 60,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    categoryName: "Merchandise",
  },
];

async function seedShop() {
  try {
    await connectDB();

    console.log("🌱 Starting shop seeding...");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing categories and products");

    // Create categories
    const createdCategories = await Category.insertMany(categoriesWithSlugs);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create category lookup map
    const categoryMap = new Map();
    createdCategories.forEach((category) => {
      categoryMap.set(category.name, category._id);
    });

    // Create products with category references
    // Create products with category references and slugs
    const productsWithCategories = products.map((product) => {
      const categoryId = categoryMap.get(product.categoryName);
      if (!categoryId)
        throw new Error(`Category not found: ${product.categoryName}`);

      const { categoryName, title, ...rest } = product;

      return {
        ...rest,
        title,
        category: categoryId,
        slug: slugify(title), // ✅ ACTUALLY insert slug here
        isActive: true,
      };
    });

    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log("🎉 Shop seeding completed successfully!");
    console.log("\nCreated Categories:");
    createdCategories.forEach((category) => {
      console.log(`  - ${category.name} (${category.slug})`);
    });

    console.log("\nCreated Products:");
    createdProducts.forEach((product) => {
      console.log(`  - ${product.title} - $${product.price}`);
    });
  } catch (error) {
    console.error("❌ Error seeding shop:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

seedShop();
