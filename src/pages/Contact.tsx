import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@maisonaura.com', href: 'mailto:hello@maisonaura.com' },
    { icon: Phone, label: 'Phone', value: '+212 522 123 456', href: 'tel:+212522123456' },
    { icon: MapPin, label: 'Address', value: '123 Boulevard Mohammed VI, Casablanca, Morocco', href: '#' },
    { icon: Clock, label: 'Hours', value: 'Mon - Sat: 9AM - 7PM', href: '#' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl text-offwhite mb-4">Contact Us</h1>
          <p className="text-offwhite/50 max-w-md mx-auto">
            We would love to hear from you. Reach out for inquiries, collaborations, or just to say hello.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 border border-gold/5 hover:border-gold/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-offwhite/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-offwhite text-sm group-hover:text-gold transition-colors">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-offwhite mb-2">Message Sent!</h3>
                  <p className="text-offwhite/50">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none resize-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-4 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
