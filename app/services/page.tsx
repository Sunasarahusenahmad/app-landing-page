import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover our comprehensive mobile app services including custom development, consulting, and support.",
};

export default function Services() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">App Development</h2>
            <p>Custom mobile app development for iOS and Android platforms.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">UI/UX Design</h2>
            <p>
              Beautiful, user-friendly interface design for optimal user
              experience.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Consulting</h2>
            <p>
              Strategic mobile app consulting to help you make informed
              decisions.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
