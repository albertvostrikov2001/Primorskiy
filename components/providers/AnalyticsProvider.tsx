'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { company } from '@/config/company'
import { persistUtmParams } from '@/lib/analytics'

export default function AnalyticsProvider() {
  useEffect(() => {
    persistUtmParams()
  }, [])

  return (
    <>
      {/* Яндекс Метрика */}
      {company.analyticsYM && (
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${company.analyticsYM}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:false
              });
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {company.analyticsGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${company.analyticsGA}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${company.analyticsGA}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}
    </>
  )
}
