import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { ContactPage } from './pages/ContactPage'
import { ExperiencesPage } from './pages/ExperiencesPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RestaurantPage } from './pages/RestaurantPage'
import { RoomDetailPage } from './pages/RoomDetailPage'
import { RoomsPage } from './pages/RoomsPage'
import { StoryPage } from './pages/StoryPage'

export function AppRoutes() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return <AppRoutes />
}
