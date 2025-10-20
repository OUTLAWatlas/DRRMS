import { Link } from "react-router-dom";

export default function Index() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-140px)]">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop"
            alt="Family outdoors"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full w-full flex items-center justify-center p-6">
            <Link
              to="/user"
              className="rounded-full bg-white/95 text-black text-lg md:text-xl font-semibold px-8 py-4 shadow-xl hover:bg-white transition"
            >
              USER PORTAL
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1601758124217-3c28bbca77eb?q=80&w=1600&auto=format&fit=crop"
            alt="Firefighter"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full w-full flex items-center justify-center p-6">
            <Link
              to="/rescue"
              className="rounded-full bg-white/95 text-black text-lg md:text-xl font-semibold px-8 py-4 shadow-xl hover:bg-white transition"
            >
              RESCUE PORTAL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
