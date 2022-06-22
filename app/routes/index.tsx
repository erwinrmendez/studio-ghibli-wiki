import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import { getFilms } from "~/api/films";

export const meta: MetaFunction = () => {
  return { title: "Films | Studio Ghibli" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();

  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>
      <form className="flex py-10">
        <input
          type="text"
          name="title"
          placeholder="Enter a title..."
          className="flex-1 px-3 py-2 border-2 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-4 gap-8">
        {films.map((film) => (
          <Link
            to={"/films/" + film.id}
            key={film.id}
            title={film.title}
            prefetch="intent"
            className="overflow-hidden transition-all duration-200 ease-in-out rounded cursor-pointer hover:shadow-2xl hover:scale-105 hover:font-bold"
          >
            <img src={film.image} alt={film.title} />
            <h2 className="py-2 text-center">{film.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
