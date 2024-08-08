"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

interface Player {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
}

const Page = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathName = window.location.href;
  const teamId = pathName.split("/")[4];


  useEffect(() => {
    if (!teamId) return;

    axios
      .get(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTAPI_KEY,
        },
      })
      .then((res) => {
        if (res.data.response && res.data.response[0] && Array.isArray(res.data.response[0].players)) {
          const extractedPlayers = res.data.response[0].players.map((item: any) => ({
            id: item.id,
            name: item.name,
            age: item.age,
            number: item.number,
            position: item.position,
            photo: item.photo,
          }));
         
          setPlayers(extractedPlayers);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Something went wrong:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teamId]);

  return (
    <div>
      {loading ? (
        <LoaderCircle className="animate-spin justify-between" />
      ) : (
        <div>
          {players.length > 0 ? (
            <div className="flex flex-row justify-between flex-wrap">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col items-center m-4 cursor-pointer"
                  onClick={() => router.push(`/compare/${player.id}`)}
                >
                  <img
                    src={player.photo}
                    alt={`${player.name} photo`}
                    className="w-32 h-32 rounded-full"
                  />
                  <p className="mt-2 text-center">{player.name}</p>
                  <p className="text-center">{player.position}</p>
                  <p className="text-center">{`Age: ${player.age}`}</p>
                  <p className="text-center">{`Number: ${player.number}`}</p>
                  <p className="text-center">{`Number: ${player.id}`}</p>

                </div>
              ))}
            </div>
          ) : (
            <p>No players found for this team.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
