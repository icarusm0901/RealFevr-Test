import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Loading180Ring } from "assets/loading";
import { Layout } from "components/layout";
import { DAppProvider } from "@usedapp/core";
import "App.scss";
import 'react-calendar/dist/Calendar.css';
import { config } from "utils/constants";
import { GlobalProvider } from "contexts/GlobalContext";

const Calendar = lazy(() => import("components/pages/Calendar"));
const AddEmoji = lazy(() => import("components/pages/AddEmoji"));

function App() {
  return (
    <Router>
      <GlobalProvider>
        <DAppProvider config={config}>
          <Suspense
            fallback={
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading180Ring width={48} height={48} fill="white" />
              </div>
            }
          >
            <Layout>
              <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/add/:hash" element={<AddEmoji />} />
              </Routes>
            </Layout>
          </Suspense>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                position: "relative",
                top: "4rem",
                right: "1.5rem",
                margin: "5px 0",
                padding: ".7rem 1.5rem",
                color: "white",
                fontSize: "16px",
                borderRadius: "20px",
                border: "2px solid #10172a",
                boxShadow:
                  "0px 0px 0px 1.6px #1A2238, -4px -4px 8px rgba(255, 255, 255, 0.1), 4px 8px 8px rgba(1, 7, 19, 0.2)",
                background: "linear-gradient(135deg, #35405b 0%, #222c45 100%)",
              },
            }}
          />
        </DAppProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;
