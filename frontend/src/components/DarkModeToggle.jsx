import React, { useRef, useEffect } from 'react';
import { gsap, Power1 } from 'gsap';

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  const dayRef = useRef(null);
  const nightRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.set('#moon, .star', { opacity: 0 });
    gsap.set('#sun, #cloud, #moon', { x: 15 });
    gsap.set('.star', { x: 35, y: -5 });
  }, []);

  useEffect(() => {
    if (darkMode) {
      gsap.set('#sun',   { opacity: 0 });
      gsap.set('#cloud', { opacity: 0 });
      gsap.set('#moon',  { x: -157, rotate: -360, opacity: 1, transformOrigin: 'center' });
      gsap.set('.star',  { opacity: 1 });
      gsap.set(nightRef.current,      { backgroundColor: '#224f6d', borderColor: '#cad4d8' });
      gsap.set(backgroundRef.current, { backgroundColor: '#0d1f2b' });
      dayRef.current.style.pointerEvents   = 'none';
      nightRef.current.style.pointerEvents = 'all';
    }
  }, []);
  
  const handleDayClick = () => {
    gsap.to('#sun', { duration: 1, x: -157, opacity: 0, ease: Power1.easeInOut });
    gsap.to('#cloud', { duration: 0.5, opacity: 0, ease: Power1.easeInOut });
    gsap.to('#moon', { duration: 1, x: -157, rotate: -360, transformOrigin: 'center', opacity: 1, ease: Power1.easeInOut });
    gsap.to('.star', { duration: 0.5, opacity: 1, ease: Power1.easeInOut });
    gsap.to(nightRef.current, { duration: 1, backgroundColor: '#224f6d', borderColor: '#cad4d8', ease: Power1.easeInOut });
    gsap.to(backgroundRef.current, { duration: 1, backgroundColor: '#0d1f2b', ease: Power1.easeInOut });
    dayRef.current.style.pointerEvents = 'none';
    setTimeout(() => { nightRef.current.style.pointerEvents = 'all'; }, 1000);
    setDarkMode(true);
  };

  const handleNightClick = () => {
    gsap.to('#sun', { duration: 1, x: 15, opacity: 1, ease: Power1.easeInOut });
    gsap.to('#cloud', { duration: 1, opacity: 1, ease: Power1.easeInOut });
    gsap.to('#moon', { duration: 1, opacity: 0, x: 35, rotate: 360, transformOrigin: 'center', ease: Power1.easeInOut });
    gsap.to('.star', { duration: 1, opacity: 0, ease: Power1.easeInOut });
    gsap.to(nightRef.current, { duration: 1, backgroundColor: '#9cd6ef', borderColor: '#65c0e7', ease: Power1.easeInOut });
    gsap.to(backgroundRef.current, { duration: 1, backgroundColor: '#d3edf8', ease: Power1.easeInOut });
    nightRef.current.style.pointerEvents = 'none';
    setTimeout(() => { dayRef.current.style.pointerEvents = 'all'; }, 1000);
    setDarkMode(false);
  };

  return (
    <div className="relative w-[150px] h-[70px] sm:w-[180px] sm:h-[85px]">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-[#d3edf8] rounded-full z-10"
      />

      <div
        id="day"
        ref={dayRef}
        onClick={handleDayClick}
        className="absolute inset-0 rounded-full border-[4px] border-[#65c0e7] bg-[#9cd6ef] cursor-pointer z-20"
      />

      <div
        id="night"
        ref={nightRef}
        onClick={handleNightClick}
        className="absolute inset-0 rounded-full border-[4px] border-[#65c0e7] bg-[#9cd6ef] pointer-events-none z-20"
      />

      <svg
        id="darkmode"
        className="absolute inset-0 z-30 transform scale-[0.6] sm:scale-[0.8] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 369 171.667"
      >
        <g>
          <polygon className="star" id="star-1" fill="#A2B5BF" points="166.253,132.982 164.364,135.676 160.983,136.488 163.196,138.965 162.996,142.16 166.253,140.998 169.509,142.16 169.309,138.965 171.522,136.488 168.142,135.676" />
          <polygon className="star" id="star-2" fill="#A2B5BF" points="175.522,44.243 172.684,48.29 167.603,49.51 170.929,53.233 170.628,58.035 175.522,56.288 180.417,58.035 180.116,53.233 183.442,49.51 178.361,48.29" />
          <polygon className="star" id="star-3" fill="#A2B5BF" points="208.22,91.845 206.083,94.891 202.259,95.81 204.763,98.61 204.535,102.226 208.22,100.911 211.903,102.226 211.677,98.61 214.181,95.81 210.356,94.891" />
          <polygon className="star" id="star-4" fill="#A2B5BF" points="252.545,39.052 250.409,42.098 246.585,43.017 249.089,45.819 248.86,49.433 252.545,48.118 256.229,49.433 256.002,45.819 258.506,43.017 254.682,42.098" />
          <polygon className="star" id="star-5" fill="#A2B5BF" points="280.151,84.949 282.749,88.997 287.401,90.217 284.355,93.94 284.632,98.742 280.151,96.995 275.669,98.742 275.946,93.94 272.899,90.217 277.552,88.997" />
          <polygon className="star" id="star-6" fill="#A2B5BF" points="249.791,124.466 246.668,128.919 241.076,130.261 244.737,134.356 244.405,139.64 249.791,137.718 255.178,139.64 254.845,134.356 258.506,130.261 252.914,128.919" />
        </g>
        <g id="moon">
          <path fill="#CAD9DD" d="M255.662,153.639c-18.114,0-35.144-7.055-47.952-19.863c-12.808-12.807-19.861-29.837-19.861-47.951s7.054-35.144,19.861-47.951c12.809-12.809,29.838-19.862,47.952-19.862s35.144,7.054,47.951,19.862c12.809,12.808,19.862,29.838,19.862,47.951s-7.054,35.144-19.862,47.951C290.806,146.584,273.776,153.639,255.662,153.639z" />
          <path fill="#A2B5BF" d="M255.662,21.672c35.431,0,62.713,28.731,62.713,64.162c0,35.431-27.282,62.167-62.713,62.167s-64.153-26.744-64.153-62.175C191.509,50.394,220.231,21.672,255.662,21.672z" />
        </g>
        <g>
          <g id="sun">
            <path fill="#F4E962" d="M255.661,153.638c-18.113,0-35.144-7.054-47.951-19.862c-12.809-12.808-19.862-29.838-19.862-47.951s7.054-35.144,19.862-47.951c12.808,12.809,29.838-19.862,47.951-19.862c18.114,0,35.144,7.054,47.952,19.862c12.808,12.808,19.861,29.838,19.861,47.951s-7.054,35.144-19.861,47.951C290.805,146.584,273.775,153.638,255.661,153.638z" />
            <path fill="#F9C941" d="M255.661,21.671c35.431,0,64.153,28.722,64.153,64.153s-28.723,64.153-64.153,64.153s-64.153-28.723-64.153-64.153S220.23,21.671,255.661,21.671z" />
          </g>
          <path id="cloud" fill="#ECF0F1" stroke="#CAD4D8" strokeWidth="6" strokeMiterlimit="10" d="M153.269,109.614h2.813c-1.348-2.84-2.124-6.003-2.124-9.354c0-12.083,9.794-21.878,21.877-21.878c7.872,0,14.751,4.172,18.605,10.411c2.121-1.246,4.583-1.974,7.221-1.974c7.889,0,14.285,6.396,14.285,14.285c0,2.1-0.465,4.087-1.277,5.882h6.354c6.604,0,12.007,5.403,12.007,12.007s-5.403,12.006-12.007,12.006h-25.151H179.48h-26.212c-5.881,0-10.692-4.812-10.692-10.692S147.388,109.614,153.269,109.614z"/>
        </g>
      </svg>
    </div>
  );
}