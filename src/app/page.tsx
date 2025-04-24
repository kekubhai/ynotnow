"use client"

import Link from "next/link"
import { ArrowRight, Brain, Lightbulb, MessageSquare, Rocket, Sparkles, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MagicCard } from "@/components/magicui/magic-card"
import { useTheme } from "next-themes";
export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a20] to-[#0f0f2d] text-white overflow-hidden relative">
      {/* Stars background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
           
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-[150px]"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 rounded-full bg-blue-600 opacity-20 blur-[150px]"></div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                YNOTNOW
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex text-gray-300 hover:text-white hover:bg-white/10">
                Log in
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm mb-6">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-medium">Collaborative Innovation</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                YNOTNOW
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  $1.2M
                </span>
                <span className="block">
                  Across <span className="text-purple-400">500+</span> Startup Ideas
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                YNOTNOW users fully control their startup ideas, receiving AI-powered analysis and peer validation based
                on market demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 w-full"
                >
                  Share Your Idea
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 w-full">
                  Launch App
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-3xl">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    500+
                  </div>
                  <div className="text-sm text-gray-400">Ideas Shared</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    87%
                  </div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    $1.2M
                  </div>
                  <div className="text-sm text-gray-400">Funding Secured</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose YNOTNOW?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines human creativity with AI-powered insights to help validate and refine your startup
                ideas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <MagicCard  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI-Powered Analysis</h3>
                  <p className="text-gray-300">
                    Get instant feedback on your startup ideas with our advanced AI that analyzes market potential,
                    competition, and viability.
                  </p>
                </CardContent>
              </MagicCard>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Peer Validation</h3>
                  <p className="text-gray-300">
                    Connect with a community of entrepreneurs and innovators who provide valuable feedback and
                    validation for your ideas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                    <Star className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Funding Opportunities</h3>
                  <p className="text-gray-300">
                    Showcase your validated ideas to our network of investors and venture capitalists looking for the
                    next big thing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[100px] opacity-30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How YNOTNOW Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our simple process helps you validate and refine your startup ideas in just a few steps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Share Your Idea",
                  description:
                    "Post your startup concept on our platform with details about the problem it solves and target market.",
                  icon: <Lightbulb className="h-6 w-6 text-blue-400" />,
                },
                {
                  step: "02",
                  title: "Get AI Analysis",
                  description:
                    "Our AI engine analyzes your idea for market potential, competition, and provides actionable insights.",
                  icon: <Brain className="h-6 w-6 text-purple-400" />,
                },
                {
                  step: "03",
                  title: "Receive Peer Feedback",
                  description:
                    "Connect with entrepreneurs and innovators who provide valuable feedback and validation.",
                  icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
                },
              ].map((item, index) => (
                <div key={index} className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6 mt-2">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Startup Ideas" },
                { value: "2,500+", label: "Active Users" },
                { value: "$1.2M", label: "Funding Secured" },
                { value: "87%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 md:p-16 text-center backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bring Your Ideas to Life?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Join thousands of entrepreneurs who are turning their startup dreams into reality with YNOTNOW.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  Learn More
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0"
                >
                  Share Your Idea
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  YNOTNOW
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Turning startup ideas into reality through AI-powered analysis and community validation.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link key={social} href={`#${social}`} className="text-gray-500 hover:text-blue-400">
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-xs">{social[0].toUpperCase()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-200">Product</h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Testimonials", "FAQ", "Blog"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-200">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Partners", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-200">Subscribe</h3>
              <p className="text-gray-400 mb-4">Get the latest updates and news about YNOTNOW.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-l-md border border-white/20 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="rounded-l-none bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} YNOTNOW. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add custom animation for stars */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
