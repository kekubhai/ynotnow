import { IdeaFeed } from "@/components/idea-feed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, Users, Rocket } from "lucide-react";

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Share Your Startup Ideas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get AI-powered analysis and peer validation for your startup ideas. Join a community of innovators and entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose YNOTNOW?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <Lightbulb className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">Get instant feedback and analysis on your startup ideas using advanced AI technology.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Users className="w-12 h-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Community Validation</h3>
              <p className="text-muted-foreground">Connect with like-minded entrepreneurs and get valuable feedback on your ideas.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Rocket className="w-12 h-12 mb-4 text-pink-500" />
              <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground">Turn your ideas into reality with our comprehensive analysis and community support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Ideas</h2>
            <Button variant="outline">
              <Link href="/auth/signin">Share Your Idea</Link>
            </Button>
          </div>
          <IdeaFeed />
        </div>
      </section>
    </main>
  );
}
