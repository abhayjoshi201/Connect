"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {cn} from "@/lib/utils";
import { Loader2, Lock } from "lucide-react";
//import {useConfettiStore} from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
    chapterID: string;
    title: string;
    courseID: string;
    nextChapterID?: string;
    playbackId: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    
}

const VideoPlayer = ({
    chapterID,
    title,
    courseID,
    nextChapterID,
    playbackId,
    isLocked,
    completeOnEnd,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8 " />
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(
                        !isReady && "hidden"
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={()=>{}}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
                
        </div>
    )
}

export default VideoPlayer;