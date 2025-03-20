import React, { useState } from "react";

const images = [
  { id: 1, src: "https://source.unsplash.com/random/300x400", category: "Nature" },
  { id: 2, src: "https://source.unsplash.com/random/300x500", category: "Architecture" },
  { id: 3, src: "https://source.unsplash.com/random/300x450", category: "People" },
  { id: 4, src: "https://source.unsplash.com/random/300x300", category: "Food" },
  { id: 5, src: "https://source.unsplash.com/random/300x550", category: "Nature" },
  { id: 6, src: "https://source.unsplash.com/random/300x480", category: "Architecture" },
  { id: 7, src: "https://source.unsplash.com/random/300x460", category: "People" },
  { id: 8, src: "https://source.unsplash.com/random/300x420", category: "Food" },
];

const categories = ["All", "Nature", "Architecture", "People", "Food"];

const PinterestGallery = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredImages = images.filter(
    (img) =>
      (category === "All" || img.category === category) &&
      img.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full sm:w-48"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setCategory("All")}>
          Reset
        </button>
      </div>

      {/* Image Gallery */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filteredImages.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt="gallery"
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

export default PinterestGallery;