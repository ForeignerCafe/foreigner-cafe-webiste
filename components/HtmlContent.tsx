"use client"
import { useEffect, useRef } from "react";

export default function ExperienceContent({ content }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find and execute all <script> tags inside the HTML
    container.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");

      if (oldScript.src) {
        newScript.src = oldScript.src; // external scripts
        newScript.async = true;
      } else {
        newScript.textContent = oldScript.innerHTML; // inline scripts
      }

      document.body.appendChild(newScript);
      oldScript.remove(); // optional cleanup
    });
  }, [content]);

  return (
    <article className="prose prose-lg max-w-none">
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-base
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:text-gray-700 prose-ol:text-gray-700 prose-ul:space-y-1 prose-ol:space-y-1
          prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
          prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 
          prose-blockquote:p-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-lg
          prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
          prose-hr:border-gray-200 prose-hr:my-6
          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
      />
    </article>
  );
}
