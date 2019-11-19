### Stack

This is a simple NodeJs project, using GraphQL, express, and mongoDB.

### how to run

1. Install mongoDB you can refer this link: https://treehouse.github.io/installation-guides/mac/mongo-mac.html

## Tips on mongo installation:

use: sudo mkdir -p /data/db ---- sometimes the permisions wont allow you to create the db folder.

## Cleaning Database

in case you need to start the process from scratch you can run the following command in terminal:
mongo T_videoMaker --eval "db.courses.drop()"

2. Clone or download the files of the project,
   in terminal navigate to the root folder and run npm start, then navigate to http://localhost:3002/course the graphQL interface should be shown.

3. Api is runing, now you can start video-maker-front project.
