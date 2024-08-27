# Commercia

This is a fullstack next app built from the T3 template to demonstrate mastery of Next, React, Tailwind, basic
authentication, Stripe integration, and more.
The UI is fully responsive and adjusts to any screen size. This project's UI was heavily inspired by smaller shops such
as Fangamer and Etsy.

## Getting Started

After running your usual `npm install`, you should run `npm run db:generate` then `npm run db:push`, followed
by `npm run db:seed` to set up the database and seed it with sample data. After that, `npm run dev` and start browsing.
A lot of the categories are empty and the product selection is highly limited as the focus of the project was on the
code and feature set, and not the amount of fake data.

A very limited scope was taken on in order to focus on more important features and avoid getting caught in the weeds
of "nice to have" features.
To that end user accounts are only for those selling products. This demo comes with four accounts as part of the seeded
data, with each account selling four products.

The account names are 'Venral', 'Telun', 'Krie', and 'Memer'. These accounts all use the same password: `ILikeSellingThings`.
The email addresses needed for sign in all of the form `venral@example.com`.
If you do not wish to setup full stripe integration, there is an existing example order for the account Venral.

When testing checkout use any Stripe test card data, such as:

Card Number: 4242 4242 4242 4242
CVC: 123
Expiration Date (any future date): 12/34