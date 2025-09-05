"use client";

import React, { useState, ChangeEvent } from "react";

// TypeScript interfaces
interface FormData {
  full_name: string;
  company: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone_number?: string;
  subject?: string;
  message?: string;
}

interface SubmitStatus {
  type: "success" | "error" | "";
  message: string;
}

interface SubjectOption {
  value: string;
  label: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    company: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "",
    message: "",
  });

  // Subject options for car rental service
  const subjectOptions: SubjectOption[] = [
    { value: "", label: "Select a service" },
    { value: "Car Rental Inquiry", label: "Car Rental Inquiry" },
    { value: "Agency Partnership", label: "Agency Partnership" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Booking Assistance", label: "Booking Assistance" },
    { value: "Fleet Management", label: "Fleet Management" },
    { value: "Pricing Inquiry", label: "Pricing Inquiry" },
    { value: "Technical Support", label: "Technical Support" },
    { value: "General Inquiry", label: "General Inquiry" },
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Name is required";
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number.replace(/\s+/g, ""))) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = "Please select a service";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        "http://69.62.78.40:4200/api/common/user-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name.trim(),
            email: formData.email.trim(),
            phone_number: formData.phone_number.replace(/\s+/g, ""),
            subject: formData.subject,
            message: formData.message.trim(),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          full_name: "",
          company: "",
          email: "",
          phone_number: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <!-- ======= Contact Start ======= --> */}
      <section id="support" className="pt-[100px] pb-[110px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Let's Stay Connected
            </h2>
            <p className="text-base text-body">
              Connect with us for all your car rental needs. Whether you're
              looking to rent a vehicle or partner with us as an agency, we're
              here to help.
            </p>
          </div>
        </div>

        <div className="container">
          <div
            className="wow fadeInUp mx-auto w-full max-w-[925px] rounded-lg bg-[#F8FAFB] px-8 py-10 shadow-card dark:bg-[#15182B] dark:shadow-card-dark sm:px-10"
            data-wow-delay=".3s"
          >
            {/* Status Messages */}
            {submitStatus.message && (
              <div
                className={`status-message ${
                  submitStatus.type === "success"
                    ? "status-success"
                    : "status-error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-col-half">
                  <div className="form-group">
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      placeholder="Enter your name *"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.full_name
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.full_name && (
                      <p className="error-text">{errors.full_name}</p>
                    )}
                  </div>
                </div>

                <div className="form-col-half">
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input form-input-normal"
                    />
                  </div>
                </div>

                <div className="form-col-half">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.email ? "form-input-error" : "form-input-normal"
                      }`}
                    />
                    {errors.email && (
                      <p className="error-text">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="form-col-half">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Enter your Phone Number *"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.phone_number
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.phone_number && (
                      <p className="error-text">{errors.phone_number}</p>
                    )}
                  </div>
                </div>

                <div className="form-col-full">
                  <div className="form-group">
                    <select
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`form-input form-select ${
                        errors.subject
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="error-text">{errors.subject}</p>
                    )}
                  </div>
                </div>

                <div className="form-col-full">
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      placeholder="Tell us about your requirements *"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`form-input form-textarea ${
                        errors.message
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.message && (
                      <p className="error-text">{errors.message}</p>
                    )}
                  </div>
                </div>

                <div className="form-col-full">
                  <div className="text-center">
                    <p className="mb-5 text-center text-base text-body">
                      By clicking contact us button, you agree our terms and
                      policy,
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`submit-button ${
                        isSubmitting
                          ? "submit-button-disabled"
                          : "submit-button-normal"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="loading-spinner"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Contact Us"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- ======= Contact End ======= --> */}
    </>
  );
};

export default Contact;
