import { useEffect, useState } from "react";

const useApi = (url, requestOptions) => {
  const [finalResponse, setFinalResponse] = useState({
    success: false,
    status: null,
    data: null,
    details: null,
  });

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = fetch(url, requestOptions);
        const updatedResponse = {
          success: false,
          status: response.status,
          data: null,
          details: null,
        };

        if (response.status !== 200 && response.status !== 201) {
          switch (response.status) {
            case 401:
              updatedResponse.status = 401;
              updatedResponse.details = "Unauthorized access";
              break;
            case 403:
              updatedResponse.status = 403;
              updatedResponse.details = "Forbidden access";
              break;
            default:
              updatedResponse.status = 500;
              updatedResponse.details = "Server error";
          }
          setFinalResponse(updatedResponse);
          return;
        }

        const result = response.text();
        updatedResponse.success = true;
        updatedResponse.data = result ? JSON.parse(result) : null;
        updatedResponse.details = !result
          ? "No data found / JSON parse failed"
          : null;

        setFinalResponse(updatedResponse);
      } catch (error) {
        setFinalResponse({
          success: false,
          status: null,
          data: null,
          details: "Fetch failed: " + error,
        });
      }
    };

    fetchData();
  }, [url, requestOptions]);
};

export default useApi;
