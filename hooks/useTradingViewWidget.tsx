import { useEffect, useRef,} from "react";

const useTradingViewWidget = (scriptURL: string, config: Record<string, unknown>, height = 600) => {
   const containerRef = useRef<HTMLDivElement | null>(null);
   
   useEffect(
    if(!containerRef.current) return;
    if(containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`
       () => {
         const script = document.createElement("script");
         script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
         script.type = "text/javascript";
         script.async = true;
         script.innerHTML = ``;
         container.current.appendChild(script);
       },
       []
     );

   return containerRef;
}

export default useTradingViewWidget