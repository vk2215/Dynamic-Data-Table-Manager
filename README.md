# 📊 Dynamic Data Table Manager (Next.js, Redux, MUI)

A comprehensive frontend interview task solution for building a dynamic, feature-rich data table manager. This project utilizes **Next.js 14 (App Router)** for server-side rendering and routing, **Redux Toolkit** for complex state management, and **Material UI (MUI)** for a polished, responsive user interface.

## 🎯 Objective

The primary goal of this project is to demonstrate proficiency in building dynamic user interfaces, managing application state with Redux, and implementing real-world data table functionalities such as dynamic column management, sorting, global searching, pagination, and data import/export.

## 🖼️ Project Screenshots

A quick visual tour of the key features implemented in the application.
![](/ss.png)

## ✨ Features

### Core Functionalities
* **Table View:** Displays user data with default columns: **Name, Email, Age, Role**.
* **Sorting:** ASC/DESC toggle sorting on all column headers.
* **Global Search:** Client-side searching across all displayed fields.
* **Pagination:** Client-side pagination, displaying 10 rows per page.
* **Dynamic Columns (Manage Columns Modal):**
    * Add new custom fields (e.g., Department, Location) to the schema.
    * Toggle column visibility (show/hide) using checkboxes.
    * Instantly reflects changes in the main table.
    * **Persistence:** Column visibility preferences are persisted using **Redux Persist** or **localStorage**.
* **Import & Export:**
    * **CSV Import:** Upload and parse CSV files using **PapaParse**. Includes basic error handling for invalid data format.
    * **CSV Export:** Exports the **current table view** to a `.csv` file using **FileSaver.js/Blob**, only including the currently **visible columns**.

### Bonus Features (Implemented)
* **✏️ Inline Row Editing:**
    * Double-click on a row to enter edit mode.
    * Input validation (e.g., **Age** must be a number).
    * "Save All" and "Cancel All" buttons for bulk changes.
* **🗑️ Row Actions:** Dedicated "Edit" and "Delete" actions per row, with a confirmation modal for deletion.
* **🌙 Theme Toggle:** Light/Dark mode switching implemented using MUI theming.
* **📱 Fully Responsive Design:** Optimized for various screen sizes using MUI's Grid and responsive utilities.

## 💻 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14** (App Router) | React framework for routing and server components. |
| **State Mgmt** | **Redux Toolkit** & **Redux Persist** | Efficient global state management and state persistence. |
| **UI Library** | **Material UI (v5+)** | Component library for consistent, accessible design. |
| **Language** | **TypeScript** | Static typing for improved code quality and robustness. |
| **Forms** | **React Hook Form** | Performant, flexible form state management. |
| **CSV Handling** | **PapaParse** | Robust client-side CSV parsing. |
| **File Export** | **FileSaver.js** / **Blob** | Client-side file generation and downloading. |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have **Node.js** and **npm** (or **yarn** / **pnpm**) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd dynamic-data-table-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


