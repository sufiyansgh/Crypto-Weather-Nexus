
import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
