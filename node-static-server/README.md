# Static File Server

A simple Node.js HTTP server that serves static files from the `public` directory.

## Features

- Serves HTML, CSS, JavaScript, and JSON files
- Automatic `index.html` routing for root path
- Proper Content-Type headers for different file types
- 404 error handling for missing files

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
node src/server.js
```

The server will run on `http://localhost:3000`

## Folder Structure

```
node-static-server/
├── src/
│   └── server.js       # Main server file
├── public/             # Static files directory
│   ├── index.html      # Home page
│   ├── about.html      # About page
│   ├── contact.html    # Contact page
│   ├── app.css         # Stylesheet
│   └── data.json       # Sample JSON data
└── package.json        # Project configuration
```

## Accessing Pages

- Home: http://localhost:3000/
- About: http://localhost:3000/about.html
- Contact: http://localhost:3000/contact.html
- Data: http://localhost:3000/data.json

## Stop Server

Press `Ctrl+C` in the terminal to stop the server.
