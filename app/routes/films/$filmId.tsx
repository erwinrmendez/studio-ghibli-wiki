import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { addComment } from "~/api/comments";
import type { Film } from "~/api/films";
import { getFilmById } from "~/api/films";
import CharacterList from "~/components/CharacterList";
import CommentsList from "~/components/CommentsList";
import FilmBanner from "~/components/FilmBanner";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title + " | Studio Ghibli",
    description: data.description,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  // assertion
  invariant(params.filmId, "expected params.filmId");

  const film = await getFilmById(params.filmId);
  return film;
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.filmId, "expected params.filmId");
  const body = await request.formData();

  const comment = {
    name: body.get("name") as string,
    message: body.get("message") as string,
    filmId: params.filmId,
  };

  const errors = { name: "", message: "" };

  if (!comment.name) {
    errors.name = "Please provide your name";
  }

  if (!comment.message) {
    errors.message = "Please provide a comment";
  }

  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    return { errors, values };
  }

  await addComment(comment);
  return redirect(`/films/${params.filmId}`);
};

export default function FilmPage() {
  const film = useLoaderData<Film>();

  return (
    <>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>
        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />
          <div className="flex flex-col justify-between flex-1">
            <Outlet />
            <CommentsList filmId={film.id} comments={film.comments || []} />
          </div>
        </div>
      </div>
    </>
  );
}
