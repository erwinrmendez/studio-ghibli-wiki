import { Form, useActionData, useTransition } from "@remix-run/react";
import type { CommentEntry } from "~/api/comments";

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const transition = useTransition();
  const actionData = useActionData();

  const inputStyle = (fieldName: string) =>
    `border rounded py-2 px-3 inline-block w-full ${
      actionData?.errors[fieldName] ? " border-red-500" : "border-slate-400"
    }`;

  return (
    <section>
      <h3 className="mb-2 text-2xl">Community Comments</h3>
      <div className="flex flex-col my-3 space-y-4">
        <div className="p-4 border rounded border-x-slate-400">
          <Form method="post">
            <fieldset disabled={transition.state === "submitting"}>
              <label htmlFor="name" className="inline-block my-2">
                Name:
              </label>
              <input type="text" name="name" className={inputStyle("name")} />
              {actionData?.errors.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
              )}

              <label htmlFor="message" className="inline-block my-2">
                Message:
              </label>
              <textarea name="message" className={inputStyle("message")} />
              {actionData?.errors.message && (
                <p className="text-red-500">{actionData.errors.message}</p>
              )}

              <button
                type="submit"
                className="px-4 py-2 my-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                {transition.state === "submitting"
                  ? "Adding..."
                  : "Add comment"}
              </button>
            </fieldset>
          </Form>
        </div>

        {comments.length == 0 ? (
          <p>Be the first to comment.</p>
        ) : (
          comments.map((comment, index) => (
            <div className="p-4 border rounded border-x-slate-400" key={index}>
              <h3 className="mb-2 text-xl font-bold text-gray-700">
                {comment.name}
              </h3>
              <p className="text-gray-700">{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
