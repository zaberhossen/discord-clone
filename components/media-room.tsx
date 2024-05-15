"use client";

import React, { useEffect, useState } from "react";
import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { userData } from "@/lib/user-data";
import { AUTH } from "@/app/api/service/auth";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  profile: profile;
}

interface profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export function MediaRoom({
  chatId,
  video,
  audio,
  profile
}: MediaRoomProps) {
  // const { user } = useUser();
  const user = profile;

  console.log(user, "userData==========>");

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!profile?.name) return;

    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${user.name}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user?.name, chatId]);

  if (token === "")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    );

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
