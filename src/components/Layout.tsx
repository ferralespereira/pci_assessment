import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-auto">
        © 2026 My Company
      </footer>
    </div>
  );
}