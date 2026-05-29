import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { roomInspirations, beforeAfters, customerShowcases } from '../data/rooms';

export default function Inspiration() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Get Inspired</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-offwhite mb-4">Interior Inspiration</h1>
          <p className="text-offwhite/50 max-w-lg mx-auto">
            Discover how our pieces transform spaces into sanctuaries of Moroccan luxury.
          </p>
        </motion.div>
      </div>

      {/* Room Inspirations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="font-serif text-3xl text-offwhite mb-10">Shop the Room</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {roomInspirations.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3]">
                <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-gold text-xs tracking-widest uppercase">{room.category}</span>
                <h3 className="font-serif text-2xl text-offwhite mt-1 mb-2">{room.title}</h3>
                <p className="text-offwhite/60 text-sm mb-4 line-clamp-2">{room.description}</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors"
                >
                  Shop This Look <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before & After */}
      <section className="bg-charcoal py-24 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-offwhite mb-4">Transformations</h2>
            <p className="text-offwhite/50">See the Maison Aura difference</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfters.map((ba, i) => (
              <motion.div
                key={ba.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <img src={ba.beforeImage} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-dark/80 text-offwhite text-xs rounded">Before</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <img src={ba.afterImage} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 px-2 py-1 bg-gold text-dark text-xs rounded font-medium">After</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-xl text-offwhite">{ba.title}</h3>
                  <p className="text-offwhite/50 text-sm mt-1">{ba.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl text-offwhite mb-4">#MaisonAuraHome</h2>
          <p className="text-offwhite/50">Real homes, real transformations</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {customerShowcases.map((showcase, i) => (
            <motion.div
              key={showcase.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={showcase.image}
                alt={showcase.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-offwhite text-sm mb-2">{showcase.caption}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold text-xs font-medium">{showcase.customerName}</p>
                    <p className="text-offwhite/50 text-[10px]">{showcase.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                    <span className="text-offwhite/70 text-xs">{showcase.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
