import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Gadiyo - Car Rental Platform",
  description:
    "Learn how Gadiyo protects your privacy and handles your personal data on our car rental platform.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "05 September, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-16 mt-20">
        <div className="container max-w-[1390px] mx-auto px-4">
          <h1 className="text-2xl pt-10 md:text-5xl font-bold text-primary text-center mb-4">
            Privacy Policy
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
              This Privacy Policy explains how Gadiyo collects, uses, and
              protects your personal information when you use our car rental
              platform.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to Gadiyo's Privacy Policy. Gadiyo Technologies Private
                Limited ("we," "us," or "our") operates a platform that connects
                car rental agencies with users across India. This Privacy Policy
                describes how we collect, use, store, and disclose your personal
                information when you use our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using our platform, you agree to the collection and use of
                information in accordance with this Privacy Policy. We are
                committed to protecting your privacy and ensuring the security
                of your personal information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect personal information that you provide directly to us,
                including:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Name, email address, and phone number</li>
                <li>• Date of birth and government-issued ID information</li>
                <li>• Driving license details</li>
                <li>
                  • Payment information (processed securely through third-party
                  providers)
                </li>
                <li>• Profile photo and preferences</li>
                <li>• Communication history with our support team</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Usage Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We automatically collect certain information when you use our
                platform:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• IP address and device information</li>
                <li>• Browser type and version</li>
                <li>• Pages visited and time spent on our platform</li>
                <li>• Search queries and booking history</li>
                <li>• Location data (with your consent)</li>
                <li>• Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Information from Third Parties
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may receive information from:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Partner agencies about your rentals</li>
                <li>
                  • Social media platforms (if you choose to connect accounts)
                </li>
                <li>• Background check and verification services</li>
                <li>• Payment processors and financial institutions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use your personal information for the following purposes:
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Service Provision
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>
                  • Facilitate car rental bookings between users and agencies
                </li>
                <li>• Process payments and manage transactions</li>
                <li>• Verify user identity and eligibility</li>
                <li>• Provide customer support and resolve disputes</li>
                <li>• Send booking confirmations and important updates</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Platform Improvement
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Analyze usage patterns to improve our services</li>
                <li>• Personalize your experience and recommendations</li>
                <li>• Develop new features and functionality</li>
                <li>• Conduct research and analytics</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Legal and Safety
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Comply with legal obligations and regulations</li>
                <li>• Prevent fraud and ensure platform security</li>
                <li>• Protect the rights and safety of our users</li>
                <li>• Enforce our Terms and Conditions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                With Rental Agencies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We share necessary booking and contact information with agencies
                to facilitate your rental. This includes your name, contact
                details, and rental requirements.
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Service Providers
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We work with trusted third-party service providers who assist us
                in:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Payment processing and financial services</li>
                <li>• Background checks and identity verification</li>
                <li>• Cloud hosting and data storage</li>
                <li>• Customer support and communication tools</li>
                <li>• Analytics and marketing services</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Legal Requirements
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may disclose your information when required by law or to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Comply with legal processes or government requests</li>
                <li>• Protect our rights, privacy, safety, or property</li>
                <li>• Investigate potential violations of our terms</li>
                <li>• Respond to emergency situations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                5. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement comprehensive security measures to protect your
                personal information:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• SSL encryption for data transmission</li>
                <li>
                  • Secure data centers with physical and digital access
                  controls
                </li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Employee training on data protection practices</li>
                <li>
                  • Limited access to personal information on a need-to-know
                  basis
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                While we strive to protect your information, no method of
                transmission over the internet is 100% secure. We cannot
                guarantee absolute security but are committed to using
                industry-standard practices.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal
                information:
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Access and Update
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>
                  • Access your personal information through your account
                  settings
                </li>
                <li>• Update or correct inaccurate information</li>
                <li>• Request a copy of your data in a portable format</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Control and Deletion
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Delete your account and associated data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Manage cookie preferences</li>
                <li>
                  • Withdraw consent for data processing (where applicable)
                </li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Location Data
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                You can control location data sharing through your device
                settings. Disabling location services may limit certain platform
                features.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                7. Data Retention
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Provide our services and maintain your account</li>
                <li>• Comply with legal obligations and regulations</li>
                <li>• Resolve disputes and enforce agreements</li>
                <li>• Improve our services and user experience</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                When you delete your account, we will remove your personal
                information within 30 days, except for information we're
                required to retain for legal or regulatory purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Remember your preferences and settings</li>
                <li>• Authenticate users and prevent fraud</li>
                <li>• Analyze platform usage and performance</li>
                <li>• Provide personalized content and advertisements</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                You can manage cookie preferences through your browser settings.
                However, disabling certain cookies may affect platform
                functionality.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our platform is not intended for children under 18 years of age.
                We do not knowingly collect personal information from children.
                If you believe we have collected information from a child,
                please contact us immediately.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Parents or guardians who discover their child has provided
                personal information should contact us to request deletion of
                such information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                10. International Data Transfers
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your information may be transferred to and processed in
                countries other than India. We ensure appropriate safeguards are
                in place to protect your data during such transfers, including:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Adequacy decisions by relevant authorities</li>
                <li>• Standard contractual clauses</li>
                <li>• Certification schemes and codes of conduct</li>
                <li>• Other legally recognized protection mechanisms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or applicable laws. We will notify you
                of significant changes through:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>• Email notifications to registered users</li>
                <li>• Prominent notices on our platform</li>
                <li>• Push notifications through our mobile app</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Your continued use of our platform after changes become
                effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                12. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Privacy Officer:</strong> privacy@gadiyo.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>General Inquiries:</strong> support@gadiyo.com
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
