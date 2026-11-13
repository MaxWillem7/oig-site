/**
 * Feedbacklaag van Digital Dudes (uitleg: docs/feedbacklaag.md in de repo dd-app).
 *
 * Met dit stukje in de <head> kan wie van Digital Dudes een geheime feedbacklink kreeg (?feedback=...)
 * op elke pagina een speld met een opmerking plaatsen. Gewone bezoekers merken er niets van: zonder die
 * link haalt het niets op en bewaart het niets. Er staat geen sleutel in; die zit in de link zelf.
 */
export const FEEDBACKLAAG =
  "(function(){try{var k=new URLSearchParams(location.search).get('feedback');if(k)localStorage.setItem('dd-feedback',k);k=localStorage.getItem('dd-feedback');if(!k)return;var s=document.createElement('script');s.src='https://app.digitaldudes.nl/feedback/widget.js';s.async=true;s.dataset.sleutel=k;document.head.appendChild(s)}catch(e){}})()"
