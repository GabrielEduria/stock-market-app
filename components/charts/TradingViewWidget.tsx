'use client';


import React, { useEffect, useRef, memo } from 'react';
import useTradingViewWidget from '@/hooks/useTradingViewWidget';


interface TradingViewWidgetProps {
  title?: string;
  scriptURL: string;
  config: Record<string, unknown>
  height?: number;
  className?: string;
}

function TradingViewWidget({ title, scriptURL, config, height = 600, className }: TradingViewWidgetProps) {
  const container = useTradingViewWidget( scriptURL, config, height );



  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(TradingViewWidget);
