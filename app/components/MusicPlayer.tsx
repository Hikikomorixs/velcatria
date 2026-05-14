'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch('/ambient.wav')
      .then(res => res.arrayBuffer())
      .then(data => {
        const ctx = new AudioContext();
        contextRef.current = ctx;
        return ctx.decodeAudioData(data);
      })
      .then(buffer => {
        bufferRef.current = buffer;
      });

    const tryPlay = () => {
      startLoop();
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };

    window.addEventListener('click', tryPlay);
    window.addEventListener('scroll', tryPlay);
    window.addEventListener('keydown', tryPlay);

    return () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      sourceRef.current?.stop();
      contextRef.current?.close();
    };
  }, []);

  const startLoop = () => {
    const ctx = contextRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !buffer || playing) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(ctx.destination);
    source.start(0);
    sourceRef.current = source;
    setPlaying(true);
  };

  const toggle = () => {
    if (playing) {
      sourceRef.current?.stop();
      sourceRef.current = null;
      setPlaying(false);
    } else {
      startLoop();
    }
  };

  const bars = [6, 10, 14, 10, 6];

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Wycisz muzykę' : 'Włącz muzykę'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '0',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Equalizer bars */}
      <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '16px' }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              width: '2px',
              height: playing ? `${h}px` : '3px',
              background: playing ? 'rgb(217, 153, 168)' : 'rgba(255,255,255,0.35)',
              transition: `height 0.4s ease ${i * 0.07}s, background 0.3s ease`,
              animation: playing ? `eq${i} 0.7s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
            }}
          />
        ))}
      </div>
      {/* Label */}
      <span style={{
        fontSize: '7px',
        letterSpacing: '0.15em',
        color: playing ? 'rgb(217, 153, 168)' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.3s ease',
        fontFamily: 'inherit',
        textTransform: 'uppercase',
      }}>
        {playing ? 'SFX' : 'MUTE'}
      </span>

      <style>{`
        @keyframes eq0 { from { height: 4px } to { height: 10px } }
        @keyframes eq1 { from { height: 7px } to { height: 14px } }
        @keyframes eq2 { from { height: 12px } to { height: 5px } }
        @keyframes eq3 { from { height: 5px } to { height: 13px } }
        @keyframes eq4 { from { height: 9px } to { height: 3px } }
      `}</style>
    </button>
  );
}