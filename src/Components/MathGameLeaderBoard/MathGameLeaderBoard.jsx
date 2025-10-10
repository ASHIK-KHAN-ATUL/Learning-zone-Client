import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Medal, Gamepad2 } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const MathGameLeaderBoard = () => {
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();

  // Leaderboard (Top 5)
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["mathLeaderboard"],
    queryFn: async () => {
      const res = await axiosPublic.get("/math-game/leaderboard");
      return res.data;
    },
  });

  // My Score
  const { data: myScore, isError } = useQuery({
    queryKey: ["myScore", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/math-game/myscore/${user.email}`);
      return res.data;
    },
  });

  // console.log(myScore);

  // Loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-cyan-400" />
        <p className="ml-3 text-gray-300">Loading leaderboard...</p>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-900/90 rounded-2xl shadow-2xl mb-14 relative text-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400 drop-shadow-lg">
        🏆 Math Challenge Leaderboard
      </h2>

      {/* Leaderboard Table */}
      {leaderboard.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
          <table className="min-w-full table-auto border-collapse text-gray-100">
            <thead>
              <tr className="bg-gray-800/70 text-cyan-300 font-semibold text-center">
                <th className="px-4 py-3 rounded-tl-xl w-24">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Total Points</th>
                <th className="px-4 py-3 rounded-tr-xl">Best Streak</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((player, index) => (
                <tr
                  key={player._id}
                  className={`border-b border-gray-700 hover:bg-gray-800/50 transition-all text-center ${
                    index < 3 ? "font-semibold text-yellow-400" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2">
                      {index + 1 <= 3 && (
                        <Medal
                          className={`w-5 h-5 ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                              ? "text-gray-400"
                              : "text-orange-400"
                          }`}
                        />
                      )}
                      <span className="text-base">{index + 1}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={player.userPhoto}
                        alt={player.userName}
                        className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                      />
                      <p className="font-medium text-cyan-400">
                        {player.userName}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-400">
                    {player.totalPoints ?? 0}
                  </td>
                  <td className="px-4 py-3 font-semibold text-purple-400">
                    {player.bestStreak ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800/50 rounded-2xl">
          <Gamepad2 className="mx-auto w-12 h-12 text-purple-400 mb-3" />
          <p className="text-lg font-medium text-gray-200">
            No one has played yet — be the first to start the challenge! 🎯
          </p>
        </div>
      )}

      {/* My Personal Score Section */}
      {myScore && !isError ? (
        <div className="mt-10 relative overflow-hidden rounded-2xl shadow-2xl bg-gray-800/60 backdrop-blur-xl border border-gray-700 p-6">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10"></div>

          <div className="relative text-center mb-6">
            <h3 className="text-2xl font-bold drop-shadow-md text-cyan-400">
              🎮 Your Game Performance
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              See how well you’ve been playing!
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {/* Total Points */}
            <div className="relative bg-gray-900/30 backdrop-blur-2xl p-6 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="font-medium text-cyan-300 mb-2">Total Points</p>
              <p className="text-4xl font-extrabold text-yellow-400 drop-shadow-lg">
                {myScore.totalPoints}
              </p>
            </div>

            {/* Best Streak */}
            <div className="relative bg-gray-900/30 backdrop-blur-2xl p-6 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="font-medium text-cyan-300 mb-2">Best Streak</p>
              <p className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
                {myScore.bestStreak}
              </p>
            </div>

            {/* Last Played */}
            <div className="relative bg-gray-900/30 backdrop-blur-2xl p-6 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="font-medium text-cyan-300 mb-2">Last Played</p>
              <p className="text-lg font-semibold text-purple-400 drop-shadow-sm">
                {new Date(myScore.lastPlayed).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="relative mt-6 text-center">
            <p className="text-sm italic text-gray-300">
              🌟 Keep playing and break your own record!
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-300 bg-gray-800/50 rounded-2xl p-8 shadow-inner">
          <Gamepad2 className="mx-auto w-10 h-10 text-purple-400 mb-2" />
          <p className="font-medium">
            You haven’t played the game yet — start your first match to earn
            points! 🚀
          </p>
        </div>
      )}
    </div>
  );
};

export default MathGameLeaderBoard;
