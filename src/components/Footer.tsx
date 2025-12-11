import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa6'
import { ActionLink } from './ActionLink'

interface FooterProps {
  go404: () => void
}

export default function Footer({ go404 }: FooterProps) {
  return (
    <footer className="dark-section border-t border-white/10">
      <div className="section-shell">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className='h-full flex max-[500px]:flex-col max-[500px]:items-start lg:flex-col flex-row lg:items-start items-center mb-20 lg:mb-0 justify-between col-span-2 lg:col-span-1'>
            <div className='max-w-[100px] object-contain'>
                <svg width="100%" height="100%" viewBox="0 0 118 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.0189322H5.13413V24.6687H0V0.0189322ZM16.6765 2.38546V7.46876H21.2727V11.4256H16.6765V18.2223C16.6765 19.8978 17.5636 20.6835 19.0925 20.6835H21.2727V24.6782H18.4508C14.5058 24.6782 11.9482 22.4252 11.9482 18.4305V11.4351H8.64497V7.47823H11.9482V2.38546H16.6765ZM40.8371 18.8944C40.1576 22.6145 36.8921 25 32.6734 25C26.8504 25 23.8586 20.4279 23.8586 16.0924C23.8586 11.7569 26.5106 7.25104 32.3337 7.25104C38.3927 7.25104 40.8088 11.719 40.8088 15.6475C40.8088 16.3006 40.771 16.8118 40.7427 17.181H28.4265C28.7662 19.6043 30.2951 21.1094 32.6829 21.1094C34.5893 21.1094 35.8445 20.3616 36.222 18.8944H40.8465H40.8371ZM28.4831 14.1802H36.071C35.9389 12.2681 34.6082 10.7346 32.3242 10.7346C30.1819 10.7346 28.8889 11.7948 28.4831 14.1802ZM50.8694 17.3987L48.963 19.273V24.6687H44.1969V0H48.963V13.3472L54.9182 7.47823H60.9111L54.0688 14.237L61.4491 24.6782H55.7298L50.86 17.4082L50.8694 17.3987ZM77.8613 13.6123V24.6687H73.1613V22.2832C72.5856 23.883 70.6792 24.9432 68.3292 24.9432C64.9977 24.9432 62.7137 22.7281 62.7137 19.7936C62.7137 16.4142 65.2336 14.3696 68.971 14.3696H71.8684C72.7178 14.3696 73.1613 13.8205 73.1613 13.1106C73.1613 11.6812 72.0382 10.6872 70.0941 10.6872C68.0178 10.6872 66.9607 11.9841 66.8947 13.4135H62.676C62.8836 9.96782 65.6678 7.20371 70.3678 7.20371C74.6902 7.20371 77.8519 9.73116 77.8519 13.6217L77.8613 13.6123ZM73.1613 17.607V17.3703H69.6882C68.2631 17.3703 67.2344 18.2601 67.2344 19.5854C67.2344 20.7119 68.1876 21.4975 69.5184 21.4975C71.8306 21.4975 73.1613 19.7936 73.1613 17.607ZM88.3183 17.3987L86.4119 19.273V24.6687H81.6458V0H86.4119V13.3472L92.3671 7.47823H98.3601L91.5177 14.237L98.898 24.6782H93.1788L88.3089 17.4082L88.3183 17.3987ZM99.8984 16.064C99.8984 10.9428 103.674 7.19424 108.949 7.19424C114.225 7.19424 118 10.9523 118 16.064C118 21.1852 114.225 24.9337 108.949 24.9337C103.674 24.9337 99.8984 21.1757 99.8984 16.064ZM113.234 16.064C113.234 13.1958 111.497 11.2552 108.949 11.2552C106.401 11.2552 104.664 13.2052 104.664 16.064C104.664 18.8944 106.401 20.8444 108.949 20.8444C111.497 20.8444 113.234 18.8944 113.234 16.064Z" fill="currentColor"></path>
                </svg>
            </div>
            <p className="text-sm text-white max-[500px]:mb-20">
              © 2025 Itekako, All Rights Reserved.<br />
              Belgrade, Serbia, Masarikova 5; +381114078146
            </p>
          </div>
          <div className='col-span-1 max-[500px]:col-span-2'>
            <p className="text-sm  text-white/50 mb-3 tracking-wider">Services</p>
            <ul className="space-y-3">
              {['Custom software development', 'DevOps and Migrations', 'Software testing and QA', 'Consulting', 'Building digital products end-to-end'].map((service) => (
                <li key={service} className="footer-link-item">
                  <ActionLink onGo404={go404} className="text-sm text-white text-left footer-link">
                    <span className="footer-link-text" data-text={service}>{service}</span>
                    <span className="footer-link-arrow">→</span>
                  </ActionLink>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 max-[500px]:col-span-2'>
            {/* <p className="text-sm text-white mb-3 tracking-wider"></p> */}
            <ul className="space-y-3">
              {["Client stories", 'Ai-Hub', 'Careers', 'About us', 'Blog', 'Contact', 'Privacy and Cookie policy'].map((item) => (
                <li key={item} className="footer-link-item">
                  <ActionLink onGo404={go404} className="text-sm text-white text-left footer-link">
                    <span className="footer-link-text" data-text={item}>{item}</span>
                    <span className="footer-link-arrow">→</span>
                  </ActionLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full flex flex-col md:flex-row justify-between lg:items-end col-span-2 lg:col-span-1">
            <div className="flex gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); go404(); }} className="w-10 h-10 flex items-center justify-center text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="text-3xl" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); go404(); }} className="w-10 h-10 flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); go404(); }} className="w-10 h-10 flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                <FaFacebook className="text-3xl" />
              </a>
              {/* <a href="#" onClick={(e) => { e.preventDefault(); go404(); }} className="w-10 h-10 flex items-center justify-center text-white transition-colors" aria-label="Clutch">
                <span className="text-sm font-semibold">C</span>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); go404(); }} className="w-10 h-10 flex items-center justify-center text-white transition-colors" aria-label="Joberty">
                <span className="text-sm font-semibold">J</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

