"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Quote } from "lucide-react";


export default function Home() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero Section */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-6 text-center space-y-6"
        >
          <Badge
            variant="outline"
            className="bg-green-100 text-green-900 text-2xl shadow-sm"
          >
            Split bills, not friendships.
          </Badge>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="gradient-title mx-auto max-w-4xl text-4xl font-extrabold md:text-7xl"
          >
            The smartest way to split, share, and stay even.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed"
          >
            Split smarter, not harder. Track group expenses, divide bills instantly,
            and settle up without the awkward math.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Link href="/#how-it-works" className="flex items-center gap-2">
                See How It Works
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="container mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
        >
          <div className="gradient p-[2px] rounded-2xl">
            <Image
              src="/hero.jpg"
              width={1780}
              height={920}
              alt="Banner"
              className="rounded-2xl mx-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-green-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-green-200 text-green-900 text-3xl">
            Features
          </Badge>

          <h2 className="gradient-title mt-2 text-4xl md:text-5xl font-bold">
            Everything you need to manage shared expenses
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Powerful tools designed to make splitting bills effortless and fun.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="flex flex-col items-center space-y-4 p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className={`rounded-full p-4 ${bg} shadow-md`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-gray-500">{description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-green-200 text-green-900 text-3xl">
            How It Works
          </Badge>

          <h2 className="gradient-title mt-2 text-4xl md:text-5xl font-bold">
            No math. No mess. Just good vibes.
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow these quick steps to split, settle, and smile with your crew.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(({ title, label, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-900 shadow-md">
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 max-w-xs">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
       {/* Testimonials Section */}

    <section className="relative bg-gradient-to-b from-green-50 via-white to-green-50 py-24 overflow-hidden">
      {/* Decorative blur background */}
      <div className="absolute inset-0 opacity-30 blur-3xl bg-gradient-to-r from-green-200 via-yellow-100 to-green-100"></div>

      <div className="relative container mx-auto px-6 text-center space-y-10">
        {/* Heading */}
        <Badge
          variant="outline"
          className="bg-green-100/80 text-green-800 text-xl font-semibold border-green-300"
        >
          Testimonials
        </Badge>

        <h2 className="gradient-title mt-2 text-4xl md:text-5xl font-extrabold">
          What our users are saying
        </h2>

        {/* Grid of Testimonials */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, image }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="group relative flex flex-col items-center justify-between rounded-2xl p-8 text-center shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 bg-white border border-green-100">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-4 text-green-400 opacity-30">
                  <Quote size={48} />
                </div>

                <CardContent className="flex flex-col items-center space-y-6">
                  <p className="text-gray-600 italic leading-relaxed">
                    “{quote}”
                  </p>

                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-14 w-14 ring-2 ring-green-300 ring-offset-2 group-hover:ring-green-500 transition-all duration-300">
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="text-sm text-green-700 font-medium">
                        {role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
<section className="relative py-24 bg-gradient-to-r from-[#A5D6A7] via-[#4CAF50] to-[#1B5E20] text-white overflow-hidden">
  {/* Decorative gradient blur */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]"></div>

  <div className="relative container mx-auto px-4 md:px-8 text-center space-y-8">
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Ready to Simplify Expense Sharing?
    </h2>

    <p className="mx-auto max-w-2xl text-lg md:text-xl text-green-50">
      Join thousands of friends who’ve made splitting bills <span className="font-semibold">easy, transparent,</span> and <span className="font-semibold">fun</span>.
    </p>

    <Button
      asChild
      size="lg"
      className="bg-white text-green-700 font-semibold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-green-50 transition-all duration-300"
    >
      <Link href="/dashboard" className="flex items-center gap-2">
        Get Started
        <ArrowRight className="h-5 w-5" />
      </Link>
    </Button>
  </div>
</section>

{/* Footer */}
<footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-500">
  <p>
    Made with ❤️ by <span className="font-medium text-gray-800 hover:text-green-600 transition-colors">Laxmi</span>
  </p>
</footer>


    </div>
  );
}
