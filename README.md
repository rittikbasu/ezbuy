# EzBuy | A Premium Electronics Shopping Experience

EzBuy is an e-commerce application built with Next.js. Developed as part of a coding assignment for [profile.fyi](https://profile.fyi), this project features a clean and minimal product listing page, an intuitive cart system with native app like animations and interactions, allowing users to browse electronics, add them to cart and manage their selections.

![EzBuy Landing Page](https://ik.imagekit.io/zwcfsadeijm/250_3x_shots_so_4ubHT6mLM.png)

## Features

### Product Listing Page

- **Responsive Grid Layout**: Products are displayed in a responsive grid that maximizes screen real estate, packing in a lot of products while maintaining a clean, attractive design.
- **Product Pricing**: Each product card clearly shows both the original and discounted prices side by side, with sale items marked by a prominent red sticker, making it easy to spot savings.
- **Detailed Product View**: Clicking on a product provides a detailed view, including a full description to help users make informed decisions.
- **Cart Counter**: As products are added to the cart, a counter on the cart icon updates in real time, showing the total number of items in the cart.

### Cart Page

- **Item Details**: Each cart item is displayed with its image, name, price, and quantity for clear identification.
- **Quantity Control**: Modify item quantities with intuitive controls, including safeguards to prevent invalid quantities.
- **Remove Items**: Effortlessly remove products from the cart with a single click.
- **Coupon Codes**: Apply coupon codes directly within the cart to unlock additional savings.
- **Cart Summary**: Get a dynamic cart summary that updates in real time as you apply coupon codes or change item quantities, reflecting changes in subtotal, discounts, additional fees, and the final total.
- **Checkout**: Experience a simulated checkout process, complete with address and payment card selection for a realistic shopping experience.

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Data Source**: [FakeStoreAPI](https://fakestoreapi.in/), an open source api for dummy product data
- **Analytics**: Vercel Analytics

## Potential Upgrades

These are a few features I think could really enhance the user experience

- [x] **Persisting Cart Data**: Use local storage to keep cart items saved across sessions, ensuring users don't lose their selections.
- [ ] **Search and Filters**: Introduce full text search and filters to make finding and sorting products easier and more efficient.
- [ ] **Semantic Search**: Implement semantic search to display relevant products even when user queries don't exactly match product names.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/rittikbasu/ezbuy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ezbuy
   ```
3. Install dependencies:
   ```bash
    npm install
   ```
4. Fire up the development server and open http://localhost:3000:
   ```bash
    npm run dev
   ```
