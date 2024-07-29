"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

interface Leagues {
  code: string;
  name: string;
  flag: string;
}

const page = (props: Props) => {
  const [leagues, setLeagues] = useState<Leagues[]>([]);

  const country = window.location.search;

  useEffect(() => {
    axios
      .get("https://v3.football.api-sports.io/leagues", {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTAPI_KEY,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.response0)) {
          setLeagues(res.data.response);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        throw new Error("Something went wrong");
      });
  }, []);

  return <div></div>;
};

export default page;
