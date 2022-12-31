# Algo Visualizer
#### Video Demo:  [demo](https://www.youtube.com/watch?v=GgZ-NntpUIU)

#### Demo Link: https://algo-visualizer-seven.vercel.app/
#### Description:
Welcome to Algo Visualizer. This project allows you to see how different sorting and path finding algorithms work, in a visually intuitive way.

With the sorting visualizer, you can choose from a variety of algorithms such as bubble sort, quick sort and merge sort, and see how they compare in terms of speed and efficiency. Currently, customizing of size of list and range of values have not been implemented yet.

Next, the path finding visualizer, on the other hand, lets you visualize how algorithms such as Dijkstra's and Depth-first search works. Use Dijkstra's to ensure shortest path first while Depth-first search does not guarantee shortest path. You can also set walls on the grid to simulate obstacles.

This project is make for students who are still studying algorithms and want to find out how they work. Algo Visualizer is sure a fun and interactive way to learn, experience and explore.

TODO:
- More algorithms to be added (selection sort, A* algorithm)
- Add weight to the path finding algorithms
- Generate maze


Below are the following algorithms that have visualization implemented:
##### Path Finding
| Searching Algorithm | 
|-------------------  |
| Depth First Search  | 
| Dijkstras           | 

##### Sorting
| Sorting Algorithm | Time complexity |
|-------------------|-----------------|
| Bubble sort       | Θ(n^2)          |
| Quick sort        | Θ(n log(n))     |
| Merge sort        | Θ(n log(n))     |





## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
