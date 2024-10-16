import './App.css';
import Header from './components/Header/Header';
import Navigate from './components/Navigate/Navigate';
import Body from "./components/Body/Body";
import Crossword from './components/Crossword/Crossword';
import Theme from './components/Theme/Theme';
import Footer from './components/Footer/Footer';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header />
      <Navigate />
      <Footer />

    </>
  },
  {
    path: "/create",
    element: <> <Header />
      <Body />
      <Crossword />
      <Footer />
    </>
  },
  {
    path: "/theme",
    element: <> <Header />

      <Theme />
      <Footer />
    </>
  }
])



function App() {
  return (
    <RouterProvider router={router}></RouterProvider>

  )
    ;
}

export default App;
