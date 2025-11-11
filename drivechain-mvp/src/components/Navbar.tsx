import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="bg-dark text-light p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          DriveChain SA
        </Link>
        <div className="space-x-4">
          <Link href="/demo" className="hover:text-primary transition-colors">
            Demo
          </Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Button variant="outline" className="text-light border-primary hover:bg-primary hover:text-dark">
            Request Demo
          </Button>
          <Button className="bg-secondary text-dark hover:bg-yellow-600">
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;