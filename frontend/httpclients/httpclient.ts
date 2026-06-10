import axios from "axios";

const BASE_URL = `http://localhost:8000/api`;

export interface Icontent {
  description?: string;
  title: string;
  link?: string;
  type: "youtube" | "tweet" | "document";
  tags: string[];
}

export async function addContent({ description, title, link, tags }: Icontent) {
  const response = await axios.post(
    `${BASE_URL}/contents`,
    {
      description,
      title,
      link,
      tags,
    },
    { headers: { Authorization: `Bearer  ${localStorage.getItem("token")}` } },
  );
  return response.data;
}

export async function userSignin(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/user/signin`, {
    password,
    email,
  });
  return response.data;
}

export async function userSignUp(
  email: string,
  password: string,
  name: string,
) {
  const response = await axios.post(`${BASE_URL}/user/signup`, {
    name,
    password,
    email,
  });

  return response.data;
}

export async function deleteContent(id: string) {
  const response = await axios.delete(`${BASE_URL}/contents/${id}`, {
    headers: { Authorization: `Bearer  ${localStorage.getItem("token")}` },
  });
  return response.data;
}

export async function searchByQuery(query: string) {
  const response = await axios.get(`${BASE_URL}/contents/search?q=${query}`, {
    headers: { Authorization: `Bearer  ${localStorage.getItem("token")}` },
  });
  return response.data;
}

export async function getAllContent() {
  try {
    const response = await axios.get(`${BASE_URL}/contents`, {
      headers: { Authorization: `Bearer  ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
