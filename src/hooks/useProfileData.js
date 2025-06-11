import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const useProfileData = (profileId) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL + `/users/${profileId}`, {
        headers: { "x-api-key": API_KEY },
      });
      setProfile(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }, [profileId]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { loading, profile, error };
};

export default useProfileData;
