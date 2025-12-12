// import { useState } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import coinbase from './assets/svg/coinbase.svg'
import unity from './assets/svg/unity.svg'
import burda from './assets/svg/burda.svg'
import atlas from './assets/svg/atlas.svg'
import forsta from './assets/svg/forsta.svg'
import bighealth from './assets/svg/bighealth.svg'
import leybold from './assets/svg/leybold.svg'
import ltse from './assets/svg/ltse.svg'
import { FaArrowRight } from 'react-icons/fa6'
import Slider from 'react-slick'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import hero_video from './assets/Itekako_Office_2.mp4'
import hero_svg from './assets/svg/hero_svg.svg'
import clsx from 'clsx'
import { ActionLink } from './components/ActionLink'
import services_icon from './assets/svg/services.svg'
import { AiOutlinePlus } from 'react-icons/ai'
import man_gif from './assets/gif/man.gif'
import mouse_gif from './assets/gif/mouse.gif'
import notebook_gif from './assets/gif/notebookgif.gif'
import typing_gif from './assets/gif/typing.gif'
import { CLIENT_STORIES, NUMBERS, SERVICES, INDUSTRIES, WORK_MODES, PROCESS } from './utils/data'

// const CLIENT_LOGOS = [coinbase, unity, burda, atlas, forsta, bighealth, leybold, ltse]

type Route = 'home' | '404'

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.2em] text-[#00f4ba] mb-4">404</p>
      <h1 className="font-[200] text-5xl md:text-6xl leading-tight mb-6">
        You’ve reached our playground.<br />Let’s get you back on track.
      </h1>
      <p className="text-[#c4d6d4] max-w-xl mb-8">
        Every link on this cloned homepage is routed here intentionally. Use the button below to return to the experience.
      </p>
      <button
        onClick={onBack}
        className="btn-primary"
        type="button"
      >
        Back to homepage
      </button>
    </div>
  )
}

function useAutoTabs(length: number, delay = 4200, enabled = true) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % length)
    }, delay)
    return () => clearInterval(id)
  }, [length, delay, enabled])
  return [index, setIndex] as const
}

