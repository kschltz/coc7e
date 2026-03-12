/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { CreationWizardPage } from "./pages/CreationWizardPage";
import { SheetPage } from "./pages/SheetPage";
import { DicePage } from "./pages/DicePage";
import "./i18n";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/criar" element={<CreationWizardPage />} />
          <Route path="/ficha" element={<SheetPage />} />
          <Route path="/dados" element={<DicePage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
