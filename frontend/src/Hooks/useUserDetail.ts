import { useQuery } from "react-query";
import { BASE_URL } from "../Utils/store";
import axios from "axios";

const useUserDetail = () => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;

  const getUserDetail = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/user`, {
        headers: { Authorization: `Token ${token}` },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isSuccess } = useQuery("getUser", getUserDetail, {
    staleTime: 5000,
  });

  return { data, isLoading, isSuccess };
};

export default useUserDetail;
