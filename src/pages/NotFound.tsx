import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/ui/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | LUNEXO MEDIA"
        description="The page you're looking for doesn't exist. Return to LUNEXO MEDIA homepage for digital marketing, web design, and AI automation services."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/404"
        keywords="404, page not found, LUNEXO MEDIA"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="https://lunexomedia.com/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;