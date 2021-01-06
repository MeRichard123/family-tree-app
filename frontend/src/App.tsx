import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./Components/Navigation";
import { Home, Login, Register } from "./Views";
import Footer from "./Components/Footer";
//import PrivateRoute from "./Utils/PrivateRoute";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>TreeMe - Family Tree Maker</title>
      </Helmet>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
