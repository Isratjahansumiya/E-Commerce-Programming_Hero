# E-Commerce App

App Url: https://shopping-aa8c8.web.app/

## Server

 https://github.com/Isratjahansumiya/e-commerce-server-deploy

## Features
- Show products from database
- Add Items to cart
- Remove Items
- Review orders
- Authenticate with gmail and google
- Can't proceed checkout without authentication
- Can fill shipment form
- Send orders info to database

## Installation and Usages

Clone the repository:

```
git clone url
```

Navigate inside the directory:

```
cd appDir
```

Install all the necessary dependecies:

```
npm install
```
Then run:

```
npm start
```
For production:

```
npm run build
```
### Deploy App to firebase

Create a new project on [firebase console](https://console.firebase.google.com/)

Install firebase CLI tools:

```
npm install -g firebase-tools
```
Firebase init on app root folder:
```
firebase init
```
Answer some questions and log in to firebase:
```
firebase login
```
Finally deploy app:
```
firebase deploy
```





