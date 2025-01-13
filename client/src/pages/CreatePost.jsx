import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

export default function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
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
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form })
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
    <section className="max-w-7xl mx-auto bg-[#1e1e2e] text-white p-8 rounded-lg shadow-xl">
      <div>
        <h1 className="text-3xl font-bold text-[#c4c4ff] mb-4">Create Your Image</h1>
        <p className="text-[#a8a8b3] mb-6">
          Easily generate stunning images with our AI. Describe what you envision,
          and let our powerful model bring your ideas to life. Share your creations with the community!
        </p>
      </div>

      <form className="max-w-xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A door leading to another dimension, surrealism."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-[#2d2d3a] border border-[#3b3b4a] rounded-lg p-4">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-64 object-contain rounded-lg shadow-md" 
              />
            ) : (
              <img
                src={preview} 
                alt="preview"
                className="w-full h-64 object-contain opacity-40 rounded-lg" 
              />
            )}

            {generateImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-6 justify-start">
          <button
            type="button"
            onClick={generateImage}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200"
          >
            {generateImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-8">
          <p className="text-[#a8a8b3] mb-4">Proud of your creation? Share it with the community!</p>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
}
