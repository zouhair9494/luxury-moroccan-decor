import { motion } from 'framer-motion';
import { Award, Users, Globe, Gem } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Gem,
      title: 'Authentic Craftsmanship',
      desc: 'Every piece is handcrafted by master artisans using techniques passed down through generations.',
    },
    {
      icon: Globe,
      title: 'Sustainable Sourcing',
      desc: 'We partner directly with local cooperatives, ensuring fair wages and sustainable practices.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      desc: 'Only the finest materials make it into our collection. We never compromise on quality.',
    },
    {
      icon: Users,
      title: 'Community First',
      desc: 'A portion of every purchase supports artisan education programs across Morocco.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Our Story</p>
            <h1 className="font-serif text-5xl sm:text-6xl text-offwhite mb-6 leading-tight">
              Where Heritage<br />
              <span className="text-gold-gradient">Meets Modernity</span>
            </h1>
            <p className="text-offwhite/60 leading-relaxed mb-6">
              Maison Aura was born from a deep appreciation for Moroccan artistry and a vision to bring its timeless elegance into contemporary homes worldwide.
            </p>
            <p className="text-offwhite/60 leading-relaxed">
              Founded in 2019 in Casablanca, we have grown from a small curation studio to an internationally recognized brand, working with over 200 artisans across Morocco.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img
              src="/images/hero.jpg"
              alt="Maison Aura"
              className="rounded-lg aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 p-6 glass rounded-lg">
              <p className="font-serif text-3xl text-gold">200+</p>
              <p className="text-offwhite/60 text-sm">Artisan Partners</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-charcoal py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '15K+', label: 'Happy Customers' },
              { value: '500+', label: 'Products' },
              { value: '30+', label: 'Countries Shipped' },
              { value: '5', label: 'Years of Excellence' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl text-gold mb-2">{stat.value}</p>
                <p className="text-offwhite/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">What We Stand For</p>
          <h2 className="font-serif text-4xl text-offwhite">Our Values</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg bg-charcoal/50 border border-gold/5 hover:border-gold/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-offwhite font-medium mb-2">{value.title}</h3>
              <p className="text-offwhite/50 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team / Artisans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">The Makers</p>
          <h2 className="font-serif text-4xl text-offwhite mb-4">Our Artisans</h2>
          <p className="text-offwhite/50 max-w-md mx-auto">
            Behind every piece is a skilled artisan whose hands bring centuries of tradition to life.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Fatima Benali', role: 'Master Weaver', location: 'Atlas Mountains' },
            { name: 'Youssef El Amrani', role: 'Brass Artisan', location: 'Fes' },
            { name: 'Aicha Moussaoui', role: 'Ceramicist', location: 'Safi' },
          ].map((artisan, i) => (
            <motion.div
              key={artisan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gold/10 mx-auto mb-4 flex items-center justify-center">
                <span className="font-serif text-3xl text-gold">{artisan.name.charAt(0)}</span>
              </div>
              <h3 className="text-offwhite font-medium">{artisan.name}</h3>
              <p className="text-gold text-sm">{artisan.role}</p>
              <p className="text-offwhite/40 text-xs mt-1">{artisan.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
