/*
 * Star Citizen - Executive Hangar, Based Project
 * Copyright (c) 2025 Feareis
 * SPDX-License-Identifier: MIT
 * Author: https://github.com/Feareis
 */

import React from "react";
import ReactDOM from "react-dom/client";

import './index.css';
import App from './App.tsx';
import ErrorBoundary from "@components/errors/ErrorBoundary";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Please ensure there is an element with id 'root' in your HTML."
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
