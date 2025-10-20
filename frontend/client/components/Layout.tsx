import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-brand text-brand-foreground">
        <div className="container mx-auto flex items-center justify-center py-5 md:py-8">
          <Link to="/" className="select-none">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
              DRRMS
            </h1>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-black/90 text-white/80">
        <div className="container mx-auto py-4 text-center text-xs md:text-sm">
          <span>Disaster Resource Relief Management System</span>
        </div>
      </footer>
    </div>
  );
}