function App() {
  const [route, setRoute] = useState<Route>(window.location.hash === '#not-found' ? '404' : 'home')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [serviceIndex, setServiceIndex] = useAutoTabs(SERVICES.length, 5200, !isMobile)
  const [processIndex, setProcessIndex] = useAutoTabs(PROCESS.length, 4800, !isMobile)
  const [timerProgress, setTimerProgress] = useState(0)
  const [processTimerProgress, setProcessTimerProgress] = useState(0)
  const [isYellowSection, setIsYellowSection] = useState(false)
  const [openServiceAccordion, setOpenServiceAccordion] = useState<number | null>(null)
  const [openProcessAccordion, setOpenProcessAccordion] = useState<number | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const yellowTriggerRef = useRef<HTMLDivElement | null>(null)

  const go404 = () => {
    window.location.hash = 'not-found'
    setRoute('404')
  }

  const goHome = () => {
    window.location.hash = ''
    setRoute('home')
  }

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash === '#not-found' ? '404' : 'home')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    const handle = () => {
      marquee.style.animationDuration = '48s'
    }
    handle()
  }, [])

  // Window resize handler to disable auto-rotation on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Timer bar animation (desktop only)
  useEffect(() => {
    if (isMobile) return
    setTimerProgress(0) // Reset when service changes
    const duration = 5200 // Match the auto-rotation delay
    const interval = 16 // ~60fps
    const increment = (100 / duration) * interval
    
    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        const next = prev + increment
        return next >= 100 ? 100 : next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [serviceIndex, isMobile])

  // Process timer bar animation (desktop only)
  useEffect(() => {
    if (isMobile) return
    setProcessTimerProgress(0) // Reset when process changes
    const duration = 4800 // Match the auto-rotation delay
    const interval = 16 // ~60fps
    const increment = (100 / duration) * interval
    
    const timer = setInterval(() => {
      setProcessTimerProgress((prev) => {
        const next = prev + increment
        return next >= 100 ? 100 : next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [processIndex, isMobile])

  // Intersection Observer for yellow section
  useEffect(() => {
    const currentRef = yellowTriggerRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsYellowSection(entry.isIntersecting)
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for smoother transitions
        rootMargin: '-100px 0px', // Start transition slightly before element enters viewport
      }
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [])

  const slickSettings = useMemo(
    () => ({
        dots: false,
        infinite: true,
      speed: 550,
        slidesToShow: 4,
        slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3800,
      pauseOnHover: true,
      arrows: false,
    //   nextArrow: <Arrow direction="right" />,
    //   prevArrow: <Arrow direction="left" />,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3 } },
        { breakpoint: 960, settings: { slidesToShow: 2 } },
        { breakpoint: 680, settings: { slidesToShow: 1 } },
      ],
    }),
    []
  )

  if (route === '404') return <NotFound onBack={goHome} />

    return (
    <main className="bg-[#020202] text-white">
        <Navigation go404={go404} />

        <section className="hero-fixed relative overflow-hidden">
            <img
                src={hero_svg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
            />
            <video
                className="absolute inset-0 h-full w-full object-cover"
                src={hero_video}
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 via-[#020202]/55 to-[#020202]" />
            <div className="relative mx-auto flex min-h-[100vh] max-w-screen-2xl flex-col justify-center items-center px-5 pb-24 pt-24 sm:px-8 lg:px-12">
                <div className="space-y-4">
                    <h1 className="font-[200] text-center !font-reckless-neue text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl xl:text-[4.5rem] xl:leading-[1.1] tracking-tight">
                        <span className="text-[#f3ff65] block">House of Engineers.</span>
                        <span className="block">Big enough to deliver,</span>
                        <span className="block">small enough to care.</span>
                    </h1>
                </div>
                </div>
            {/* <button
            onClick={go404}
            aria-label="Our beat"
            className="spotify-btn"
            type="button"
            >
            <FaSpotify />
            <span className="spotify-label">OUR BEAT</span>
            </button> */}
            </section>

        <div className="hero-spacer" />

        <div className="content-over overflow-x-hidden">
                <section className='bg-[#020202] md:px-10 border-0 border-[#6f7372]/30 md:border-b-[0.3px]'>
                    <div className='pt-[80px] pb-[55px] pd:mx-[80px]'>
                        <div className='border-y border-[0.2px] border-[#6f7372]/30 md:border-0 grid grid-cols-2 sm:grid-cols-4'>
                    {
                        [
                            { icon: coinbase},
                            { icon: unity}, 
                            { icon: burda}, 
                            { icon: atlas},
                            { icon: forsta}, 
                            { icon: bighealth}, 
                            { icon: leybold}, 
                            { icon: ltse, special: true},
                        ].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className={clsx(
                                        'h-[120px] flex items-center justify-center border-[#6f7372]/30',
                                        // Right border: show except on last column
                                        idx % 2 !== 1 && 'border-r md:border-0 ',
                                        idx % 4 !== 3 && 'sm:border-r md:border-0 ',
                                        // Bottom border: show except on last row
                                        idx < 6 && 'border-b md:border-0 ',
                                        idx < 4 && 'sm:border-b md:border-0 '
                                    )}
                                >
                                <img 
                                    src={item.icon} 
                                    alt="company logo" 
                                    className={clsx(
                                        // 'w-[112px]',
                                        !item.special ? 'w-[112px]':'w-[40px]',
                                    )}
                                />
                            </div>
                        ))
                    }
                        </div>
                </div>
            </section>

                <section className="dark-section">
                    <div className="section-shell">
                    <div className="space-y-4">
                        <h2 className='mt-10 lg:text-[4.2rem] text-[2rem] tracking-tight text-white font-[200] max-w-[450px] lg:max-w-[900px]'>We architect, build and test IT solutions for Fortune 500, SMEs and startups of all sizes. </h2>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                        <p className="text-lg text-white/80">Check out all client stories</p>
                        <ActionLink onGo404={go404} className="btn-primary font-[200]">
                        more <FaArrowRight className="ml-2 inline-block" />
                        </ActionLink>
                    </div>
                </div>
                    <div className="relative px-4 pb-12 pt-8 sm:px-8">
                    <Slider {...slickSettings}>
                        {CLIENT_STORIES.map((story, idx) => (
                            <div key={idx} 
                                className="group p-5 border border-[#6f7372]/30">
                                <img 
                                    src={story.image}
                                    alt="project image" 
                                    className='w-full h-auto'
                                />
                                <h3 className='text-[#c4d6d4] text-[1.3rem] leading-[1.2] font-[200] mt-[1.5rem] mb-[2rem]'>{story.title}</h3>
                                <FaArrowRight className='w-6 scale-[1.3] text-[#c4d6d4] transition-all duration-300 group-hover:-rotate-45 group-hover:text-[#00f4ba]' />
                            </div>
                        ))}
                </Slider>
                    </div>
                </section>

                <section className="dark-section border-y border-white/10">
                    <div className="section-shell">
                        <h2 className="heading-lg text-center">Itekako in numbers</h2>
                    </div>
                    <div className="marquee" ref={marqueeRef}>
                        <div className="marquee-track">
                        {[...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS, ...NUMBERS].map((item, idx) => (
                            <div className="marquee-item" key={idx}>
                            <div className="h-20 w-20 shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
                            </div>
                            <p className="text-white text-[1.5rem] leading-[1.1] whitespace-nowrap">{item.label}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>

                <section className="light-section !-mx-4">
                    <div className='px-4 sm:px-8'>
                        <div className="section-shell space-y-6">
                            <p className="label !text-[#020202]">What we do</p>
                            <h2 className="heading-lg text-[#020202] max-w-[1200px]">
                                We’ve taken products from napkins to definition to implementation to deployment to scaling to maintenance, and every step in between.
                            </h2>
                        </div>
                    </div>

                    <div className="section-shell mt-10">
                        {/* Mobile Accordion View */}
                        <div className="md:hidden space-y-2 border-t border-white">
                            {SERVICES.map((service, idx) => {
                                const isOpen = openServiceAccordion === idx
                                return (
                                    <div key={service.name} className="border-b border-white overflow-hidden">
                                        <button
                                            onClick={() => setOpenServiceAccordion(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 text-left"
                                            type="button"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={service.icon} alt="" className="h-6 w-6" />
                                                <span className="text-sm font-medium text-[#020202]">{service.name}</span>
                                            </div>
                                            <span className={`text-[#020202] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                                                <AiOutlinePlus className='scale-[1.5]' />
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 py-8 border-t border-white grid grid-cols-[30%_1fr] max-[500px]:grid-cols-1 gap-20 bg-[#c4d6d4] max-[500px]:gap-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                                <div className="flex flex-col max-[500px]:flex-row max-[500px]:items-end h-full gap-2.5 justify-between max-[500px]:order-last">
                                                    <div className='w-full bg-[#f3ff65] max-[500px]:max-w-[100px]'>
                                                        <img src={services_icon} alt="services icon" className="w-full h-full object-contain" />
                                                    </div>
                                                    <ActionLink onGo404={go404} className="btn-primary font-[200] !w-fit h-fit">
                                                        more <FaArrowRight className="ml-2 inline-block" />
                                                    </ActionLink>
                                                </div>
                                                <div className="flex flex-col gap-2.5">
                                                    {service.items.map(([label, icon]) => (
                                                        <div key={label} className="service-item !bg-transparent">
                                                            <p className="text-[#020202]">{label}</p>
                                                            <img src={icon} alt={label} className="h-4 w-4 mb-2.5" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Desktop Timer View */}
                        <div className="hidden md:grid lg:grid-cols-[33%_1fr]">
                            <div className="flex flex-col justify-between border-t border-white">
                                {SERVICES.map((service, idx) => {
                                    const active = idx === serviceIndex
                                    return (
                                        <button
                                            key={service.name}
                                            onClick={() => setServiceIndex(idx)}
                                            className={`service-tab ${active ? 'active' : ''} h-full`}
                                            type="button"
                                        >
                                            <img src={service.icon} alt="" className="h-6 w-6 mr-3" />
                                            <span className="text-left text-sm font-medium text-[#020202] sm:text-base">{service.name}</span>
                                            <div className="timer-bar" style={{ width: active ? `${timerProgress}%` : '0%' }} />
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="service-panel min-h-[450px]">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex-1 space-y-6">
                                        <p className="text-2xl font-[400] text-[#020202]">{SERVICES[serviceIndex].name}</p>
                                        <ActionLink onGo404={go404} className="btn-primary !-mt-2 font-[200]">
                                            more <FaArrowRight className="ml-2 inline-block" />
                                        </ActionLink>
                                        <hr className="border-black/30"/>
                                    </div>
                                    <div className="flex mb-3 items-end">
                                        <div className="flex flex-col gap-2.5 mt-auto min-w-[450px]">
                                            {SERVICES[serviceIndex].items.map(([label, icon]) => (
                                                <div key={label} className="service-item">
                                                    <p className="text-[#020202]">{label}</p>
                                                    <img src={icon} alt={label} className="h-4 w-4 mb-2.5" />
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className='w-[100px] h-[100px] ml-auto bg-[#f3ff65]'>
                                            <img src={services_icon} alt="services icon" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="light-section">
                    <div className="section-shell space-y-5 text-center !max-w-[700px] mx-auto px-4 sm:px-8">
                        <p className="label !text-[#020202]">Industries</p>
                        <h2 className="heading-lg text-[#020202]">The wide spectrum of industries we serve</h2>
                    </div>
                    <div className="section-shell mt-10">
                    <div className="grid grid-cols-2 lg:grid-cols-6 !-mx-4">
                        {INDUSTRIES.map((industry, idx) => (
                            <div key={idx} className="industry-card border !border-white min-h-[120px] !block sm:!flex">
                                <div className='h-[2.25rem] w-[2.25rem] m-auto sm:m-0'>
                                    {industry.icon}
                                </div>
                                <p className="text-lg font-[400] text-[#020202] text-center sm:text-left mt-3 sm:mt-0">{industry.name}</p>
                                {industry.name === 'Automotive' && <span className="badge">NEW</span>}
                            </div>
                        ))}
                    </div>
                    </div>
                </section>

                <section className="light-section px-4 sm:px-8">
                    <div className="section-shell space-y-5 text-center">
                        <p className="label !text-[#020202]">How we work</p>
                        <h2 className="heading-lg text-[#020202] max-w-[900px] mx-auto">We build solutions and grow partnerships</h2>
                    </div>
                    <div className="mt-12 grid lg:grid-cols-3 -mx-4 sm:-mx-8">
                        {WORK_MODES.map((mode) => (
                            <div key={mode.title} className="group border border-white p-5 transition-all duration-500 ease-in-out lg:hover:bg-white">
                                <div>
                                    <div className='flex items-center justify-between'>
                                        <p className="lg:text-[2.19rem] text-[1.35rem] font-[200] text-[#020202]">{mode.title}</p>
                                        <AiOutlinePlus className='text-[#020202] scale-[2] hidden lg:block' />
                                    </div>
                                    <div className='relative mt-5 lg:min-h-[400px] lg:block grid grid-cols-1 md:grid-cols-[30%_1fr] md:gap-20 gap-10'>
                                        <div className='w-[40%] max-[500px]:w-full md:w-[80%] md:mx-auto order-last md:order-first h-full lg:h-[400px] lg:block flex transition-opacity duration-500 ease-in-out lg:opacity-100 lg:group-hover:opacity-0'>
                                            <img src={mode.icon} alt="icons" className="w-full mt-auto lg:h-full object-contain" />
                                        </div>
                                        <div className="mt-4 flex flex-col h-full text-[#020202] space-y-2 transition-opacity duration-500 ease-in-out lg:absolute lg:top-5 lg:left-0 lg:right-0 lg:opacity-0 lg:group-hover:opacity-100">
                                            <p className='text-[#020202]'>{mode.copy}</p>
                                            <div className='mt-auto pb-5 lg:pb-10'>
                                                <p className='mt-3'>BENEFITS:</p>
                                                {mode.benefits.map((benefit) => (
                                                    <div key={benefit} className="flex items-start gap-2 py-2 text-[#020202] border-b border-black/30">
                                                        <span className="mt-2.5 h-1 w-1 rounded-full bg-[#020202]" />
                                                        <p>{benefit}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`dark-section transition-all duration-1000 ease-in-out ${isYellowSection ? '!bg-[#f3ff65]' : ''}`}>
                    <div className="section-shell space-y-5 mt-20">
                    <h2 className={`heading-lg max-w-[700px] transition-colors duration-1000 ${isYellowSection ? '!text-black' : ''}`}>A look into our methodical process</h2>
                    </div>
                    <div className="section-shell mt-10">
                        {/* Mobile Accordion View */}
                        <div className="md:hidden -mx-6 sm:-mx-12">
                            {PROCESS.map((step, idx) => {
                                const isOpen = openProcessAccordion === idx
                                return (
                                    <div key={step.title} className="border-y border-white/10 overflow-hidden">
                                        <button
                                            onClick={() => setOpenProcessAccordion(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                            type="button"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-[2.4rem] h-[2.4rem] rounded-full border flex items-center justify-center transition-colors duration-1000 ${isYellowSection ? 'border-black/50' : 'border-[#5d6b6b]'}`}>
                                                    <span className={`font-[200] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-[#5d6b6b]'}`}>{idx + 1}</span>
                                                </div>
                                                <span className={`text-base font-medium transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{step.title}</span>
                                            </div>
                                            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''} ${isYellowSection ? 'text-black' : 'text-white'}`}>
                                                <AiOutlinePlus className='scale-[1.5]' />
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 py-8 space-y-6 animate-in slide-in-from-top-2 bg-[#c4d6d4]/10 duration-300">
                                                {/* <div className="flex-1 space-y-6">
                                                    <p className={`text-sm uppercase tracking-[0.2em] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-[#00f4ba]'}`}>Phase {idx + 1}</p>
                                                </div> */}
                                                <div className="mb-3">
                                                    {/* <p className={`heading-lg font-[400] mb-7 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{step.title}</p> */}
                                                    <p className={`text-sm max-w-[500px] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{step.copy}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Desktop Timer View */}
                        <div className="hidden md:grid lg:grid-cols-[33%_1fr]">
                            <div className="flex flex-col justify-between border-t border-white/10">
                            {PROCESS.map((step, idx) => {
                                const active = idx === processIndex
                                return (
                                <button
                                    key={step.title}
                                    onClick={() => setProcessIndex(idx)}
                                    className={`process-tab h-full`}
                                    type="button"
                                >
                                    <div className={`w-[2.4rem] h-[2.4rem] rounded-full border flex items-center justify-center transition-colors duration-1000 ${isYellowSection ? 'border-black/50' : 'border-[#5d6b6b]'}`}>
                                        <span className={`font-[200] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-[#5d6b6b]'}`}>{idx + 1}</span>
                                    </div>
                                    <span className={`text-sm font-medium transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{step.title}</span>
                                    <div className="timer-bar" style={{ width: active ? `${processTimerProgress}%` : '0%' }} />
                                </button>
                                )
                            })}
                            </div>
                            <div className={`border-y lg:border-l p-10 lg:min-h-[450px] transition-colors duration-1000 ${isYellowSection ? 'border-black/30' : 'border-white/10'}`}>
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex-1 space-y-6 lg:mb-0 mb-10">
                                        <p className={`text-sm uppercase tracking-[0.2em] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-[#00f4ba]'}`}>Phase {processIndex + 1}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className={`heading-lg font-[400] mb-7 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{PROCESS[processIndex].title}</p>
                                        <p className={`text-sm max-w-[500px] transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white'}`}>{PROCESS[processIndex].copy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`dark-section transition-all duration-1000 ease-in-out ${isYellowSection ? '!bg-[#f3ff65]' : ''}`}>
                    <div className="section-shell space-y-5">
                    <h2 className={`heading-lg max-w-5xl transition-colors duration-1000 ${isYellowSection ? '!text-black' : ''}`}>
                        Join our passionate team, unleash your potential, and be part of something truly awesome.
                    </h2>
                    </div>
                    <div ref={yellowTriggerRef}>
                        <div className='relative lg:w-[800px] sm:w-[90%] w-[80%] mx-auto'>
                            <img
                                src={notebook_gif}
                                alt="Writing in notebook"
                                className="absolute lg:top-[100px] top-[50px] -left-[30px] lg:-left-[150px] lg:w-[200px] w-[150px]"
                            />
                            <img
                                src={typing_gif}
                                alt="Writing in notebook"
                                className="absolute lg:-top-[40px] top-[40px] lg:-right-[150px] -right-[30px] lg:w-[200px] w-[200px]"
                            />
                            <div className='relative flex lg:flex-row flex-col lg:gap-10 gap-4 mx-auto my-30 backdrop-blur-md bg-white/10 p-6 sm:p-10 lg:p-16'>
                                {/* <div className='lg:w-[300px] w-full h-[250px] shrink-0 overflow-hidden'> */}
                                <div className='lg:w-[300px] w-full aspect-[6/3] lg:aspect-[6/5] shrink-0 overflow-hidden'>
                                    <img
                                        src={man_gif}
                                        alt="Writing in notebook"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className='flex flex-col !h-full'>
                                        <p className={`lg:text-sm text-md transition-colors duration-1000 ${isYellowSection ? 'text-black' : ''}`}>Our dynamic work environment fosters creativity, empowers you to make an impact, and offers endless learning opportunities.
                                        Together, let's shape the future of technology and create extraordinary solutions that inspire.</p>
                                        <ActionLink onGo404={go404} className={`btn-primary !w-fit lg:mt-[80px] mt-4 ${isYellowSection ? '!text-[#f3ff65] !bg-[#020202]' : ''}`}>
                                            JOIN US <FaArrowRight className="ml-2 inline-block" />
                                        </ActionLink>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 lg:mt-12">
                            <div className="w-[120px] lg:w-[150px]">
                                <img
                                    src={mouse_gif}
                                    alt="Hands on desk"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    
                </section>

                <section className={`dark-section transition-all duration-1000 ease-in-out ${isYellowSection ? '!bg-[#f3ff65]' : ''}`}>
                    <div className="section-shell flex lg:flex-row flex-col">
                        <p className={`lg:text-[2.2rem] text-[1.5rem] whitespace-nowrap mb-8 w-[500px] transition-colors duration-1000 ${isYellowSection ? '!text-black' : ''}`}>Get in touch:</p>
                        <form className="w-full space-y-6">
                            <div>
                                <label htmlFor="name" className={`block mb-2 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white/80'}`}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`w-full bg-transparent border-b px-0 py-3 placeholder-white/40 focus:outline-none transition-colors duration-1000 ${isYellowSection ? 'text-black border-black/30' : 'text-white border-white/30'}`}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className={`block mb-2 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white/80'}`}>Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className={`w-full bg-transparent border-b px-0 py-3 placeholder-white/40 focus:outline-none transition-colors duration-1000 ${isYellowSection ? 'text-black border-black/30' : 'text-white border-white/30'}`}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className={`block mb-2 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white/80'}`}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full bg-transparent border-b px-0 py-3 placeholder-white/40 focus:outline-none transition-colors duration-1000 ${isYellowSection ? 'text-black border-black/30' : 'text-white border-white/30'}`}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className={`block mb-2 transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white/80'}`}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={10}
                                    className={`w-full bg-transparent border-b px-0 py-3 placeholder-white/40 focus:outline-none resize-none transition-colors duration-1000 ${isYellowSection ? 'text-black border-black/30' : 'text-white border-white/30'}`}
                                    placeholder=""
                                />
                            </div>
                            <div className={`text-sm transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-white/60'}`}>
                                <p>
                                    By clicking, you are confirming that you have read, understood and agree to itekako{' '}
                                    <ActionLink onGo404={go404} className={`underline transition-colors duration-1000 ${isYellowSection ? 'text-black' : 'text-[#f3ff65]'}`}>
                                        Privacy policy
                                    </ActionLink>
                                    .
                                </p>
                            </div>
                            {/* <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center justify-center w-10 h-10 border border-white/20 rounded bg-white/5">
                                    <div className="w-6 h-6 border-2 border-white/40 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white/80">I'm not a robot</span>
                                    <div className="flex items-center gap-1 text-xs text-white/60">
                                        <span>reCAPTCHA</span>
                                        <span>Privacy</span>
                                        <span>-</span>
                                        <span>Terms</span>
                                    </div>
                                </div>
                            </div> */}
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go404()
                                }}
                                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-[#00f4ba]/90 transition-colors"
                            >
                                Submit
                            </button>
                        </form>
                </div>
                </section>
                
                <Footer go404={go404} />
            </div>
            
        </main>
    )
}

export default App
