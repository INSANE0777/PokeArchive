PokeArchive – A Next.js Pokédex
PokeArchive is a modern, responsive Pokédex application built with Next.js, TypeScript, and Tailwind CSS. It leverages the PokéAPI to display detailed Pokémon data including stats, abilities, types, and evolution chains. Smooth animations powered by Framer Motion and interactive UI elements bring your favorite Pokémon to life!

Features
Browse Over 1000 Pokémon: Explore a comprehensive list of Pokémon with their images and types.
Detailed Pokémon Pages: View detailed information for each Pokémon including height, weight, stats, abilities, and flavor text.
Shiny Toggle: Switch between the default and shiny sprites to see your Pokémon in a new light.
Evolution Chains: Visualize evolution paths with interactive components.
Responsive Design: Enjoy a seamless experience on desktop and mobile devices.
Smooth Animations: Engaging animations using Framer Motion enhance the user experience.
Demo
View the live demo here
(Replace the link with your deployed site URL)

Technologies Used
Next.js: Framework for building server-rendered React applications.
React: JavaScript library for building user interfaces.
TypeScript: Typed superset of JavaScript for improved code quality and developer experience.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Framer Motion: Library for creating smooth animations.
Lucide Icons: Beautiful, customizable icons for your UI.
PokéAPI: Public API providing Pokémon data.
Installation
Prerequisites
Node.js (version 14 or later)
npm or Yarn
Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/INSANE0777/PokeArchive.git
cd PokeArchive
Install dependencies:

Using npm:

bash
Copy
Edit
npm install
Or using Yarn:

bash
Copy
Edit
yarn install
Configure Environment Variables (if needed):

Create a .env.local file at the root of your project to store any necessary environment variables. For example:

env
Copy
Edit
NEXT_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
Run the Development Server:

Using npm:

bash
Copy
Edit
npm run dev
Or using Yarn:

bash
Copy
Edit
yarn dev
Open http://localhost:3000 to view the application in your browser.

Build for Production:

Using npm:

bash
Copy
Edit
npm run build
npm run start
Or using Yarn:

bash
Copy
Edit
yarn build
yarn start
Project Structure
bash
Copy
Edit
PokeArchive/
├── app/                  # Next.js App Router pages & layouts
│   ├── pokemon/
│   │   └── [id]/page.tsx # Pokémon detail page
│   └── ...               # Other pages and components
├── components/           # Reusable React components (e.g., PokemonCard, PokemonDetail)
├── lib/                  # API functions for fetching Pokémon data
├── types/                # TypeScript definitions for Pokémon data
├── public/               # Static assets (images, icons, etc.)
├── styles/               # Global CSS or Tailwind configuration
└── package.json          # Project configuration and scripts
Contributing
Contributions are welcome! If you'd like to contribute to PokeArchive, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them with descriptive messages.
Open a pull request describing your changes.
Please follow the existing code style and include tests if applicable.

License
This project is licensed under the MIT License.

Acknowledgments
Thanks to the PokéAPI team for providing a fantastic API.
Inspired by various Pokédex apps and the Pokémon community.
Special thanks to the contributors of Next.js, Tailwind CSS, and Framer Motion for making modern web development a joy!