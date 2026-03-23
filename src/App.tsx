import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SiteLayout } from "@/components/site-layout";

const HomePage = lazy(() =>
  import("@/pages/home-page").then((m) => ({ default: m.HomePage }))
);
const ServicesPage = lazy(() =>
  import("@/pages/services-page").then((m) => ({ default: m.ServicesPage }))
);
const GalleryPage = lazy(() =>
  import("@/pages/gallery-page").then((m) => ({ default: m.GalleryPage }))
);
const GalleryFolderPage = lazy(() =>
  import("@/pages/gallery-folder-page").then((m) => ({
    default: m.GalleryFolderPage,
  }))
);
const ReviewsPage = lazy(() =>
  import("@/pages/reviews-page").then((m) => ({ default: m.ReviewsPage }))
);
const ContactsPage = lazy(() =>
  import("@/pages/contacts-page").then((m) => ({ default: m.ContactsPage }))
);

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="uslugi" element={<ServicesPage />} />
          <Route path="galereya" element={<GalleryPage />} />
          <Route path="galereya/:folderId" element={<GalleryFolderPage />} />
          <Route path="otzyvy" element={<ReviewsPage />} />
          <Route path="kontakty" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
