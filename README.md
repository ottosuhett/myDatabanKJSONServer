# My DatabanK

Welcome to My DatabanK! This project allows you to track your financial transactions and visualize your spending progress. It was developed as a way to apply and practice data manipulation concepts using JSON Server and local storage.

## Technologies Used
- HTML
- CSS
- JavaScript

## Framework
- Bootstrap 5.3

## Library
- JSON Server

## Project Overview
The main goal of this project is to provide a simple and intuitive interface for managing your financial transactions. Here's a brief overview of the key features and functionalities:

- Registering Transactions: You can register your financial transactions by providing a title, description, and amount. In the first use, you will also need to enter your salary value, which will be stored using the local storage feature.
- Updating Salary: If your salary changes, you have the option to update it by clicking the "Clear Salary" button. This action will clear the current salary value, allowing you to enter a new one.
- Progress Circle: A dynamic progress circle is displayed to represent the percentage of your salary that has been spent based on your registered transactions. The circle will be displayed and animated only after entering the salary value.

## Installation
To install and run the project locally, please follow these steps:

1. Download the project from the GitHub repository.
2. Open the project folder in your preferred code editor.
3. Navigate to the project directory:

    ```cd repository```

4. Run the following command in the terminal to install the necessary dependencies: 

    ``` npm install```

5. Start the JSON Server by running the command: 

    ``` npm run json-server```

6. Use a Live Server extension or any local server setup to view and interact with the project.

## Application Functionality

Below are examples demonstrating the functionality of the application:

1. Transaction Registration

- Fill in all the required fields in the registration form.
Click on the "Submit" button.
The transaction will be recorded in the system, and the transaction table will update to display the new transaction.

<div style="width: 650px; height: 500px;">
  <img src="./src/images/transaction-register.gif" />
</div>

2. Transaction Deletion
- Locate the transaction you want to delete in the transaction table.
In the "Options" column of the corresponding transaction entry, click on the "Delete" button.
Confirm the deletion when prompted.
The transaction will be deleted from the system, and the transaction table will update to reflect the changes.

<div style="width: 650px; height: 500px;">
  <img src="./src/images/delete.gif" />
</div>

3. Transaction Editing
- Find the transaction you wish to edit in the transaction table.
In the "Options" column of the corresponding transaction entry, click on the "Edit" button.
- Modify the necessary fields in the edit form.
- Click on the "Edit" button to save the changes made to the transaction.

<div style="width: 650px; height: 500px;">
  <img src="./src/images/edit.gif" />
</div>

4. Prevention of Empty Fields
During transaction registration: The application validates the form fields and displays an error message if any required fields are left empty before the registration process.
During transaction editing: The application ensures that all required fields are filled before allowing the user to save the changes to a transaction. An error message will be shown if any required fields are left empty.

<div style="width: 650px; height: 500px;">
  <img src="./src/images/empty-input.gif" />
</div>

<div style="width: 650px; height: 500px;">
  <img src="./src/images/empty-edit-input.gif" />
</div>


Enjoy managing your financial transactions with My DatabanK!
