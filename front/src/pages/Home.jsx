import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(/image.png)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold text-primary-content">
              Explore, create, experiment, and achieve.
            </h1>
            <p className="mb-5 text-lg">
              The most exciting part of Pinspire is uncovering fresh ideas and
              inspirations from creators worldwide.
            </p>
            <Link to={"/explore"} className="btn btn-primary btn-wide">
              Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-screen flex items-center px-10">
        <div className="hero-content flex flex-col lg:flex-row gap-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-lg w-full rounded-lg shadow-2xl"
          />
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold">Discover, Save, and Create!</h1>
            <p className="py-6 text-lg">
              Welcome to <span className="font-bold">Pinspire</span> — your
              ultimate hub for creativity! Explore a world of ideas, from DIY
              projects to travel inspiration. Save what you love, organize it
              effortlessly, and bring your ideas to life.
            </p>
            <button className="btn btn-primary btn-lg">Get Started</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Why Choose Pinspire?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h3 className="text-xl font-bold">Endless Inspiration</h3>
              <p>Discover unique ideas and trends curated just for you.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h3 className="text-xl font-bold">Save & Organize</h3>
              <p>Keep your favorite ideas neatly organized for easy access.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h3 className="text-xl font-bold">Create & Share</h3>
              <p>Showcase your own creativity and inspire others.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero bg-primary text-primary-content py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Join Pinspire Today!</h2>
          <p className="mb-6 text-lg">
            Start your journey of creativity and inspiration now. Sign up and
            explore a world of ideas.
          </p>
          <button className="btn btn-secondary btn-wide">Sign Up Now</button>
        </div>
      </div>
    </>
  );
};

export default Home;
