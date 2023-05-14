import { API_URL } from "../constants";

export const ask = async (question) => {
  const url = API_URL;
  const requestData = { question };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    return { ok: false };
  }

  const data = await response.json();
  console.log(`data: `)
  console.log(data)

  return {
    ok: true,
    ...data,
  };
};
