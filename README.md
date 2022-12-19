# exiting.fyi

Browse and post anonymous exiting guidance. If you are exiting your company and want to post professional guidance related to your exit anonymously, this is your app.

- Open [exiting.fyi](https://exiting.fyi/) to view, post, and modify exits.

## Editing exits

When posting a new exit, an edit token is generated that can be used to modify an already posted exit. You must make note of this edit token as it's generated on posting a new exit and never displayed again.

## Unpublishing exits

To unpublish a posted exit, you must use your edit token to save an empty exit (empty markdown editor). Your exit will not show up unless requested by its unique id, and since it won't have any content it will be empty in this case.

⚠️ If you have lost your edit token, you cannot unpublish your exit.

## Contributing

First, configure the app

```bash
yarn conf
```

Then, run the database

```bash
yarn db
```

Then, run the development server:

```bash
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
- Open [http://localhost:54323/projects](http://localhost:54323/projects) with your browser to inspect the database.
