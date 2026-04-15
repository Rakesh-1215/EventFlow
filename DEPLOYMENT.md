# EventFlow Deployment Guide

## Recommended setup

- Host the backend on Render or Railway.
- Host the frontend on Vercel or Netlify.
- Use MongoDB Atlas for the database.

## 1. Backend environment variables

Set these in your backend hosting dashboard:

- `MONGO_URL`: your MongoDB Atlas connection string.
- `JWT_SECRET`: any long random secret value.
- `CLIENT_URLS`: your frontend URLs separated by commas when you have more than one.

Example:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/eventflow?retryWrites=true&w=majority
JWT_SECRET=super-secret-key-change-this
CLIENT_URLS=https://your-frontend.vercel.app,http://localhost:5173
```

## 2. Backend deploy settings

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

After deployment, copy the backend public URL. Example:

`https://eventflow-api.onrender.com`

## 3. Frontend environment variables

Set this in your frontend hosting dashboard:

```env
VITE_API_URL=https://eventflow-api.onrender.com
```

## 4. Frontend deploy settings

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

## 5. Atlas checks before deploy

- In MongoDB Atlas, open `Network Access` and allow your hosting provider or temporarily allow `0.0.0.0/0`.
- In `Database Access`, make sure the database user in `MONGO_URL` has the correct password and read/write access.
- Use the database name you want in the Atlas URL, for example `eventflow`.

## 6. Final connection flow

1. Deploy backend with `MONGO_URL`, `JWT_SECRET`, and `CLIENT_URLS`.
2. Copy the live backend URL.
3. Deploy frontend with `VITE_API_URL` set to that backend URL.
4. Add the live frontend URL back into `CLIENT_URLS` on the backend if needed.
5. Test signup, login, create event, and ticket booking on the live site.

## Common issue

If the frontend opens but API calls fail, the usual reasons are:

- `VITE_API_URL` still points to localhost.
- Backend `CLIENT_URLS` does not include the frontend domain.
- Atlas network access is blocking the host.
- The Atlas username or password in `MONGO_URL` is wrong.
