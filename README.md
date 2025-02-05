# Flight Search and Ticket Booking App

This is a flight search and ticket booking web application where users can view flight details, sort flights by price, and add tickets to their cart. The app is built using **React**, **Redux**, **TypeScript**, **Axios**, and **Material UI**.

## Features:
- **FlightsPage**: Displays a list of available flights with basic details.
- **FlightDetailsPage**: Shows detailed information about a specific flight along with seat availability (randomly generated). Users can select an available seat and add it to their cart.
- **Cart**: Allows users to view selected tickets, check the total price, and the number of tickets in the cart.

## Live Demo:
The app is deployed on [Vercel](https://tickets-app-react.vercel.app/). You can visit the live demo to explore the application.

## Setup and Installation:

### 1. Clone the repository from GitHub:
Open your terminal and run the following command:
```bash
git clone https://github.com/your-username/flight-search-ticket-booking.git

### 2. Navigate to the project folder:
```bash
cd flight-search-ticket-booking

### 3. Install all dependencies:
Run the following command to install the required dependencies:
```bash
npm install

### 4. Start the development server:
Once the dependencies are installed, you can run the application locally using the following command:
```bash
npm start

This will start the app in development mode and open it in your browser at http://localhost:3000.


## Dependencies:
The following libraries are used in the project:

- react-icons: A library for including icons in React components.
```bash
npm install react-icons --save

- Material UI: A popular React UI framework for designing user interfaces.
```bash
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

- Redux Toolkit: A set of tools for efficient Redux state management.
```bash
npm install @reduxjs/toolkit react-redux

- React Router: A library for handling navigation in React applications.
```bash
npm i react-router

- Axios: A library for making HTTP requests.
```bash
npm install axios


## Project Structure:
**FlightsPage**: A page that displays flight information in card format and allows sorting flights by price.
**FlightDetailsPage**: A page that shows detailed flight information and a seat map with randomly generated available and occupied seats. Users can add an available seat to the cart.
**Cart**: A page that allows users to see the tickets added to the cart, along with the total price and quantity.

## How it Works:
- FlightsPage allows users to view flight details. Clicking on a flight card takes users to the FlightDetailsPage where they can select available seats and add them to the Cart.
- In the FlightDetailsPage, available and occupied seats are randomly generated, and users can click on available seats to add them to their cart.
- On the Cart page, users can see the total number of tickets and the total cost of their selected tickets.