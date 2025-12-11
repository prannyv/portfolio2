'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Player {
  id: string;
  name: string;
  number: number;
  teamColor: string; // Hex color for team
  videoPath: string; // Path to MP4 file (e.g., '/highlights/player1.mp4')
}

// Default players - you can customize these
const defaultPlayers: Player[] = [
  { id: 'player1', name: 'Haliburton', number: 0, teamColor: '#fdbb30', videoPath: '/highlights/player1.mp4' },
  { id: 'player2', name: 'Edwards', number: 5, teamColor: '#0c2340', videoPath: '/highlights/player2.mp4' },
  { id: 'player3', name: 'Brunson', number: 11, teamColor: '#f58426', videoPath: '/highlights/player3.mp4' },
  { id: 'player4', name: 'Doncic', number: 77, teamColor: '#00538c', videoPath: '/highlights/player4.mp4' },
  { id: 'player5', name: 'Antetokounmpo', number: 34, teamColor: '#00471b', videoPath: '/highlights/player5.mp4' },
  { id: 'player6', name: 'Leonard', number: 6, teamColor: '#ce1141', videoPath: '/highlights/player6.mp4' },
];

export function BasketballHighlights() {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Store detected video durations (playerId -> duration in ms)
  const [videoDurations, setVideoDurations] = useState<Map<string, number>>(new Map());
  const loadedDurationsRef = useRef<Set<string>>(new Set());
  
  // Video element refs for each player
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentPlayerIdRef = useRef<string | null>(null); // Track current player by ID

  // Get selected players in order (filter maintains original player order)
  const selectedPlayersList = players.filter(p => selectedPlayers.has(p.id));

  // Function to detect video duration using video element
  const detectVideoDuration = (videoElement: HTMLVideoElement, playerId: string): void => {
    // If we've already stored a duration for this player, skip to avoid update loops
    if (loadedDurationsRef.current.has(playerId)) return;

    const handleLoadedMetadata = () => {
      if (videoElement.duration && isFinite(videoElement.duration)) {
        const durationMs = videoElement.duration * 1000; // Convert to milliseconds
        setVideoDurations(prev => {
          const newMap = new Map(prev);
          const existing = newMap.get(playerId);
          if (existing === durationMs) return prev; // no change, avoid re-render loop
          newMap.set(playerId, durationMs);
          loadedDurationsRef.current.add(playerId);
          return newMap;
        });
      }
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
    
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    // Trigger load if not already loaded
    if (videoElement.readyState >= 1) {
      handleLoadedMetadata();
    }
  };

  // Toggle player selection
  const togglePlayer = (playerId: string) => {
    setSelectedPlayers(prev => {
      const newSet = new Set(prev);
      const wasSelected = newSet.has(playerId);
      
      // Get the current playing player ID (either from ref or from index)
      const currentList = players.filter(p => prev.has(p.id));
      const currentPlayerId = currentPlayerIdRef.current || 
        (currentList[currentPlayerIndex]?.id ?? null);
      
      if (wasSelected) {
        // Removing a player
        newSet.delete(playerId);
        
        // If we're removing the currently playing video, move to next available
        if (currentPlayerId === playerId) {
          const newList = players.filter(p => newSet.has(p.id));
          if (newList.length > 0) {
            // Try to stay at same position, or move to valid position
            const newIndex = Math.min(currentPlayerIndex, newList.length - 1);
            setCurrentPlayerIndex(newIndex);
            currentPlayerIdRef.current = newList[newIndex]?.id ?? null;
          } else {
            // No players left
            setCurrentPlayerIndex(0);
            currentPlayerIdRef.current = null;
          }
        } else if (currentPlayerId) {
          // We're removing a different player - stay on the same player by finding its new index
          const newList = players.filter(p => newSet.has(p.id));
          const newIndex = newList.findIndex(p => p.id === currentPlayerId);
          if (newIndex !== -1) {
            // Current player still exists, update index to its new position
            setCurrentPlayerIndex(newIndex);
            // currentPlayerIdRef stays the same
          }
        }
      } else {
        // Adding a player - stay on the same player we're currently watching
        newSet.add(playerId);
        if (currentPlayerId) {
          // Find the current player's position in the new list
          const newList = players.filter(p => newSet.has(p.id));
          const newIndex = newList.findIndex(p => p.id === currentPlayerId);
          if (newIndex !== -1) {
            // Current player still exists, update index to its new position
            setCurrentPlayerIndex(newIndex);
            // currentPlayerIdRef stays the same
          }
        }
      }
      
      return newSet;
    });
  };

  // Get duration for current player's video
  const getCurrentVideoDuration = (): number => {
    if (selectedPlayersList.length === 0) return 5000;
    const currentPlayer = selectedPlayersList[currentPlayerIndex];
    if (!currentPlayer) return 5000;
    return videoDurations.get(currentPlayer.id) || 5000;
  };

  // Handle video playback and auto-advance
  useEffect(() => {
    if (!isPlaying || selectedPlayersList.length === 0) {
      // If no players selected or not playing, ensure all videos are paused
      videoRefs.current.forEach((vid) => {
        vid.pause();
      });
      currentVideoRef.current = null;
      return;
    }

    // Edge guard: Ensure current index is valid
    const validIndex = Math.max(0, Math.min(currentPlayerIndex, selectedPlayersList.length - 1));
    if (validIndex !== currentPlayerIndex) {
      setCurrentPlayerIndex(validIndex);
      return;
    }

    // Try to find the current player by ID first, then fall back to index
    let currentPlayer = null;
    if (currentPlayerIdRef.current) {
      currentPlayer = selectedPlayersList.find(p => p.id === currentPlayerIdRef.current);
      if (currentPlayer) {
        // Update index to match the found player only if it's different
        const foundIndex = selectedPlayersList.findIndex(p => p.id === currentPlayerIdRef.current);
        if (foundIndex !== currentPlayerIndex && foundIndex !== -1) {
          setCurrentPlayerIndex(foundIndex);
          return; // Return early to let the effect re-run with correct index
        }
      }
    }
    
    // Fall back to index if ID-based lookup failed
    if (!currentPlayer) {
      currentPlayer = selectedPlayersList[currentPlayerIndex];
    }
    
    if (!currentPlayer) {
      // Edge guard: Current player doesn't exist, reset to start
      if (selectedPlayersList.length > 0) {
        setCurrentPlayerIndex(0);
        currentPlayerIdRef.current = selectedPlayersList[0]?.id ?? null;
      } else {
        currentPlayerIdRef.current = null;
      }
      return;
    }

    // Update the ref to track current player ID
    currentPlayerIdRef.current = currentPlayer.id;

    const video = videoRefs.current.get(currentPlayer.id);
    currentVideoRef.current = video || null;
    if (!video) return;

    // Pause all other videos to avoid multiple play calls
    videoRefs.current.forEach((vid, id) => {
      if (id !== currentPlayer.id) {
        vid.pause();
      }
    });

    let cancelled = false;

    const safePlay = () => {
      if (cancelled) return;
      // Avoid spamming play if already playing
      if (!video.paused) return;
      video.play().catch((err) => {
        if (!cancelled) {
          console.warn('Video play interrupted:', err?.message || err);
        }
      });
    };

    // Handle video end - advance to next
    const handleEnded = () => {
      if (cancelled) return;
      // For single player, restart from beginning; for multiple, advance to next
      if (selectedPlayersList.length === 1) {
        video.currentTime = 0;
        video.play().catch((err) => {
          if (!cancelled) {
            console.warn('Video play interrupted:', err?.message || err);
          }
        });
      } else {
        const nextIndex = (currentPlayerIndex + 1) % selectedPlayersList.length;
        setCurrentPlayerIndex(nextIndex);
        currentPlayerIdRef.current = selectedPlayersList[nextIndex]?.id ?? null;
      }
    };

    video.addEventListener('ended', handleEnded);

    // Play when ready; if metadata already loaded, start immediately
    if (video.readyState >= 2) {
      // If we're resuming same video, don't reset time; if we switched, ensure start
      if (video.ended || video.currentTime === 0) {
        video.currentTime = 0;
      }
      safePlay();
    } else {
      const onCanPlay = () => {
        if (video.ended || video.currentTime === 0) {
          video.currentTime = 0;
        }
        safePlay();
        video.removeEventListener('canplay', onCanPlay);
      };
      video.addEventListener('canplay', onCanPlay);
    }

    // Update progress bar
    const updateProgress = () => {
      if (!video.duration || !isFinite(video.duration)) return;

      // Calculate total duration for all selected players
      const totalDuration = selectedPlayersList.reduce((sum, player) => {
        return sum + (videoDurations.get(player.id) || 5000);
      }, 0);

      // Calculate elapsed time across all players
      let totalElapsed = 0;
      for (let i = 0; i < currentPlayerIndex; i++) {
        const player = selectedPlayersList[i];
        totalElapsed += videoDurations.get(player.id) || 5000;
      }
      
      // Add current video's currentTime
      totalElapsed += video.currentTime * 1000;
      
      // Convert to percentage (0-100)
      const progressPercent = Math.min(100, (totalElapsed / totalDuration) * 100);
      setProgress(progressPercent);
    };

    progressIntervalRef.current = setInterval(updateProgress, 100);

    return () => {
      cancelled = true;
      video.removeEventListener('ended', handleEnded);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      // Don't pause if this video is still the current one and we're still playing
      // The pause will happen naturally when switching videos or stopping playback
      if (currentVideoRef.current !== video || !isPlaying || selectedPlayersList.length === 0) {
        video.pause();
      }
    };
  }, [currentPlayerIndex, isPlaying, selectedPlayersList, videoDurations]);

  // Update current video ref when player index changes
  useEffect(() => {
    if (selectedPlayersList.length === 0) {
      currentVideoRef.current = null;
      return;
    }

    const currentPlayer = selectedPlayersList[currentPlayerIndex];
    if (!currentPlayer) return;

    const videoElement = videoRefs.current.get(currentPlayer.id);
    currentVideoRef.current = videoElement || null;

    // Preload next video (only if there's more than one player)
    if (selectedPlayersList.length > 1) {
      const nextIndex = (currentPlayerIndex + 1) % selectedPlayersList.length;
      const nextPlayer = selectedPlayersList[nextIndex];
      if (nextPlayer) {
        const nextVideo = videoRefs.current.get(nextPlayer.id);
        if (nextVideo) {
          nextVideo.load();
        }
      }
    }
  }, [currentPlayerIndex, selectedPlayersList]);

  // Auto-play when players are selected
  useEffect(() => {
    if (selectedPlayersList.length > 0 && !isPlaying) {
      // Starting playback for the first time
      setIsPlaying(true);
      setCurrentPlayerIndex(0);
      setProgress(0);
      currentPlayerIdRef.current = selectedPlayersList[0]?.id ?? null;
    } else if (selectedPlayersList.length === 0) {
      // No players selected, stop playback
      setIsPlaying(false);
      currentPlayerIdRef.current = null;
      if (currentVideoRef.current) {
        currentVideoRef.current.pause();
      }
    } else if (selectedPlayersList.length > 0 && isPlaying) {
      // Players are selected and we're already playing - ensure state is correct
      // Only update if there's an actual problem to avoid unnecessary re-renders
      const validIndex = Math.max(0, Math.min(currentPlayerIndex, selectedPlayersList.length - 1));
      
      // Ensure currentPlayerIdRef is set correctly
      if (currentPlayerIdRef.current) {
        const stillExists = selectedPlayersList.some(p => p.id === currentPlayerIdRef.current);
        if (!stillExists) {
          // Current player was removed, move to first available
          setCurrentPlayerIndex(0);
          currentPlayerIdRef.current = selectedPlayersList[0]?.id ?? null;
        }
      } else if (validIndex !== currentPlayerIndex) {
        // Index is invalid AND no ID tracked - fix both
        setCurrentPlayerIndex(validIndex);
        currentPlayerIdRef.current = selectedPlayersList[validIndex]?.id ?? null;
      } else if (!currentPlayerIdRef.current) {
        // Just need to set the ID ref, don't update index
        currentPlayerIdRef.current = selectedPlayersList[validIndex]?.id ?? null;
      }
      // If validIndex !== currentPlayerIndex but we have a valid ID, let playback effect handle it
    }
  }, [selectedPlayersList.length, isPlaying]);

  // Calculate progress for multicolored bar based on actual video durations
  const calculateProgressSegments = () => {
    if (selectedPlayersList.length === 0) return [];
    
    // Calculate total duration
    const totalDuration = selectedPlayersList.reduce((sum, player) => {
      return sum + (videoDurations.get(player.id) || 5000);
    }, 0);
    
    if (totalDuration === 0) return [];
    
    let accumulatedDuration = 0;
    
    return selectedPlayersList.map((player, index) => {
      const playerDuration = videoDurations.get(player.id) || 5000;
      const segmentStart = (accumulatedDuration / totalDuration) * 100;
      const segmentEnd = ((accumulatedDuration + playerDuration) / totalDuration) * 100;
      const segmentWidth = segmentEnd - segmentStart;
      
      const isActive = index === currentPlayerIndex;
      const isPast = index < currentPlayerIndex;
      
      // Calculate progress within this segment
      let segmentProgress = 0;
      if (isPast) {
        segmentProgress = 100; // Fully completed
      } else if (isActive && currentVideoRef.current) {
        // Use video's currentTime for accurate progress
        const video = currentVideoRef.current;
        if (video.duration && isFinite(video.duration)) {
          segmentProgress = Math.min(100, Math.max(0, (video.currentTime / (playerDuration / 1000)) * 100));
        }
      }
      
      accumulatedDuration += playerDuration;
      
      return {
        player,
        width: segmentWidth,
        start: segmentStart,
        isActive,
        progress: segmentProgress
      };
    });
  };

  const progressSegments = calculateProgressSegments();
  const currentPlayer = selectedPlayersList[currentPlayerIndex];

  return (
    <div className="relative w-full h-full flex flex-col p-4 gap-3 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Side: Player Selection Grid (2x3) - Scaled smaller */}
        <div className="w-[32%] min-w-[160px] grid grid-cols-2 grid-rows-3 gap-2">
          {players.map((player) => {
            const isSelected = selectedPlayers.has(player.id);
            return (
              <motion.button
                key={player.id}
                onClick={() => togglePlayer(player.id)}
                className={cn(
                  "relative rounded-lg border-2 transition-all duration-200",
                  "flex flex-col items-center justify-center gap-1.5 p-2",
                  isSelected
                    ? "border-gray-800 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-gray-400 hover:border-gray-400"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Player Number - Smaller */}
                <div
                  className={cn(
                    "text-xl font-bold",
                    isSelected ? "text-white" : "text-gray-300"
                  )}
                >
                  #{player.number}
                </div>
                {/* Player Name - Smaller */}
                <div
                  className={cn(
                    "text-[10px] font-medium",
                    isSelected ? "text-white" : "text-gray-400"
                  )}
                >
                  {player.name}
                </div>
                {/* Selection Indicator - Smaller */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right Side: Highlights Display - Wider and smaller */}
        <div className="flex-1 relative rounded-lg border-2 border-gray-700 bg-gray-900 overflow-hidden">
          {/* Border/Frame Effect */}
          <div className="absolute inset-0 border-4 border-gray-700 rounded-lg pointer-events-none" />
          
          {/* Video Display Area - Seamless transitions */}
          <div className="relative w-full h-full">
            {selectedPlayersList.length > 0 ? (
              <>
                {/* Render all selected player videos, only show current one */}
                {selectedPlayersList.map((player, index) => {
                  const isCurrent = index === currentPlayerIndex;
                  return (
                    <video
                      key={player.id}
                      ref={(el) => {
                        if (el) {
                          videoRefs.current.set(player.id, el);
                          // Detect duration when video loads
                          detectVideoDuration(el, player.id);
                        } else {
                          videoRefs.current.delete(player.id);
                        }
                      }}
                      src={player.videoPath}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover",
                        isCurrent ? "z-10" : "z-0 opacity-0 pointer-events-none"
                      )}
                      muted
                      playsInline
                      preload="auto"
                      onError={(e) => {
                        console.error(`Failed to load video: ${player.videoPath}`);
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏀</div>
                  <div className="text-lg font-medium">Select players to view highlights</div>
                </div>
              </div>
            )}
          </div>

          {/* "Highlights" Label - Smaller */}
          <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-white text-xs font-semibold">HIGHLIGHTS</span>
          </div>
        </div>
      </div>

      {/* Progress Indicators Below - Always reserve space, show content when players selected */}
      <div className="flex flex-col gap-2 flex-shrink-0" style={{ minHeight: '56px' }}>
        {selectedPlayersList.length > 0 ? (
          <>
            {/* Multicolored Progress Bar - Thinner */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              {progressSegments.map((segment) => (
                <div
                  key={segment.player.id}
                  className="absolute h-full transition-all duration-100"
                  style={{
                    left: `${segment.start}%`,
                    width: `${segment.width}%`,
                    backgroundColor: segment.player.teamColor,
                    opacity: segment.isActive ? 1 : 0.6,
                  }}
                >
                  <motion.div
                    className="h-full bg-white/30"
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              ))}
            </div>

            {/* Player Circles (Progress Indicators) - Smaller Jersey Style */}
            <div className="flex items-center justify-center gap-2">
              {selectedPlayersList.map((player, index) => {
                const isActive = index === currentPlayerIndex;
                
                // Only the active bubble is saturated, all others are desaturated
                const saturation = isActive ? 100 : 50;
                const size = isActive ? 36 : 28;
                
                return (
                  <div
                    key={player.id}
                    className="relative flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: player.teamColor,
                      filter: `saturate(${saturation}%)`,
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {/* Player Number - Smaller Jersey Style Font */}
                    <span 
                      className="text-white font-black tracking-tight"
                      style={{
                        fontSize: isActive ? '12px' : '10px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {player.number}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          // Empty space to maintain layout - invisible placeholder
          <div className="w-full h-full" />
        )}
      </div>
    </div>
  );
}

