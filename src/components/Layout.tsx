import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-primary text-white p-3">
        <h1>My Dashboard</h1>
      </header>

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