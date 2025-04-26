import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Star, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn Your Ideas Into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Reality
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Share, validate, and develop your startup ideas with community feedback and AI-powered analysis.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/ideas">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                Explore Ideas
              </Button>
            </Link>
            <Link href="/handler/signin">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-6">
                <Rocket className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Share Your Idea</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Describe your concept, target market, and business model in a structured format.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-4 mb-6">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Community Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive votes and comments from a diverse community of entrepreneurs, developers, and investors.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-4 mb-6">
                <Zap className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get instant AI-generated feedback on market potential, unique value proposition, and competitive landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Idea?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of innovators and get the validation and feedback you need to succeed.
          </p>
          <Link href="/handler/signin">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  "The feedback I received on my idea was invaluable. The AI analysis pointed out market gaps I hadn't considered, and the community helped me refine my concept."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ml-3">
                    <h4 className="font-bold">Jane Doe</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Founder, TechStart</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
