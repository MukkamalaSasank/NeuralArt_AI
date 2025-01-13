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
    <section className="max-w-xxl mx-auto p-10 bg-[#1e1e2e] text-white rounded-lg shadow-lg">
      <div className="mb-12">
        <h1 className="font-extrabold text-[#c4c4ff] text-[42px] leading-tight">
          Explore AI-Generated Art
        </h1>
        <p className="mt-6 text-[#a8a8b3] text-lg leading-relaxed max-w-xxl">
          Welcome to NeuralArt AI—a community-driven platform that transforms
          your imaginations into reality. Describe your ideas, and let our
          advanced AI create mesmerizing visuals for you. Browse stunning
          creations or share your own masterpieces to inspire the world!
        </p>
      </div>

      <div className="mt-10">
      <label className="text-white text-lg">Search Creations</label>
        <FormField
          type="text"
          name="text"
          placeholder="Search by name or prompt..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#a8a8b3] text-xl mb-6">
                Showing Results for{" "}
                <span className="text-[#c4c4ff]">"{searchText}"</span>
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
    </section>
  );
}
