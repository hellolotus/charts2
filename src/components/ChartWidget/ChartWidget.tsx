import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
	widget,
	ChartingLibraryWidgetOptions,
	ResolutionString,
	IChartingLibraryWidget,
} from '../../charting_library';
import BinanceDatafeed from '../../datafeed/BinanceDatafeed';
import './ChartWidget.css';

export interface ChartWidgetProps {
	symbol: string;
	interval?: ResolutionString;
	theme?: 'light' | 'dark';
	onSymbolChange?: (symbol: string) => void;
}

export const ChartWidget = ({ 
	symbol, 
	interval = '1' as ResolutionString,
	theme = 'dark',
	onSymbolChange 
}: ChartWidgetProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const widgetRef = useRef<IChartingLibraryWidget | null>(null);

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: symbol,
			datafeed: new BinanceDatafeed(),
			interval: interval,
			container: chartContainerRef.current,
			library_path: process.env.PUBLIC_URL + '/charting_library/',
			locale: 'en',
			disabled_features: [
				'use_localstorage_for_settings',
				'header_symbol_search',
				'symbol_search_hot_key',
			],
			enabled_features: [
				'study_templates',
				'side_toolbar_in_fullscreen_mode',
			],
			fullscreen: false,
			autosize: true,
			theme: theme,
			custom_css_url: process.env.PUBLIC_URL + '/custom.css',
			overrides: {
				'mainSeriesProperties.candleStyle.upColor': '#26a69a',
				'mainSeriesProperties.candleStyle.downColor': '#ef5350',
				'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
				'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350',
				'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
				'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350',
			},
		};

		const tvWidget = new widget(widgetOptions);
		widgetRef.current = tvWidget;

		tvWidget.onChartReady(() => {
			// Subscribe to symbol changes
			tvWidget.activeChart().onSymbolChanged().subscribe(null, () => {
				const newSymbol = tvWidget.activeChart().symbol();
				if (onSymbolChange) {
					onSymbolChange(newSymbol);
				}
			});
		});

		return () => {
			if (widgetRef.current) {
				widgetRef.current.remove();
				widgetRef.current = null;
			}
		};
	}, []);

	// Update symbol when prop changes
	useEffect(() => {
		if (widgetRef.current) {
			widgetRef.current.onChartReady(() => {
				widgetRef.current?.activeChart().setSymbol(symbol, () => {
					console.log('Symbol changed to:', symbol);
				});
			});
		}
	}, [symbol]);

	return (
		<div 
			ref={chartContainerRef} 
			className="chart-widget-container"
		/>
	);
};
