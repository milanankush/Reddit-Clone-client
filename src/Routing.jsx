import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import AuthModal from "./AuthModal";
import CommunityFormModal from "./CommunityFormModal";
import Header from "./Header";
import PostFormModal from "./PostFormModal";
import RedirectContext from "./RedirectContext";
import RoutingSwitch from "./RoutingSwitch";

function Routing() {
  const { redirect, setRedirect } = useContext(RedirectContext);
  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    }
  }, [redirect]);
  return (
    <Router>
      {redirect && <Redirect to={redirect} />}
      {!redirect && (
        <>
          <Header />
          <RoutingSwitch />
          <PostFormModal />
          <CommunityFormModal />
          <AuthModal />
        </>
      )}
    </Router>
  );
}

export default Routing;
