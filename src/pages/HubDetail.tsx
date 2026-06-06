import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Clock, Phone, Users, CheckCircle } from "lucide-react";
import { hubs } from "@/data/hubs";
import Navbar from "@/components/Navbar";
import PaymentDialog from "@/components/PaymentDialog";

const HubDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const hub = hubs.find((h) => h.slug === slug);

  if (!hub) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-display text-foreground text-2xl">Hub Not Found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline text-sm">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]">
        <img src={hub.image} alt={hub.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-start gap-3 flex-wrap">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-display text-foreground text-3xl md:text-5xl"
              >
                {hub.name}
              </motion.h1>
              {hub.verified && (
                <span className="mt-2 px-3 py-1 rounded-lg bg-primary/20 text-primary text-label flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {hub.city}</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {hub.rating.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {hub.visitors}</span>
              <span className="text-label">{hub.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-surface space-y-3"
          >
            <h2 className="text-heading text-foreground">About</h2>
            <p className="text-body text-muted-foreground leading-relaxed">{hub.description}</p>
          </motion.section>

          {/* Services */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-surface space-y-3"
          >
            <h2 className="text-heading text-foreground">Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hub.services.map((s) => (
                <div key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-sm text-foreground/80">
                  <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Reviews */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-surface space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-heading text-foreground">Reviews</h2>
              <span className="text-label">{hub.reviews.length} reviews</span>
            </div>
            <div className="space-y-4">
              {hub.reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{r.user}</span>
                    <span className="text-label">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3.5 h-3.5 ${j < r.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-body text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-surface space-y-4"
          >
            <h3 className="text-heading text-foreground text-base">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{hub.address}</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{hub.hours}</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{hub.phone}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card-surface text-center space-y-3"
          >
            <h3 className="text-heading text-foreground text-base">Payment</h3>
            <p className="text-body text-muted-foreground text-xs">
              Pay using any currency and off-ramp into the local currency you need to complete bookings worldwide.
            </p>
            <PaymentDialog hubName={hub.name} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
