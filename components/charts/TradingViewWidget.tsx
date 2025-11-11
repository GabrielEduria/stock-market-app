'use client';


import React, { useEffect, useRef, memo } from 'react';
import useTradingViewWidget from '@/hooks/useTradingViewWidget';


interface TradingViewWidgetProps {
  title?: string;
  scriptrl: string;
  config: Record<string, unknown>
  height?: number;
  className?: string;
}

function TradingViewWidget({title, scriptURL, config, height = 600, className }: TradingViewWidgetProps) {
  const container = useTradingViewWidget();

  useEffect(
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

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(TradingViewWidget);
