import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { isSignedIn, signIn, signOut } = useOutletContext<AuthContext>();

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
          <a href="/#">
            <div className="brand">
              <div className="logo flex items-center justify-center border border-black p-2">
                <Box size={20} />
              </div>
              <span className="name">Roomy</span>
            </div>
          </a>
          <ul className="links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#gallery">Gallery</a>
            <a href="#community">Community</a>
          </ul>
        </div>

        <div className="actions">
          {isSignedIn ? (
            <>
              <Button size="sm" variant="primary" href="/studio/floor-to-3d">
                Studio
              </Button>
              <Button size="sm" variant="outline" onClick={handleAuthClick}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="md"
                variant="primary"
                className="uppercase tracking-wider"
                onClick={handleAuthClick}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
