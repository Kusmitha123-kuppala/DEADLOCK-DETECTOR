# 🚦 Automated Deadlock Detection Tool

A full-stack web application designed to visualize and detect deadlock conditions in Operating Systems using Resource Allocation Graphs (RAG).

## 🌟 Features

- **Interactive Matrix Input**: Dynamically specify the number of processes and resources. Generate real-time input tables to manually define your system state.
- **D3.js Visualization**: Draggable, interactive directed graphs that represent the relationship between processes and resources.
- **Visual Cycle Highlighting**: Automatically detects "Circular Wait" conditions and highlights the deadlocked nodes and edges in **Glowing Red**.
- **Python Backend**: Uses `NetworkX` for efficient graph analysis and cycle detection.

## 🛠️ Technology Stack

- **Backend**: Python, Flask, Flask-CORS, NetworkX
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+), D3.js (v7)

## 🚀 Getting Started

### Prerequisites

Ensure you have Python installed on your Windows machine.

### Installation

1. Clone or download this repository.
2. Open your terminal in the project directory.
3. Install the required dependencies:
   ```bash
   python -m pip install flask flask-cors networkx
   ```

### Running the Application

1. Start the Flask server:
   ```bash
   python backend/app.py
   ```
2. Open your web browser and navigate to:
   `http://127.0.0.1:5000`

## 📖 How to Use

1. **Setup**: Enter the number of **Processes** and **Resources** in the setup section.
2. **Generate**: Click **⚙️ Generate Matrices** to create the input grids.
3. **Input Data**: 
   - Fill the **Allocation Matrix**: `1` if a process holds a resource, `0` otherwise.
   - Fill the **Request Matrix**: `1` if a process is waiting for a resource, `0` otherwise.
4. **Analyze**: Click **▶ Run Deadlock Detection**.
5. **Review**: Check the status bar and the visual graph. If a deadlock is found, the specific cycle will be highlighted in red.

##  License

This project is open-source and available for educational purposes.

👨‍💻 Author

Kusumitha Kuppala
