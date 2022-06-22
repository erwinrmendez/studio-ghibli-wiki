import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { FilmCharacter } from "~/api/films";
import { getFilmCharacter } from "~/api/films";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, "expected params.characterId");

  return getFilmCharacter(params.characterId);
};

export default function Character() {
  const character = useLoaderData<FilmCharacter>();

  return (
    <div className="mb-3">
      <h3 className="mb-3 text-2xl">Details</h3>
      <div className="p-4 border rounded shadow-lg">
        <h4 className="mb-2 text-xl font-bold text-gray-700">
          {character.name}
        </h4>
        <ul className="py-2">
          <li> Gender: {character.gender}</li>
          <li> Age: {character.age}</li>
          <li> Eye Color: {character.eye_color}</li>
          <li> Hair Color: {character.hair_color}</li>
        </ul>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="mb-3">
        <div className="p-4 bg-orange-200 border border-orange-600 rounded shadow-lg">
          <h4 className="mb-2 text-xl font-bold text-gray-700">
            {caught.statusText}
          </h4>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error("Unknown error");
}

export function ErrorBoundary({ error }: any) {
  return (
    <div className="mb-3">
      <div className="p-4 border rounded shadow-lg bg-rose-200 border-rose-600">
        <h4 className="mb-2 text-xl font-bold text-gray-700">
          Uh oh... something went wrong!
        </h4>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}
