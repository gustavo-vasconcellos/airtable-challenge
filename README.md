# Airtable Challenge

Hello reviewers! I hope you'd like my implementation and ideas! I didn't changed the starter bundler, so to run the project you can run with:

```
npm i
npm start
```

## Questions

- What you like about your implementation.
> I liked how I added the background divisors for weeks and months, also how I used `Math.max`/`Math.min` to assure safe values. I'm also added TailwindCSS to help me with styling since it's the thing that I used the most on my last development years.
- What you would change if you were going to do it again.
> I would change the project settings for something modern like Vite, Deno (Fresh) or Next.js. Those frameworks include TypeScript support, so I could have written code faster given my stronger proficiency with it. Regarding the code, I would have used Context from the start. Honestly, I thought the 4 hours might pass quickly, so I prioritized delivering a working solution over implementing all features (though I still didn't finish drag n' drop). I could used TDD too, but in that case I would finish only the main goal, I do not think that it could be possible to add other features in such time.
- How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
> I don't think I did my best styling job, I could added more transitions and effects. But I thought a lot in the Notion timeline, I used a lot Notion to manage projects so it was my first UI inspiration.
- How you would test this if you had more time.
> I would: Used something to handle the state management, such as `Redux` or `zustand`. Improved the Accessibility. Added an Undo/Redo feature. Added an vitualization logic (main to show more content before and after the Tasks). Added CRUD actions (and a Integration with Backend and DB). Created Unit and Integration tests (to run with Jest and RTL).