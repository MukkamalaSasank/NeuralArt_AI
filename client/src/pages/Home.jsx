import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#8c93ff] text-xl uppercase">{title}</h2>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const results = await response.json();
          setAllPosts(results.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (post) =>
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a1b26] to-[#24273a] rounded-3xl shadow-2xl overflow-hidden mb-8 p-12">
        <div className="max-w-6xl flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-[#8c93ff] text-5xl leading-tight mb-6">
            Explore AI-Generated Art
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Welcome to NeuralArt AI - a community-driven platform that transforms
            your imaginations into reality. Describe your ideas, and let our
            advanced AI create mesmerizing visuals for you. Browse stunning
            creations or share your own masterpieces to inspire the world!
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-[#1e1e2e] rounded-2xl shadow-lg p-8 mb-8">
        <label className="text-[#8c93ff] text-lg font-medium block mb-4">
          Search Creations
        </label>
        <FormField
          type="text"
          name="text"
          placeholder="Search by name or prompt..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      {/* Gallery Section */}
      <div className="bg-[#1e1e2e] rounded-2xl shadow-lg p-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#8c93ff] text-xl mb-6">
                Showing Results for{" "}
                <span className="text-white">"{searchText}"</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts yet" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};