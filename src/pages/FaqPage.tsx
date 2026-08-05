import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { homeFaqs } from '../data/faqs';
import { motion } from 'framer-motion';

export default function FaqPage() {
  const location = useLocation();
  const { faqs = homeFaqs, title = "Questions, Answered", subtitle = "Frequently Asked Questions About Agarwal Group" } = location.state || {};
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section className="section faq pt-32 pb-24" style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh' }}>
      <div className="wrap-widescreen">
        <div className="section-head mb-16">
          <span className="eyebrow">FAQ</span>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl mb-4" dangerouslySetInnerHTML={{ __html: title.replace('Answered', '<em>Answered</em>') }} />
          <p className="text-gray-600 max-w-2xl">{subtitle}</p>
        </div>

        <motion.div
          className="faq-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((item: { q: string; a: string }, idx: number) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen ? "true" : "false"}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-ic" aria-hidden="true"></span>
                </button>
                <div
                  className="faq-a"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    overflowY: isOpen ? 'auto' : 'hidden',
                    transition: 'max-height .45s var(--ease)',
                  }}
                >
                  <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
