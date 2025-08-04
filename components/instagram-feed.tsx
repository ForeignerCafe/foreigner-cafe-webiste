"use client";

import { useState, useEffect, useRef } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import Masonry from "react-masonry-css";
import { Button } from "./ui/button";

const INSTAGRAM_ACCESS_TOKEN = "IGAAI0lOfo5HBBZ..."; // 🔒 Replace with your token securely
const USER_ID = "8448803355243697";

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  1024: 2,
  768: 2,
  0: 1,
};

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption: string;
  like_count?: number;
  comments_count?: number;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
    try {
      const res = await fetch("/api/instagram");

      if (!res.ok) {
        throw new Error("Failed to fetch from internal API");
      }
      const data = await res.json();
      setPosts(data);
      return data;
    } catch (error) {
      console.error("Client-side fetch error:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchInstagramPosts();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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

        {/* Posts Masonry Layout */}
        <div className="hidden sm:block">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4"
          >
            {posts.map((post, index) => (
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
                  {post.media_type === "IMAGE" ? (
                    <img
                      src={post.media_url}
                      alt={post.caption || ""}
                      className="..."
                    />
                  ) : (
                    <video
                      src={post.media_url}
                      // controls
                      autoPlay
                      muted
                      loop
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ height: `${300 + (index % 3) * 50}px` }}
                    />
                  )}
                  {/* <img
                    src={post.media_url}
                    alt={post.caption || ""}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{
                      height: `${300 + (index % 3) * 50}px`,
                    }}
                  /> */}

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
                          <span className="font-medium">
                            {post.like_count ?? 0}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">
                            {post.comments_count ?? 0}
                          </span>
                        </div>
                        <a
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          <span className="font-medium">View</span>
                        </a>
                      </div>
                      <p className="text-xs sm:text-sm opacity-90 line-clamp-2 mb-2">
                        {post.caption}
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

        {/* Load More */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/foreignercafe/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-4 py-2">
              View more on Instagram
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
