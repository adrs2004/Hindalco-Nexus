import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMapPin, FiPhone, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", "6c815af1-346c-4fd6-981b-95d4b91ee003");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus(data.message || "Error submitting form");
      }
    } catch (error) {
      setStatus("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="contact" className="min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encountering an issue or need assistance? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full"></div>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 relative z-10">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiMessageSquare className="text-gray-500" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Your Message..."
                    required
                  ></textarea>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-white ${
                  isSubmitting
                    ? "bg-red-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                } transition-all shadow-md`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  <>
                    <FiSend className="text-lg" />
                    Send Message
                  </>
                )}
              </motion.button>

              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center text-sm ${
                    status.includes("success") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 lg:pl-12 relative"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Contact Information
              </h3>
              <p className="text-gray-600">
                Feel free to reach out through any of these channels:
              </p>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-red-100 rounded-lg text-red-600">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      Renukoot Colony, Hindalco Colony, Uttar Pradesh 231217
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-red-100 rounded-lg text-red-600">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Email</h4>
                    <a
                      href="mailto:adarsh21122004@gmail.com"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      adarsh21122004@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-red-100 rounded-lg text-red-600">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                    <a
                      href="tel:+918528882012"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      +91 8528882012
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Map with animated border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-red-200/20 pointer-events-none" />
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3638.6701055853223!2d83.03206437603998!3d24.218330870650085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398edaff6267a929%3A0x20892c7bef6dc475!2sRenukoot%20Colony%2C%20Hindalco%20Colony%2C%20Renukoot%2C%20Uttar%20Pradesh%20231217!5e0!3m2!1sen!2sin!4v1722759496186!5m2!1sen!2sin"
  className="w-full h-40 sm:h-52 lg:h-60 border-0"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
