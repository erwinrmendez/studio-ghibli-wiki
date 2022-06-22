import { NavLink } from "@remix-run/react";
import type { FilmCharacter } from "~/api/films";

type CharacterListProps = {
  characters?: FilmCharacter[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  if (!characters || characters.length == 0) {
    return <></>;
  }

  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-2xl">Characters</h3>
      <ul className="flex flex-col my-3 space-y-3">
        {characters.map((character) => (
          <li key={character.id}>
            <NavLink
              to={"characters/" + character.id}
              prefetch="intent"
              className={({ isActive }) =>
                `inline-block w-full p-3 border rounded cursor-pointer hover:underline border-slate-400 ${
                  isActive
                    ? "bg-slate-300 text-black font-bold border-2"
                    : "text-blue-500"
                }`
              }
            >
              {character.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
