import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { isLoggedIn } from "../../services/authService";
import { useStoreActions } from "easy-peasy";
import { fetchUserDetails } from "../../services/userService";
import swal from "sweetalert";

const Home = () => {
  const setToken = useStoreActions(action => action.user.setToken);
  const setUser = useStoreActions(action => action.user.setUser);

  const [loading, setLoading] = useState(false);

  const setUserDetails = async userToken => {
    const response = await fetchUserDetails(userToken);
    if (response.status === 200) {
      setUser(response.data);
    } else if (response.status === 401) {
      swal(
        "Unauthorized",
        "you dont have permission to view this page",
        "error"
      );
    }
  };

  const history = useHistory();

  useEffect(() => {
    const userToken = isLoggedIn();

    const dataFetcher = async () => {
      setLoading(true);
      await setToken(userToken);
      await setUserDetails(userToken);
      setLoading(false);
    };

    if (!userToken) {
      history.push("/login");
    } else {
      dataFetcher();
    }
    //eslint-disable-next-line
  }, []);

  return <div>Basic Setup</div>;
};

export default Home;
