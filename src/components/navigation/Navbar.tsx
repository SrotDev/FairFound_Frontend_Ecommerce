


import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Package, MessageSquare, Map, BarChart3, Moon, Sun, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const isHome = location.pathname === "/";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/ecommerce/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/80">
            <User className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold">FairFound</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
          </button>

          <Button variant="ghost" asChild>
            <Link to="/ecommerce/dashboard">Dashboard</Link>
          </Button>
          {/* Removed Products, Sentiment, and Roadmap navlinks. Navigation is now via dashboard cards. */}
          <Link to="/ecommerce/profile" className="flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-accent transition-colors">
            <User className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
