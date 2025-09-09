Based on the format you provided, here's a revised `README.md` for your project. This version uses the same structure, headings, and code block styles as your example to maintain consistency.

---

# React + TypeScript + Vite

This project is a simple task list application built with **React** and **TypeScript** using **Vite** as the build tool. It provides a minimal setup for modern frontend development with a focus on a component-based architecture and a clean user interface.

## 🛠️ Technologies Used

- **Frontend**: React
- **Styling**: Styled-Components
- **Package Manager**: Yarn
- **Bundler**: Vite
- **Testing**: Jest, React Testing Library, Cypress

## 📦 Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Local Development

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/task-list-frontend.git
    cd task-list-frontend
    ```
2.  **Install dependencies:**
    ```sh
    yarn install
    ```
3.  **Run the development server:**
    ```sh
    yarn dev
    ```
    The application will be available at `http://localhost:5173`.

### Build for Production

To create a production-optimized build, run:

```sh
yarn build
```

The build files will be generated in the `dist/` directory.

---

## 🐳 Docker

This project can be run in a Docker container, providing a consistent and isolated environment.

### Dockerfile

The included `Dockerfile` uses a multi-stage build. The first stage uses a Node.js image to install dependencies and run the production build. The second stage uses a lightweight Nginx image and only copies the final, static build files, resulting in a minimal and production-ready image.

### How to Run with Docker

1.  **Build the Docker Image**

    Navigate to the project root and build the image.

    ```sh
    docker build -t task-list-frontend .
    ```

2.  **Run the Docker Container**

    Map a port on your local machine (e.g., 8080) to the container's port 80.

    ```sh
    docker run -p 8080:80 task-list-frontend
    ```

    The application will be available in your web browser at `http://localhost:8080`.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Specify your project's license here, e.g., MIT, Apache, etc.]
