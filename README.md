# Care Scheduling App

## Short Description

This is a MERN stack app where users can create, read, update and delete care schedules.

## Run Instructions

Below are run instructions for this app

## With Docker

Clone the project repository

Build the docker images for both the client and server:

```bash
cd client && sudo docker build -t care-scheduling-dashboard-client .
cd ../server && sudo docker build -t care-scheduling-dashboard-server .
```

Start the docker containers:

```bash
sudo docker compose up
```

Access the application in your browser by visiting http://localhost:5173.

## Without Docker

Clone the project repository

Install the required npm packages for both the client and server:

```bash
cd client && npm install
cd ../server && npm install
```

Start the server:

```bash
cd server && npm run dev
```

Start the client:

```bash
cd ../client && npm run dev
```

Access the application in your browser by visiting http://localhost:5173.