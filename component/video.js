{videoUrl !==null &&
  <VideoPlayer
  
videoProps={{
 videoRef: handleVideoRef,                                                                                                 
 shouldPlay: true,
 isLooping:false,
 resizeMode: Video.RESIZE_MODE_CONTAIN,
 onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
 source: {
   uri: videoUrl,
 },
}}
inFullscreen={false}
switchToLandscape={()=> {setShowMenu(true)}}
onEnd={()=>console.log('end')}
playbackCallback={(status) => {
 //console.log(status)

 if(status.didJustFinish){

   if(index<10){
     setisNextAvailable(true)
     //ref.replayAsync()
   }
   else{setisCycleDone(true)}
   setHeight(hp('90%'))
   }
 }
}
width={Dimensions.get('window').width}
height={height}
/>  }