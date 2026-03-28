import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, ArrowLeft, BrainCircuit, Shield, FileText, Info } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

export const AboutUs: React.FC<PageProps> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-16 px-4"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
    <h1 className="text-4xl font-bold text-zinc-900 mb-8">About aicruit</h1>
    <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
      <p className="text-xl leading-relaxed">
        aicruit is the world's premier job board dedicated exclusively to the field of Artificial Intelligence. 
        Our mission is to accelerate the development of AI by connecting the most innovative companies with the world's best talent.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
          <h3 className="text-xl font-bold text-zinc-900 mb-4">Our Vision</h3>
          <p>To be the central hub for the global AI workforce, fostering a community where the future of technology is built.</p>
        </div>
        <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
          <h3 className="text-xl font-bold text-zinc-900 mb-4">Our Mission</h3>
          <p>To simplify the hiring process in the complex AI landscape, providing clarity and opportunity for both candidates and employers.</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 mt-12">Why aicruit?</h2>
      <p>
        The AI landscape is evolving at an unprecedented pace. Traditional job boards often fail to capture the specific nuances 
        of AI roles—from LLM engineering to AI safety research. aicruit provides a specialized platform that understands these 
        distinctions, ensuring that the right talent finds the right challenge.
      </p>
    </div>
  </motion.div>
);

export const ContactUs: React.FC<PageProps> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-16 px-4"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
    <h1 className="text-4xl font-bold text-zinc-900 mb-8">Contact Us</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <p className="text-zinc-600">
          Have questions about posting a job or finding your next role? Our team is here to help.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-zinc-600">
            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <span>support@aicruit.com</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span>Global Remote / San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span>+1 (555) AI-JOBS</span>
          </div>
        </div>
      </div>
      <form className="space-y-4 bg-zinc-50 p-8 rounded-3xl border border-zinc-100" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700">Name</label>
          <input type="text" className="w-full bg-white border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700">Email</label>
          <input type="email" className="w-full bg-white border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none" placeholder="your@email.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700">Message</label>
          <textarea rows={4} className="w-full bg-white border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none resize-none" placeholder="How can we help?"></textarea>
        </div>
        <button className="w-full btn-primary py-3">Send Message</button>
      </form>
    </div>
  </motion.div>
);

export const PrivacyPolicy: React.FC<PageProps> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-16 px-4"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
    <h1 className="text-4xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
      <Shield className="w-8 h-8 text-emerald-500" />
      Privacy Policy
    </h1>
    <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
      <p className="text-sm italic">Last Updated: March 14, 2026</p>
      <section>
        <h2 className="text-xl font-bold text-zinc-900">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, post a job, or contact us for support.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-zinc-900">2. Use of Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about AI job opportunities.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-zinc-900">3. Cookies and Tracking</h2>
        <p>We use cookies and similar tracking technologies to analyze trends, administer the website, and track users' movements around the website.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-zinc-900">4. Advertising</h2>
        <p>We may use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
      </section>
    </div>
  </motion.div>
);

export const TermsConditions: React.FC<PageProps> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-16 px-4"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
    <h1 className="text-4xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
      <FileText className="w-8 h-8 text-zinc-900" />
      Terms & Conditions
    </h1>
    <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8">
      <p className="text-sm italic">Last Updated: March 14, 2026</p>
      
      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
        <p>By accessing or using aicruit ("the Website"), you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Use of the Service</h2>
        <p>aicruit provides a platform for employers to post job listings and for candidates to browse and apply for jobs in the field of Artificial Intelligence. You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Service.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Job Postings and User Content</h2>
        <p>Employers are solely responsible for the content of their job postings. aicruit does not guarantee the accuracy, integrity, or quality of any job listings. We reserve the right to remove any content that we deem inappropriate, fraudulent, or in violation of our policies.</p>
        <p className="mt-2">By submitting content to the Website, you grant aicruit a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with the Service.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Intellectual Property</h2>
        <p>The materials contained in this Website are protected by applicable copyright and trademark law. The "aicruit" name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of aicruit or its affiliates.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Prohibited Activities</h2>
        <p>You may not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Website for any fraudulent or unlawful purpose.</li>
          <li>Post any false, inaccurate, or misleading information.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the Website.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
          <li>Use any robot, spider, or other automatic device to access the Website for any purpose.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Disclaimer of Warranties</h2>
        <p>The materials on aicruit's Website are provided on an 'as is' basis. aicruit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Limitation of Liability</h2>
        <p>In no event shall aicruit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on aicruit's Website, even if aicruit or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which aicruit operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Changes to Terms</h2>
        <p>aicruit may revise these terms of service for its Website at any time without notice. By using this Website you are agreeing to be bound by the then current version of these terms of service.</p>
      </section>
    </div>
  </motion.div>
);
