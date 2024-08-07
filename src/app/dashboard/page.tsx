"use client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

interface Country {
  code: string;
  name: string;
  flag: string;
}

const Page = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://v3.football.api-sports.io/countries", {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTAPI_KEY,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.response)) {
          console.log("here");
          setCountries(res.data.response);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Something went wrong:", err);
      });
  }, []);

  function selectedCountries() {
    return countries.filter((country) => {
      return (
        country.name === "England" ||
        country.name === "Spain" ||
        country.name === "Italy" ||
        country.name === "Germany" ||
        country.name === "France" ||
        country.name === "Portugal"
      );
    });
  }

  return (
    <div>
      {countries.length > 0 ? (
        <div className="flex flex-row justify-between flex-wrap ">
          {selectedCountries().map((country) => (
            <div
              key={country.code}
              className="flex flex-col items-center m-4 cursor-pointer"
              onClick={() => router.push(`/league/${country.name}`)}
            >
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-32 h-20 rounded-lg "
              />
              <p className="mt-2 text-center ">{country.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <LoaderCircle className="animate-spin justify-between" />
      )}
    </div>
  );
};

export default Page;