# Mirage

A minimalist, visually stunning web UI to generate realistic fake data for development and testing.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/george-orbio/Mirage-Fake-Data-Generator)

Mirage is a visually stunning, minimalist web application designed for developers and testers to generate high-quality fake data on the fly. Built with a focus on simplicity and elegance, the application provides a seamless, single-page experience. The core functionality revolves around a clean control panel where users can select a data category, choose specific fields, and define the quantity of records to generate. The generated data is then displayed in a sophisticated output area with multiple formats—a clean, sortable Table, formatted JSON, and downloadable CSV—all accessible through a sleek tabbed interface.

## Key Features

-   **Dynamic Data Generation**: Select from various data categories and fields to generate custom datasets.
-   **Multiple Output Formats**: View and export data as a Table, JSON, or CSV.
-   **Clipboard Integration**: Easily copy generated data in any format to your clipboard.
-   **Minimalist & Elegant UI**: A clean, modern interface built with a focus on user experience and visual polish.
-   **Fully Client-Side**: All data generation happens in your browser, ensuring privacy and speed.
-   **Responsive Design**: Flawless experience across all device sizes, from mobile to desktop.
-   **Light & Dark Mode**: Beautifully crafted themes to match your preference.

## Technology Stack

-   **Framework**: React (with Vite)
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui, Radix UI
-   **State Management**: Zustand
-   **Data Generation**: Faker.js
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **CSV Parsing**: PapaParse
-   **Notifications**: Sonner

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/mirage-data-generator.git
    cd mirage-data-generator
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the development server, which will watch for file changes and update automatically:

```sh
bun dev
```

The application will be available at `http://localhost:3000`.

## Usage

1.  **Select a Category**: Choose a data category from the main dropdown (e.g., Person, Address, Company).
2.  **Choose Fields**: A list of checkboxes will appear. Select the specific data fields you want to generate.
3.  **Set Quantity**: Enter the number of records you wish to create.
4.  **Generate**: Click the "Generate" button.
5.  **View Results**: The generated data will appear in the results section. You can switch between Table, JSON, and CSV views using the tabs.
6.  **Copy Data**: Use the "Copy to Clipboard" button within each tab to copy the data in the desired format.

## Deployment

This project is optimized for deployment on the Cloudflare network.

To deploy your application, run the following command:

```sh
bun run deploy
```

This command will build the application and deploy it to Cloudflare Pages using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/george-orbio/Mirage-Fake-Data-Generator)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.