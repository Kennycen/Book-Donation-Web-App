import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import DatabaseSearchBar from '../components/DatabaseSearchBar'
import RecommendedBooks from '../components/RecommendedBooks'
import Organizations from '../components/Organizations'
import About from '../components/About'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleSearchResults = (results) => {
    if (results && results.length > 0) {
      navigate(`/product/${results[0]._id}`);
    }
  };

  return (
    <div>
      <NavBar />
      <Hero />
      <Organizations />
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-prata text-3xl font-bold text-center mb-4">Search Our Collection</h2>
        <DatabaseSearchBar onSearchResults={handleSearchResults} />
      </div>
      <About />
      <RecommendedBooks />
      <Footer />
    </div>
  )
}

export default Home