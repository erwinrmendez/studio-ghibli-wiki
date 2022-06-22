import type { CommentEntry } from "./comments";
import { getComments } from "./comments";

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
  comments?: CommentEntry[];
};

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

let apiURL = "https://ghibliapi.herokuapp.com";

export async function getFilms(title?: string | null) {
  const response = await fetch(`${apiURL}/films`);
  const films: Film[] = await response.json();

  // return filtered array
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : film
  );
}

export async function getFilmById(id: string) {
  const response = await fetch(`${apiURL}/films/${id}`);
  const film: Film = await response.json();

  // get comments
  const comments = await getComments(film.id);

  // get characters
  const characters = await Promise.all(
    film.people
      .filter((url) => url !== `${apiURL}/people/`)
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters, comments };
}

export async function getFilmCharacter(
  characterId: string
): Promise<FilmCharacter> {
  const response = await fetch(`${apiURL}/people/${characterId}`);

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
