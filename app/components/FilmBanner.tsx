import { Link } from "@remix-run/react";
import type { Film } from "~/api/films";

type FilmBannerProps = {
  film: Film;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <section>
      <div className="relative w-full overflow-hidden h-96">
        <div className="absolute flex flex-col items-start justify-between w-full h-full bg-slate-700/20">
          <Link to="/" className="p-5 text-lg text-white hover:underline">
            ← Go Back
          </Link>
          <h1
            className="w-full p-5 text-5xl font-bold text-white"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
          >
            {film.title}
          </h1>
        </div>
        <img
          src={film.movie_banner}
          alt={film.title}
          className="w-full h-auto -mt-[100px]"
        />
      </div>
    </section>
  );
}
