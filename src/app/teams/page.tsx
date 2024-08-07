"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter , useSearchParams  } from "next/navigation";
import { LoaderCircle } from "lucide-react";

type Props = {};

interface Team {
  id: number;
  name: string;
  logo: string;
}

const Page = ({ params }: { params: { league: number } }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [season , setSeason]  = useState<number>(2023)
  const router = useRouter();
  const searchParams = useSearchParams()
  const id = searchParams.get('league')
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://v3.football.api-sports.io/teams?league=${id}&season=2023`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTAPI_KEY,
        },
        params: {
          league: id,
        //   season: "2024" // Add season parameter if required by the API
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.response)) {
          const extractedTeams = res.data.response.map((item: any) => ({
            id: item.team.id,
            name: item.team.name,
            logo: item.team.logo,
          }));
          console.log('Extracted Teams:', extractedTeams); // Debug log
          setTeams(extractedTeams);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Something went wrong:", err);
      });
  }, [params.league]);

  return (
    <div>
      {teams.length > 0 ? (
        <div className="flex flex-row justify-between flex-wrap">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center m-4 cursor-pointer"
              onClick={() => router.push(`/team/${team.id}`)}
            >
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-32 h-20 rounded-lg"
              />
              <p className="mt-2 text-center">{team.name}</p>
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
