# Trainee Management System with a Neural Authentication Module for RTC Barisal

**The Trainee Management System** is a web-based application designed to efficiently maintain an trainee database and streamline various administrative tasks. This system provides a comprehensive set of features to manage trainee information, training notifications, and facilitate effective communication within the organization.

![Logo](https://github.com/masud70/RTCDSSBSL/blob/main/public/uploads/images/dss-logo.jpg?raw=true)

## Key Features

### Trainee Database Management

The system enables administrators to maintain a centralize trainee database. It allows for the addition, updating, and deletion of trainee records, making it easy to store and retrieve essential trainee information such as personal details, contact information, and job positions.

### Training Management and Notifications

The system includes functionality to manage trainee training programs. Administrators can add and update training information, including upcoming sessions and topics. The system also supports sending SMS notifications to trainees about upcoming training events, ensuring timely communication and participation.

### Trainee Data Printing

With the trainee data printing feature, administrators can generate printable reports or documents containing relevant trainee information. This functionality facilitates record-keeping and provides a tangible resource for various administrative tasks, such as performance evaluations or compliance audits.

### Real-time Office Updates and Communication

The system includes a dedicated timeline section where authorized users, such as administrators or managers, can post office updates, news, or announcements. Employees can view these updates in real-time and engage with the content by reacting and leaving comments, promoting transparent communication and fostering a sense of community within the organization.

## Installation and Setup

To run the Trainee Management System locally, follow these steps:

-   Clone the repository:

```
    git clone https://github.com/masud70/RTCDSSBSL.git
```

-   Database setup:
    This project is configured to work with **Xampp Server**. So to run the project, first install Xampp Server in your local machine if it is not installed yet. [Click](https://www.apachefriends.org/) here to download Xampp Server.

-   Install the necessary dependencies:

    Go the the project folder (RTCDSSBSL) and open a terminal on the project directiory. Then run the following commands sequencially-

    ```
        npm install

        cd client

        npm install
    ```

-   Start the application:
    Access the system by opening a web browser and navigating to `http://localhost:3000`.

## Project Features

    1. Application of `TensorFlow Lite` for real-time prediction. (Login by face matching in this case)
    2. Application of `GraphQL` (most of the api endpoint is created using GaphQL).
    3. Application `RESTful APIs / SOAP APIs`.
    4. Realtime commenting options through contacting my own database without refreshing or reloading the whole page as shown in Facebook.
    5. Like and dislike button and count feature as shown on Facebook.
    6. Realtime unique username verification through contacting my own database without refreshing or reloading the whole page.
    7. Email and phone number verification like the Gmail registration page.
    8. Multiple text box and multiple dropdown list manipulation.
    9. Interactive real-time rating options for site/app.
    10. Pagination.
    11. Playing audio/videos that are embedded on my site but obtained from external databases not my own. (Playing the YouTube video embedded on your site in this case).
    12. Google map with real-time location information or embed maps Iframe.
    13. Uses of Session information during the login/logout phase.
    14. Uploading images/files and showing them on my site/app.
    15. Uses of `Datepicker`.
    16. Embed animations using `GSAP`.
    17. Application of `SCSS`.
    18. Configure and work with modern workflow and collaboration tools `Git/Github`.
    19. Crystal report of my `Database`.
    20. ER Diagram drawn by `Online Visual Paradigm` tool that provide the scalable PDF.
    21. Application of `Sequelize` ORM.
    22. Application of `TailwindCSS`.
    23. Application of `Redux`.
    24. Application of `Express Validator`.
    25. Application of `NodeMailer` for sending Email.

## Tech Stack

**Client:** React/NextJs, Redux, TailwindCSS, SCSS, Apollo Client

**Server:** NodeJS, Express, GraphQL, Express Graphql, MySQL

## Screenshots

### ER Diagram of the project:

![App Screenshot](https://github.com/masud70/RTCDSSBSL/blob/main/public/uploads/images/erd.png?raw=true)

### App screenshots:

![App Screenshot](https://github.com/masud70/RTCDSSBSL/blob/main/public/uploads/images/screenshot-1.png?raw=true)
![App Screenshot](https://github.com/masud70/RTCDSSBSL/blob/main/public/uploads/images/screenshot-2.png?raw=true)
![App Screenshot](https://github.com/masud70/RTCDSSBSL/blob/main/public/uploads/images/screenshot-3.png?raw=true)

## Acknowledgments

I would like to express my sincere gratitude to the following individuals for their invaluable contributions and support throughout the development of this project:

-   Professor **_[Dr. Iqbal Ahmed](https://cu.ac.bd/public_profile/index.php?ein=4635)_**: I am grateful to Professor **Dr. Iqbal Ahmed** for conducting the Web Engineering course and providing the necessary knowledge and guidance that laid the foundation for this project.

-   Professor **_[Dr. Abu Nowshed Chy](https://cu.ac.bd/public_profile/index.php?ein=5905)_**: I would like to extend my appreciation to Professor **Dr. Abu Nowshed Chy** for his guidance and continuous support during the laboratory course associated with this project.

-   I would also like to acknowledge the following libraries that were instrumental in implementing various functionalities within this project:

    | Library           | Description                                                                                                              |
    | ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
    | Tensorflow-Js     | Library for implementing machine learning models and computations in JavaScript.                                         |
    | Apollo Client     | A fully-featured GraphQL client for making requests to a GraphQL server and managing local state.                        |
    | Sequelize         | An Object-Relational Mapping (ORM) library for Node.js that simplifies database interactions.                            |
    | Nodemailer        | A module for sending emails using Node.js, providing a simple and efficient solution for email sending tasks.            |
    | mui               | Material-UI is a popular React UI framework that provides pre-built components following the Material Design guidelines. |
    | axios             | A promise-based HTTP client for making API requests from the browser or Node.js.                                         |
    | cookies-next      | A library for working with cookies in Next.js applications.                                                              |
    | dayjs             | A lightweight JavaScript library for parsing, validating, manipulating, and formatting dates.                            |
    | face-api.js       | JavaScript API for face detection and recognition in the browser using TensorFlow.js.                                    |
    | graphql           | A query language and runtime for executing and defining APIs in a type-safe manner.                                      |
    | gsap              | GreenSock Animation Platform for creating high-performance, complex animations in JavaScript.                            |
    | moment            | A JavaScript date library for parsing, validating, manipulating, and formatting dates.                                   |
    | redux             | A predictable state container for managing the state of JavaScript applications.                                         |
    | socket.io         | A library that enables real-time, bidirectional communication between clients and servers.                               |
    | sweetalert        | A beautiful and customizable replacement for JavaScript's native alert and confirmation dialogs.                         |
    | scss              | A CSS preprocessor that extends the capabilities of CSS with variables, mixins, and more.                                |
    | tailwindcss       | A utility-first CSS framework for rapidly building custom user interfaces.                                               |
    | bcrypt            | A library for hashing passwords and comparing hashed passwords in Node.js.                                               |
    | body-parser       | Node.js middleware for parsing JSON, URL-encoded, and multipart/form-data request bodies.                                |
    | cookie-parser     | A middleware for parsing cookies in Express.js applications.                                                             |
    | cors              | A package that provides Cross-Origin Resource Sharing (CORS) support for Express.js applications.                        |
    | dotenv            | A module that loads environment variables from a .env file into process.env.                                             |
    | express           | A web application framework for Node.js that simplifies the development of server-side applications.                     |
    | express-graphql   | A package that integrates GraphQL with Express.js for creating GraphQL APIs.                                             |
    | express-validator | A set of express.js middleware for validating request data.                                                              |
    | jsonwebtoken      | A library for generating and verifying JSON Web Tokens (JWT) in Node.js.                                                 |
    | multer            | A middleware for handling multipart/form-data requests, primarily used for file uploads.                                 |
    | mysql2            | A MySQL driver for Node.js that provides fast and efficient access to MySQL databases.                                   |
    | path              | A module that provides utilities for working with file and directory paths in Node.js.                                   |
    | nodemon           | A utility for automatically restarting the Node.js application when file changes are detected.                           |

I express my sincere appreciation to the developers and contributors of these libraries for their hard work and dedication in creating and maintaining these valuable resources.

Without the support and contributions of these individuals and libraries, the successful completion of this project would not have been possible. Thank you all for your significant contributions.

## Author

-   [Md. Masud Mazumder](https://www.github.com/masud70)
