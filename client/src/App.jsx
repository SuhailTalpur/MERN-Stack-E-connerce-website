import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import Product from './pages/product'
import AdminPanel from './pages/adminpanel'
import MenProducts from './pages/menproducts'
import WomenProducts from './pages/womenproducts'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/footer'
import Cart from './components/cart'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/Menfashion" element={<MenProducts />} />
        <Route path="/Womenfashion" element={<WomenProducts />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App