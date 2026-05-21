import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { isSignedIn, userName, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.error("Sign out failed:", e);
      }
    } else {
      try {
        await signIn();
      } catch (e) {
        console.error("Sign in failed:", e);
      }
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <div className="logo flex items-center justify-center">
              <Box size={20} />
            </div>
            <span className="name">Roomy</span>
          </div>
          <ul className="links">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#pricing">Pricing</a>
            <a href="#community">Community</a>
          </ul>
        </div>

        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {userName ? `Hi ${userName}` : "Signed In"}
              </span>
              <Button size="sm" variant="outline" onClick={handleAuthClick}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <button className="login" onClick={handleAuthClick}>
                Sign In
              </button>
              <Button
                size="md"
                className="btn--primary"
                onClick={() => (window.location.href = "#upload")}
              >
                Start Building
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
