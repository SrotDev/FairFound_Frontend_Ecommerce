import { NavLink } from "@/components/NavLink";
import { Package, MessageSquare, Map, BarChart3, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import FairfoundLogo from "../../../public/Fairfound_Logo.svg";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={User ? "/freelancer/dashboard" : "/"} className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <img src={FairfoundLogo} alt="FairFound Logo" className="h-9" />
              <span className="text-xl font-bold">FairFound</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <NavLink
                to="/ecommerce/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-muted text-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/ecommerce/products"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-muted text-foreground"
              >
                <Package className="h-4 w-4" />
                Products
              </NavLink>
              <NavLink
                to="/ecommerce/sentiment"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-muted text-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                Sentiment
              </NavLink>
              <NavLink
                to="/ecommerce/roadmap"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-muted text-foreground"
              >
                <Map className="h-4 w-4" />
                Roadmap
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-full"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:inline">E-commerce Seller</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/ecommerce/profile")}
              className="h-9 w-9 rounded-full"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
