"use client";

import { useState, useEffect, useRef } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import Masonry from "react-masonry-css";
import { Button } from "./ui/button";

export const instagramPosts = [
  {
    id: 1,
    image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
    caption: "The sweetest way to fuel your body.",
    likes: 234,
    comments: 12,
    timestamp: "2h",
  },
  {
    id: 2,
    image:
      "https://w0.peakpx.com/wallpaper/332/146/HD-wallpaper-food-breakfast-coffee.jpg",
    caption: "Industrial vibes meet cozy comfort 🏭✨",
    likes: 189,
    comments: 8,
    timestamp: "4h",
  },
  {
    id: 3,
    image:
      "https://w0.peakpx.com/wallpaper/120/799/HD-wallpaper-french-breakfast-cafe-food-french-breakfast-two-coffee-coffee-time-hot-drink-croissant-white-cups.jpg",
    caption: "Fresh pastries baked daily 🥐",
    likes: 156,
    comments: 15,
    timestamp: "6h",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?cs=srgb&dl=pexels-kyleroxas-2122294.jpg&fm=jpg",
    caption: "Community gathering at its finest 👥",
    likes: 298,
    comments: 22,
    timestamp: "8h",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1609590981063-d495e2914ce4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    caption: "Barista magic in action ✨",
    likes: 167,
    comments: 9,
    timestamp: "12h",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/32710321/pexels-photo-32710321/free-photo-of-delicious-breakfast-spread-with-croissant.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
    caption: "Latte art perfection 🎨",
    likes: 245,
    comments: 18,
    timestamp: "1d",
  },
  {
    id: 7,
    image:
      "https://w0.peakpx.com/wallpaper/332/146/HD-wallpaper-food-breakfast-coffee.jpg",
    caption: "Weekend vibes at Foreigner 🌟",
    likes: 203,
    comments: 14,
    timestamp: "1d",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1609590981063-d495e2914ce4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    caption: "Coffee beans from around the world 🌍",
    likes: 178,
    comments: 11,
    timestamp: "2d",
  },
  {
    id: 9,
    image:
      "https://images.pexels.com/photos/32710321/pexels-photo-32710321/free-photo-of-delicious-breakfast-spread-with-croissant.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
    caption: "Cozy corner for reading 📚",
    likes: 134,
    comments: 7,
    timestamp: "2d",
  },
  {
    id: 10,
    image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
    caption: "Evening ambiance 🌙",
    likes: 267,
    comments: 19,
    timestamp: "3d",
  },
  {
    id: 11,
    image:
      "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?cs=srgb&dl=pexels-kyleroxas-2122294.jpg&fm=jpg",
    caption: "Team behind the magic 👨‍🍳👩‍🍳",
    likes: 312,
    comments: 25,
    timestamp: "3d",
  },
  {
    id: 12,
    image:
      "https://w0.peakpx.com/wallpaper/120/799/HD-wallpaper-french-breakfast-cafe-food-french-breakfast-two-coffee-coffee-time-hot-drink-croissant-white-cups.jpg",
    caption: "Sunday brunch special 🥞",
    likes: 189,
    comments: 13,
    timestamp: "4d",
  },
];

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  1024: 2,
  768: 2,
  0: 1,
};

const shuffleArray = (array: typeof instagramPosts) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function InstagramFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [shuffledPosts, setShuffledPosts] = useState(instagramPosts);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setShuffledPosts(shuffleArray(instagramPosts));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              @foreignercafe
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Follow our journey and see what's brewing in our community
          </p>
          <a
            href="https://instagram.com/foreignercafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 text-sm sm:text-base"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </a>
        </div>

        {/* Instagram Posts Layout */}
        <div className="block sm:hidden grid grid-cols-1 gap-4">
          {shuffledPosts.map((post, index) => (
            <div
              key={post.id}
              className="group transition-all duration-500"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredPost === post.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-white text-center p-4">
                    <div className="flex items-center justify-center space-x-6 mb-4 text-xs">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 fill-current" />
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        <span className="font-medium">{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        <span className="font-medium">View</span>
                      </div>
                    </div>
                    <p className="text-xs opacity-90 line-clamp-2 mb-2">
                      {post.caption}
                    </p>
                    <p className="text-[10px] opacity-70">
                      {post.timestamp} ago
                    </p>
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                      hoveredPost === post.id ? "scale-110 bg-white/30" : ""
                    }`}
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Masonry layout on sm+ screens */}
        <div className="hidden sm:block">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4"
          >
            {shuffledPosts.map((post, index) => (
              <div
                key={post.id}
                className={`group mb-4 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{
                      height: `${300 + (index % 3) * 50}px`,
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredPost === post.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="text-white text-center p-4">
                      <div className="flex items-center justify-center space-x-6 mb-4">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 mr-2 fill-current" />
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <ExternalLink className="w-5 h-5 mr-2" />
                          <span className="font-medium">View</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm opacity-90 line-clamp-2 mb-2">
                        {post.caption}
                      </p>
                      <p className="text-[10px] sm:text-xs opacity-70">
                        {post.timestamp} ago
                      </p>
                    </div>
                  </div>

                  {/* Instagram Icon */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredPost === post.id ? "scale-110 bg-white/30" : ""
                      }`}
                    >
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/foreignercafe/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className=" uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-4 py-2">
              View more on instagram
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
