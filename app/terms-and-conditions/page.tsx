import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Gadiyo - Car Rental Platform",
  description:
    "Read Gadiyo's terms and conditions for our car rental platform connecting agencies and users across India.",
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "05 September, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-16 mt-20">
        <div className="container max-w-[1390px] mx-auto px-4">
          <h1 className="text-2xl pt-10 md:text-5xl font-bold text-primary text-center mb-4">
            Terms and Conditions
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <p className="text-md text-center text-gray-600 dark:text-gray-300">
              <strong>Last updated:</strong> {lastUpdated}
            </p>
            <p className="text-sm text-center pt-2 text-gray-600 dark:text-gray-300">
              These Terms and Conditions govern your use of Gadiyo's platform
              and services.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using Gadiyo's platform, you accept and agree
                to be bound by the terms and provision of this agreement. If you
                do not agree to abide by the above, please do not use this
                service.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Gadiyo operates as a platform connecting car rental agencies
                with users seeking vehicle rentals across India. We facilitate
                bookings but do not own or operate the vehicles listed on our
                platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                2. Definitions
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>"Platform"</strong> - Gadiyo's website, mobile
                  application, and related services
                </li>
                <li>
                  <strong>"Agency"</strong> - Car rental service providers who
                  list vehicles on our platform
                </li>
                <li>
                  <strong>"User"</strong> - Individuals seeking to rent vehicles
                  through our platform
                </li>
                <li>
                  <strong>"Booking"</strong> - A confirmed reservation for a
                  vehicle rental
                </li>
                <li>
                  <strong>"Services"</strong> - All services provided by Gadiyo
                  including platform access, booking facilitation, and customer
                  support
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                3. User Responsibilities
              </h2>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                For Users (Renters)
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>
                  • Must be at least 21 years old with a valid driving license
                </li>
                <li>
                  • Provide accurate and complete information during
                  registration and booking
                </li>
                <li>
                  • Comply with all applicable traffic laws and regulations
                </li>
                <li>• Return vehicles in the same condition as received</li>
                <li>• Pay all applicable fees, tolls, fines, and penalties</li>
                <li>• Report any accidents or damages immediately</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                For Agencies (Service Providers)
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Maintain valid business licenses and registrations</li>
                <li>• Provide accurate vehicle information and availability</li>
                <li>• Ensure vehicles are properly maintained and insured</li>
                <li>• Honor confirmed bookings and pricing</li>
                <li>• Provide customer support for their rental services</li>
                <li>• Comply with local regulations and safety standards</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                4. Booking and Payment
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All bookings are subject to availability and confirmation by the
                respective agency. Gadiyo facilitates the booking process but is
                not responsible for the actual rental service delivery.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Payment terms are set by individual agencies</li>
                <li>
                  • Gadiyo may charge a platform fee for booking facilitation
                </li>
                <li>
                  • Cancellation policies vary by agency and are clearly stated
                  during booking
                </li>
                <li>• Refunds are subject to agency policies and terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                5. Platform Usage Guidelines
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Users and agencies agree not to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • Use the platform for any illegal or unauthorized purpose
                </li>
                <li>• Violate any laws in your jurisdiction</li>
                <li>
                  • Post false, inaccurate, misleading, or defamatory content
                </li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>
                  • Interfere with or disrupt the platform's functionality
                </li>
                <li>
                  • Use the platform to transmit viruses or malicious code
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Gadiyo acts as an intermediary platform connecting agencies with
                users. We are not responsible for:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Vehicle condition, safety, or suitability</li>
                <li>• Actions or omissions of agencies or users</li>
                <li>• Accidents, damages, or injuries during vehicle use</li>
                <li>• Disputes between agencies and users</li>
                <li>• Loss or damage to personal property</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                7. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Our collection and use of
                personal information is governed by our Privacy Policy, which
                forms part of these Terms and Conditions.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using our platform, you consent to the collection and use of
                your information as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                8. Dispute Resolution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While we strive to facilitate smooth transactions, disputes may
                arise between users and agencies. In such cases:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Contact our customer support team for assistance</li>
                <li>• We will make reasonable efforts to mediate disputes</li>
                <li>• Final resolution remains between the parties involved</li>
                <li>
                  • Legal disputes are subject to the jurisdiction of Ahmedabad,
                  Gujarat, India
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                9. Modifications to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Gadiyo reserves the right to modify these Terms and Conditions
                at any time. Changes will be effective immediately upon posting
                on our platform. Continued use of our services after changes
                constitutes acceptance of the modified terms.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Users and agencies will be notified of significant changes via
                email or platform notifications.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                10. Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Either party may terminate their account at any time. Gadiyo
                reserves the right to suspend or terminate accounts that violate
                these terms or engage in fraudulent activities.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Upon termination, users lose access to the platform, but
                existing bookings remain valid subject to agency policies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                11. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about these Terms and Conditions, please
                contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> legal@gadiyo.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Phone:</strong> +91-98765-43210
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Address:</strong> Gadiyo Technologies Private Limited
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
