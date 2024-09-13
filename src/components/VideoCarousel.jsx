import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import { preview } from 'vite';

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [loadedData, setloadedData] = useState([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay:false,
        videoId: 0,
        isLastVideo:false,
        isPlaying:false,
    })
    const {isEnd, startPlay, videoId,isLastVideo, isPlaying} = video;

    useGSAP(() => {
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () =>{
                setVideo((prevVideo) => ({
                  ...prevVideo,
                  startPlay:true,
                  isPlaying:true,  
                }))
            }
        })
    })
    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            }else{
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetaData = (i, e) => setloadedData
    ((prevVideo) => [...prevVideo, e]);
    useEffect(()=>{
        const currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]){
            //animate the progress of the video
            let anim = gsap.to(span[videoId],{
                onUpdate: () => {

                },
                onComplete: () => {

                }
            })
        }
    },[videoId, startPlay]);
    const handleProcess = (type, i) => {
        switch(type){
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd:
                    true, videoId: i + 1}))
                    break;
            case 'video-last':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo:
                    true, videoId: i + 1}))
                    break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo:
                    false, videoId: 0}));
                    break;
            case 'play':
                setVideo((prevVideo) => ({...prevVideo, isPlaying:
                    !prevVideo.isPlaying}));
                    break;
            default:
                return video;

        }
    }
  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((list, i)=>(
            <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                <div className='video-carousel_container'>
                    <div className='w-full h-full flex-center rounded-3x1
                    overflow-hidden bg-black'>
                        <video 
                        id='video'
                        playsInline= {true}
                        preload='auto'
                        muted
                        ref={(el) => (videoRef.current[i] = 
                            el)}
                        onPlay={() => {
                            setVideo((prevVideo) =>({
                                ...prevVideo, isPlaying:true
                            }))
                        }}
                        onLoadedMetadata={(e) => handleLoadedMetaData(i,e)}
                        >
                            <source src= {list.video} type='video/mp4'/>
                        </video>
                    </div>
                    <div className='absolute top-12 left-[5%] z-10'>
                        {list.textLists.map((text) =>(
                            <p key={text} className='md:text-2xl text-xl font-medium'>
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel