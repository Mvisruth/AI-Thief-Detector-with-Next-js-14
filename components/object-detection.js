"use client"
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import {load as cocossLoad} from "@tensorflow-models/coco-ssd"
import * as tf from '@tensorflow/tfjs'
let detectInterval 
const ObjectDetection = () => {
    const [isLoadind,setIsLoading]=useState(true)
    const webcamRef =useRef(null)
    const canvasRef =useRef(null)
    
    const runCoco = async()=>{
        setIsLoading(true)
        const net = await cocossLoad()
        setIsLoading(false)
        detectInterval = setInterval(()=>{
           runObjectDeletion(net)
        },10)

    }
    async function  runObjectDeletion(net){
        if(canvasRef.current && webcamRef.current !==null && webcamRef.current.video?.readyState==4)
        {
            canvasRef.current.width = webcamRef.current.video.videoWidth
            canvasRef.current.Hight = webcamRef.current.video.videoHight

            //find detected object
            const detectedObject = await net.detect(webcamRef.current.video,undefined,0.6)
            // console.log(detectedObject);
            const context = canvasRef.getContext("2d")
            renderPrediction(detectedObject,context)
        }
    }

    const showmyVideo =()=>{
        if(webcamRef.current!==null && webcamRef.current.video?.readyState===4)
            {
                const myVideoWidth = webcamRef.current.video.videoWidth
                const myVideoHight = webcamRef.current.video.videoHight
                   
                webcamRef.current.video.videoWidth= myVideoWidth
                webcamRef.current.video.videoHight= myVideoHight
           }
           
    }

    useEffect(()=>{
        showmyVideo()
        runCoco()
    })
  return (
    <div className='mt-8'>{
        isLoadind?(
            <div className='gradient-text'>Loading AI Model....</div>
        ):
    <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
        {/* webcam */}
         <Webcam
         ref={webcamRef}
         className='rounded-md w-full lg:h-[720px]'
         muted
         />
            
        <canvas ref={canvasRef}
        className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]'
        />
        {/* canvas */}
    </div>}
    </div>
  )

}

export default ObjectDetection