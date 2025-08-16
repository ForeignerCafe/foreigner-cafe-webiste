// @ts-nocheck
"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string;
  alt?: string;
  buttonText: string;
}

interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
}

interface ExperiencesSectionData {
  experiences: Experience[];
  testimonials: Testimonial[];
}

export default function ExperiencesClientPage() {
  const [data, setData] = useState<ExperiencesSectionData>({
    experiences: [],
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/experiences");
      const result = await response.json();

      if (result.success) {
        // Filter only published experiences
        const publishedExperiences = result.data.experiences.filter(
          (exp: any) => exp.isPublished !== false
        );

        setData({
          experiences: publishedExperiences,
          testimonials: result.data.testimonials || [],
        });
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            </div>
          }
        >
          <main className="flex flex-col min-h-screen">
            <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
              <Image
                src="/images/expHero.webp"
                alt="Loading Experiences"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </section>
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 h-96 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </Suspense>
      </div>
    );
  }

  if (data.experiences.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          </div>
        }
      >
        <main className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
            <Image
              src="/images/expHero.webp"
              alt="People gathering under string lights"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight sm:mb-10 mt-14 uppercase">
                Unique Experiences Await You
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto pb-6 sm:pb-10">
                Discover our carefully crafted experiences designed to create
                lasting memories.
              </p>
              <Button
                onClick={() => scrollToSection("experiences")}
                className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
              >
                Explore Experiences
              </Button>
            </div>
          </section>

          {/* Experiences Section - Using Reference Logic */}
          <section id="experiences" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Our Experiences
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover unique moments and create lasting memories with us
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {data.experiences.slice(0, 6).map((experience) => (
                  <div
                    key={experience.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={
                          experience.imageSrc ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={experience.alt || experience.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">
                        {experience.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 text-[13px]">
                        {experience.description}
                      </p>
                      <Link href={`/experiences/${experience.slug}`}>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          {experience.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              {data.testimonials.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-center mb-12">
                    What Our Guests Say
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md"
                      >
                        <div className="flex items-center mb-4">
                          <Image
                            src={
                              testimonial.avatar ||
                              "/placeholder.svg?height=50&width=50"
                            }
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-semibold">
                              {testimonial.name}
                            </h4>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Button */}
              {data.experiences.length > 6 && (
                <div className="text-center mt-12">
                  <Link href="/experiences">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      View All Experiences
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
      </Suspense>
    </div>
  );
}
