"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

type Props = {};

interface League {
  id: number;
  name: string;
  logo: string;
}

const LeaguesPage = ({ params }: { params: { country: string } }) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const router = useRouter();
  console.log(params.country)

  useEffect(() => {
    axios
      .get("https://v3.football.api-sports.io/leagues", {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTAPI_KEY,
        },
        params: {
          country: params.country,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.response)) {
          const extractedLeagues = res.data.response.map((item: any) => ({
            id: item.league.id,
            name: item.league.name,
            logo: item.league.logo,
          }));
          console.log('Extracted Leagues:', extractedLeagues); // Debug log
          setLeagues(extractedLeagues);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Something went wrong:", err);
      });
  }, [params.country]);

  return (
    <div>
      {leagues.length > 0 ? (
        <div className="flex flex-row justify-between flex-wrap">
          {leagues.map((league) => (
            <div
              key={league.id}
              className="flex flex-col items-center m-4 cursor-pointer"
              onClick={() => router.push(`/teams?league=${league.id}`)}
            >
              <img
                src={league.logo}
                alt={`${league.name} logo`}
                className="w-32 h-20 rounded-lg"
              />
              <p className="mt-2 text-center">{league.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <LoaderCircle className="animate-spin justify-between" />
      )}
    </div>
  );
};

export default LeaguesPage;
