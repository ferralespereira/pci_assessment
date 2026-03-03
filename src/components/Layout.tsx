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
      <footer className="text-white text-center p-3 mt-auto" style={{ backgroundColor: "rgb(32, 48, 70)", boxShadow: "-1px 2px 31.1px -2px #6a6b7d8c" }}>
        <h2>PCI Assessment</h2>
        <p>By Javier Ferrales, <a className="fs-5 text-warning" href="https://javierfolder.com">javierfolder.com</a></p>
      </footer>
    </div>
  );
}