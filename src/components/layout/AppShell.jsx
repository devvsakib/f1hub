import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AppShell() {
  const [driversStandings, setDriversStandings] = useState(null);
  const [constructorsStandings, setConstructorsStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [season, setSeason] = useState('2025');
  const linkToFetch = `https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&seasontype=2&group=0&sort=points%3Adesc`;
  const linkToFetchConstructors = `https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&seasontype=2&group=1&sort=points%3Adesc`;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [driversRes, constructorsRes] = await Promise.all([
          axios.get(`${linkToFetch}&season=${season}`),
          axios.get(`${linkToFetchConstructors}&season=${season}`),
        ]);
        if (driversRes.status !== 200 || constructorsRes.status !== 200) {
          throw new Error("Failed to fetch standings");
        }
        setDriversStandings(driversRes.data);
        setConstructorsStandings(constructorsRes.data);
      } catch (err) {
        setError("Failed to load standings. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [season]);

  const sharedData = {
    driversStandings,
    constructorsStandings,
    loading,
    error,
    season,
    setSeason
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet context={sharedData} />
      </main>
      <Footer />
    </div>
  );
}
