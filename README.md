# GMALL

GMALL is an e-commerce web application built with Node.js, Express.js, Vue.js, and Element UI. It allows users to browse and purchase a wide selection of products online, with features such as user authentication, product listings, shopping cart, and checkout.

## Features

- User authentication and authorization
- Product listings with filtering and sorting options
- Shopping cart with item quantity management and order total calculation
- Checkout process with personal and payment information entry
- Order history and details view
- Admin page for managing products and orders

## Installation

To install and run GMALL locally, follow these steps:

1. Clone the repository:
Install the dependencies:


cd gmall
npm install
cd web-client
npm install
Set up the database:

Create a MySQL database using the web-shop.sql script provided in the web-server folder.
Update the config/database.js file with your database configuration.
Start the server:


cd web-server
npm run dev
Start the client:


cd ../web-client
npm run dev
Open the application in your browser at http://localhost:8080.

Folder Structure
The GMALL project is organized into two main folders: web-client for the client-side code and web-server for the server-side code. Here's an overview of the contents of each folder:

web-client
app: The main file for the Vue.js application.
build: The configuration files for the build process.
config: The configuration files for the project.
node_modules: The third-party dependencies for the project.
src: The source code for the Vue.js application.
web-server
db: The database schema and sample data.
node_modules: The third-party dependencies for the project.
public: The static assets for the project.
routes: The route handlers for the project.
src: The source code for the project.
util: The utility functions for the project.
views: The view templates for the project.
