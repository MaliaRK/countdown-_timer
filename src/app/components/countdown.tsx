"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from 'react'

const Countdown = () => {
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration > 0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    }

    const handleStart = (): void => {
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);
        }
    }

    const handlePause = (): void => {
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    }

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    }

    useEffect(() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                })
            }, 1000)
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    }
  return (
    <div className="flex items-center bg-slate-500 h-screen justify-center">
        <div className="w-full max-w-md bg-slate-700 rounded-xl border-[3px] border-slate-900 shadow-slate-900 shadow-lg">
            <h1 className="sm:text-lg text-xs font-serif font-extrabold mx-[30%] mt-[10%]">Countdown Timer</h1>
            <div className="flex mt-[10%] ">
                <Input type="number" id="duration" value={duration} onChange={handleDurationChange} placeholder="Enter duration in seconds" className="border-2 border-slate-900 mx-[5%] p-[6px] pr-[25%] rounded-sm bg-transparent shadow-slate-900 shadow-md" />
                <Button onClick={handleSetDuration} className="border-2 border-slate-900 py-[1%] px-[3%] mr-[4%] rounded-sm shadow-slate-900 shadow-md active:scale-90 duration-75 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-75">set</Button>
            </div>
            <div className="text-5xl font-serif font-semibold mx-[30%] mt-[10%]">
                {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center gap-[25px] mb-[10%] mt-[10%] ">
                <Button onClick={handleStart} className="border-2 border-slate-900 py-[1%] px-[3%] rounded-sm shadow-slate-900 shadow-md active:scale-90 duration-75 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-75">{isPaused ? "Resume" : "Start"}</Button>
                <Button onClick={handlePause} className="border-2 border-slate-900 py-[1%] px-[3%] rounded-sm shadow-slate-900 shadow-md active:scale-90 duration-75 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-75">Pause</Button>
                <Button onClick={handleReset} className="border-2 border-slate-900 py-[1%] px-[3%] rounded-sm shadow-slate-900 shadow-md active:scale-90 duration-75 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-75">Reset</Button>
            </div>
        </div>
    </div>
  )
}

export default Countdown
