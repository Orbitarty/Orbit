import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import StatsBar from "@/components/StatsBar";
import CategoryGrid from "@/components/CategoryGrid";
import HubCard from "@/components/HubCard";
import MapExplorer from "@/components/MapExplorer";
import CommandPalette from "@/components/CommandPalette";
import heroCity from "@/assets/hero-city.jpg";
import { hubs } from "@/data/hubs";

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CommandPalette />

      {/* Hero — full width */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroCity}
          alt="OrbitCity digital cityscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-label text-primary"
          >
            Decentralized City Discovery Protocol
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-display text-foreground sm:text-5xl md:text-6xl"
          >
            Discover the<br />
            <span className="text-primary">Programmable City</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-body text-muted-foreground max-w-lg mx-auto"
          >
            Explore hubs, locations, and experiences across 142 cities.
            Pay in any currency and off-ramp to local currency for global bookings.
          </motion.p>
          <SearchBar />
        </div>
      </section>

      {/* Content — full-bleed with padding */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 space-y-10 pb-20">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="-mt-8 relative z-10"
        >
          <StatsBar />
        </motion.div>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-heading text-foreground">Browse Categories</h2>
          <CategoryGrid />
        </section>

        {/* Map Explorer */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading text-foreground">Explore the Map</h2>
            <span className="text-label text-primary">{hubs.length} hubs worldwide</span>
          </div>
          <MapExplorer />
        </section>

        {/* Featured Hubs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading text-foreground">Featured Hubs</h2>
            <span className="text-label text-primary cursor-pointer hover:underline">View All</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {hubs.map((hub, i) => (
              <motion.div
                key={hub.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
              >
                <HubCard {...hub} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card-surface text-center py-12 md:py-16 space-y-4">
          <h2 className="text-display text-foreground text-2xl sm:text-3xl md:text-4xl">List Your Location</h2>
          <p className="text-body text-muted-foreground max-w-md mx-auto">
            Join the decentralized city network. Register your hub and reach explorers worldwide.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-colors duration-200"
          >
            Register a Hub
          </motion.button>
        </section>
      </div>
    </div>
  );
};

export default Index;
