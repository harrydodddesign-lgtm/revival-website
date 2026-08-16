"use client";

import { useCallback, useEffect, useRef } from "react";

// Powers a horizontally-looping slider: auto-scrolls, is draggable, and
// eases to the next card on arrow click. Expects the track to render its
// items twice back-to-back so the scroll can wrap seamlessly.
export function useLoopSlider() {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDown: false, startX: 0, scrollStart: 0, isAnimating: false });
  const animFrameRef = useRef<number | null>(null);

  const trackRef = useCallback((el: HTMLDivElement | null) => {
    nodeRef.current = el;
  }, []);

  useEffect(() => {
    const track = nodeRef.current;
    if (!track) return;

    let loopWidth = track.scrollWidth / 2;
    const handleResize = () => {
      loopWidth = track.scrollWidth / 2;
    };
    window.addEventListener("resize", handleResize);

    let rafId: number;
    const speed = 0.6;
    const step = () => {
      if (!dragRef.current.isDown && !dragRef.current.isAnimating) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft -= loopWidth;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = nodeRef.current;
    if (!track) return;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    dragRef.current = { isDown: true, startX: e.clientX, scrollStart: track.scrollLeft, isAnimating: false };
    track.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = nodeRef.current;
    const drag = dragRef.current;
    if (!track || !drag.isDown) return;
    const loopWidth = track.scrollWidth / 2;
    let next = drag.scrollStart - (e.clientX - drag.startX);
    if (next < 0) next += loopWidth;
    if (next >= loopWidth) next -= loopWidth;
    track.scrollLeft = next;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = nodeRef.current;
    if (track) track.releasePointerCapture(e.pointerId);
    dragRef.current.isDown = false;
  };

  const handleArrowClick = (direction: 1 | -1) => {
    const track = nodeRef.current;
    if (!track) return;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || "24") || 24;
    const step = card ? card.offsetWidth + gap : 300;
    const loopWidth = track.scrollWidth / 2;
    const start = track.scrollLeft;
    const target = start + direction * step;
    const duration = 500;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    dragRef.current.isAnimating = true;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      track.scrollLeft = start + (target - start) * easeOutCubic(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        let final = target;
        if (final < 0) final += loopWidth;
        if (final >= loopWidth) final -= loopWidth;
        track.scrollLeft = final;
        dragRef.current.isAnimating = false;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  return { trackRef, handlePointerDown, handlePointerMove, handlePointerUp, handleArrowClick };
}
