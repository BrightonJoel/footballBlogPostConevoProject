import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"
import { AuthProvider } from "./context/AuthContext"

// page and layout imports
import SignUp from "./pages/AuthPages/SignUp"
import Login from "./pages/AuthPages/Login"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import HomeHeader from "./components/Header/HomeHeader"
import HomePage from "./pages/HomePage/HomePage"
import Category from "./pages/CategoryPage/Category"
import CreateBlog from "./pages/BlogPages/CreateBlog"
import MyBlogs from "./pages/BlogPages/MyBlogs"
import BlogsDetails from "./pages/BlogPages/BlogDetails"
import SearchPage from "./pages/SearchPage"
import NotFound from "./pages/NotFound/NotFound"
import About from "./pages/About"
import Theme from "./styles/theme"

const link = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  credentials: "include",
})

// Apollo client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Theme>
            <Switch>
              <Route path='/signup'>
                <Header />
                <SignUp />
              </Route>
              <Route path='/login'>
                <Header />
                <Login />
              </Route>
              <Route exact path='/'>
                <HomeHeader />
                <HomePage />
              </Route>
              <Route path='/create'>
                <HomeHeader />
                <CreateBlog />
              </Route>
              <Route path='/myblogs'>
                <HomeHeader />
                <MyBlogs />
              </Route>
              <Route path='/about'>
                <HomeHeader />
                <About />
              </Route>
              <Route path='/search'>
                <HomeHeader />
                <SearchPage />
              </Route>
              <Route path='/details/:id'>
                <HomeHeader />
                <BlogsDetails />
              </Route>
              <Route path='/category/:id'>
                <HomeHeader />
                <Category />
              </Route>
              <Route path='*'>
                <Header />
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </Theme>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
