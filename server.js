const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});



// create a route for fetch post data from wordpress multi site with 4 route with category, tag, author and post


// app.get('/fetch-post/:site', (req, res) => {



//     const slug = 'hot-news'

//     const query = `
//     query {
//         posts  {
//             nodes {
//                 title
//                 slug
//                 date
//                 featuredImage {
//                     node {
//                         sourceUrl
//                         altText
//                     }
//                 }
//             }
//         }
//     }
//     `;
//     const site = req.params.site;
//     const id = req.params.id;


//     const url = `https://${site}/ruts/graphql`;
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query })
//     })
//         .then(response => response.json())
//         .then(data => res.send(data))
//         .catch(err => res.send
//             (err)
//         );

// });

app.get('/fetch-post/:site', (req, res) => {

    // Assuming you get slugs as an array in req.query.slugs
    const slugs = req.query.slugs || [];

    // Constructing the slugs filter
    const catFilter = slugs.length > 0 ? `where: { categoryName : ${JSON.stringify(slugs)} }` : '';
    // posts(${catFilter}) {
    // posts(where: { categoryName: "awards-and-achievements" })
    const query = `
    query {
        posts(${catFilter}) 
        {
          nodes {
            id
            title
            date
            link
            guid
            categories {
              nodes {
                id
                name
                link
              }
            }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    `;
    const site = req.params.site;

    const url = `https://${site}/ruts/graphql`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
    })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(err => res.send(err));

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




