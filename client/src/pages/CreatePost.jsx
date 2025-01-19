import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview, download } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

export default function CreatePost({ user, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle image download
  const downloadImage = () => {
    if (!form.photo) {
      alert("No image to download.");
      return;
    }

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = form.photo;
    link.download = `ai-generated-image-${Date.now()}.jpg`; // Set the filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  const generateImage = async () => {
    if (form.prompt) {
      if (user.credits < 1) {
        alert(
          "You don't have enough credits to generate an image. Please ask the admin to add more credits."
        );
        return;
      }

      try {
        setGenerateImg(true);
        const response = await fetch("http://localhost:8080/api/v1/model", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });

        const deductCreditsResponse = await fetch(
          `http://localhost:8080/api/v1/users/${user._id}/credits`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (deductCreditsResponse.ok) {
          const credits = user.credits;
          setUser({ ...user, credits: credits - 1 });
        } else {
          console.error("Failed to deduct credits");
        }
      } catch (error) {
        alert(error);
      } finally {
        setGenerateImg(false);
      }
    } else {
      alert("Please Provide a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center p-4 bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e]">
      {/* Left Section - Image Preview */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <div className="relative w-full h-full bg-[#1e1e2e] border border-[#3b3b4a] rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-opacity-50 flex items-center justify-center transform hover:rotate-3 transition-transform duration-500">
          {form.photo ? (
            <>
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-lg"
              />
              {/* Download Button */}
              <button
                type="button"
                onClick={downloadImage}
                className="absolute bottom-4 right-4 bg-[#1e1e2e] p-2 rounded-full hover:bg-[#3b3b4a] transition-colors"
              >
                <img
                  src={download}
                  alt="download"
                  className="w-6 h-6 object-contain invert"
                />
              </button>
            </>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-contain opacity-40 rounded-lg"
            />
          )}

          {generateImg && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
              <Loader />
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4 animate-text">
            Create Your Image
          </h1>
          <p className="text-[#a8a8b3] text-sm mb-8">
            Easily generate stunning images with our AI. Describe what you
            envision, and let our powerful model bring your ideas to life. Share
            your creations with the community!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Field */}
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
              className="bg-[#1e1e2e] border border-[#3b3b4a] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Prompt Field */}
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A door leading to another dimension, surrealism."
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              className="bg-[#1e1e2e] border border-[#3b3b4a] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={generateImage}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-purple-500/50"
                disabled={generateImg}
              >
                {generateImg ? "Generating..." : "Generate"}
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-teal-500/50"
                disabled={loading}
              >
                {loading ? "Sharing..." : "Share with the Community"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}