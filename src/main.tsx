import "./global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.tsx";
import {ThemeProvider} from "./shared/ThemeProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="my_dev_chat_theme">
            <App/>
            <Toaster/>
        </ThemeProvider>
    </React.StrictMode>
);
