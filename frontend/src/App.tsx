import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { Home, Login, Register, UserPage, Logout, UserInfoForm } from "./Views";
import Footer from "./Components/Footer";
import PrivateRoute from "./Utils/PrivateRoute";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/home" component={UserPage} />
            <PrivateRoute path="/settings" component={UserInfoForm} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
