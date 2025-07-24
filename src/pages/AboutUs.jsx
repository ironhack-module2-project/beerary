import logo from "../assets/github-mark-white.png";

function AboutUs() {
  return (
    <div className="bg-base-100 text-base-content card-xl max-w-200 mx-auto rounded">
      <section class="hero bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 class="text-5xl font-bold">Who We Are</h1>
            <p class="py-6 max-w-150">
              At Beerary, we believe every person should have the tools to
              discover as many beers as possible. With that in mind, we have
              devoted our lives to bringing that to life. Beerary is the result
              of our passion for exploration, craftsmanship, and community.{" "}
              <br /> <br />
              Built by beer lovers for beer lovers, Beerary is more than just a
              catalog — it's a gateway to new tastes, stories, and experiences.
              Whether you're a casual drinker or a seasoned connoisseur, our
              mission is to help you find your next favorite brew, one sip at a
              time.
            </p>
          </div>
        </div>
      </section>

      <section class="p-10 bg-base-200">
        <h2 class="text-4xl font-bold text-center mb-10">Meet the Team</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto justify-center">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center flex flex-row justify-around items-center">
              <div>
                <h2 class="text-2xl">Juanvi Climent</h2>
                <p className="text-sm">Web Developer</p>
              </div>
              <a
                href="https://github.com/Sitripi0"
                className="inline-block"
                target="_blank"
              >
                <img
                  src={logo}
                  className="w-8 h-8 object-contain transition-transform duration-300 hover:scale-110"
                  alt="github logo"
                />
              </a>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center flex flex-row justify-around items-center">
              <div>
                <h2 class="text-2xl">Andres Londoño</h2>
                <p className="text-sm">Web Developer</p>
              </div>
              <a
                href="https://github.com/Navitat"
                className="inline-block"
                target="_blank"
              >
                <img
                  src={logo}
                  className="w-8 h-8 object-contain transition-transform duration-300 hover:scale-110"
                  alt="github logo"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
