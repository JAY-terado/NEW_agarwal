import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Building2, Users, ShieldCheck } from 'lucide-react';

export default function Sitemap() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sitemapData = [
    {
      title: 'Main Pages',
      icon: <Compass className="w-6 h-6 text-brass" strokeWidth={1.5} />,
      links: [
        { label: 'Home', to: '/' },
        { label: 'About Us', to: '/about-us' },
        { label: 'Ongoing Projects', to: '/#projects' },
        { label: 'Completed Projects', to: '/completed-projects' },
        { label: 'Blogs', to: '/blogs' },
        { label: 'Careers', to: '/careers' },
        { label: 'Contact Us', to: '/#contact' },
      ],
    },
    {
      title: 'Our Projects',
      icon: <Building2 className="w-6 h-6 text-brass" strokeWidth={1.5} />,
      links: [
        { label: 'Agarwal Infinity', to: '/projects/infinity' },
        { label: 'Agarwal Sky Heights', to: '/projects/sky-heights' },
        { label: 'Agarwal Skyrise', to: '/projects/skyrise' },
        { label: 'Agarwal Horizon', to: '/projects/horizon', disabled: true },
      ],
    },
    {
      title: 'Partners & Customers',
      icon: <Users className="w-6 h-6 text-brass" strokeWidth={1.5} />,
      links: [
        { label: 'Channel Partner', to: '/channel-partner' },
        { label: 'Channel Partner Registration', to: '/channel-partner-registration' },
        { label: 'Channel Partner FAQs', to: '/channel-partner-faqs' },
        { label: 'Customer Registration', to: '/customer-registration' },
      ],
    },
    {
      title: 'Legal & Support',
      icon: <ShieldCheck className="w-6 h-6 text-brass" strokeWidth={1.5} />,
      links: [
        { label: 'FAQs', to: '/faqs' },
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms & Conditions', to: '/terms-conditions' },
        { label: 'Disclaimer', to: '/disclaimer' },
      ],
    },
  ];

  return (
    <div className="bg-ivory text-ink min-h-screen pt-32 pb-24">
      <div className="wrap-widescreen max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-12">
          <span className="eyebrow block mb-3 text-brass-deep">Overview</span>
          <h1 className="font-serif text-5xl sm:text-6xl text-pine tracking-tight">
            Sitemap
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sitemapData.map((section, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-8 md:p-10 rounded-2xl border border-line shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Decorative background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brass opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brass-bright to-brass opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex items-center gap-4 mb-8 pb-6 border-b border-line-light">
                <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center border border-line-light group-hover:border-brass transition-colors duration-300">
                  {section.icon}
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-pine tracking-wide">
                  {section.title}
                </h2>
              </div>

              <ul className="relative z-10 flex flex-col gap-4">
                {section.links.map((link, i) => (
                  <li key={i} className="flex items-center">
                    {link.disabled ? (
                      <div className="flex items-center w-full justify-between">
                        <span className="text-ink-soft opacity-50 text-[0.95rem] tracking-wide font-light cursor-default flex items-center">
                          <span className="w-1.5 h-1.5 bg-line rounded-full mr-4"></span>
                          {link.label}
                        </span>
                        <span className="text-[0.65rem] px-2 py-1 uppercase tracking-widest text-brass-deep border border-brass-deep/30 rounded-full opacity-60">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={link.to}
                        onClick={(e) => {
                          if (link.to.includes('#')) {
                            const id = link.to.split('#')[1];
                            const el = document.getElementById(id);
                            if (el) {
                              e.preventDefault();
                              if (window.location.pathname !== '/') {
                                window.location.href = link.to;
                              } else {
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                          } else {
                            window.scrollTo(0, 0);
                          }
                        }}
                        className="w-full text-ink-soft hover:text-pine transition-colors duration-300 text-[0.95rem] tracking-wide font-light flex items-center justify-between group/link"
                      >
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-line rounded-full mr-4 group-hover/link:bg-brass-bright group-hover/link:scale-150 transition-all duration-300"></span>
                          {link.label}
                        </span>
                        <span className="text-brass-bright opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-sm">
                          →
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
