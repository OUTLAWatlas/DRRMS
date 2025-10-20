import { Link } from "react-router-dom";

export default function UserPortal() {
  return (
    <section className="relative">
      <div className="relative min-h-[calc(100vh-140px)]">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop"
          alt="Workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 p-6">
            <Link
              to="/user/rescue"
              className="rounded-full bg-white/95 text-black text-lg font-semibold px-8 py-4 shadow-xl hover:bg-white transition"
            >
              RESCUE
            </Link>
            <Link
              to="/user/resources"
              className="rounded-full bg-white/95 text-black text-lg font-semibold px-8 py-4 shadow-xl hover:bg-white transition"
            >
              RESOURCES
            </Link>
            <Link
              to="/user/report"
              className="rounded-full bg-white/95 text-black text-lg font-semibold px-8 py-4 shadow-xl hover:bg-white transition"
            >
              REPORT DISASTER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
