import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'
import ScrollToTop from "../components/ScrollToTop";

const HomeLayout = () => {
  return (
    <>
    <ScrollToTop />  
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default HomeLayout