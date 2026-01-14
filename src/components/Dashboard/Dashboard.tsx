import * as React from 'react';
import { useState } from 'react';
import { ChartWidget } from '../ChartWidget/ChartWidget';
import { Watchlist } from '../Watchlist/Watchlist';
import { version } from '../../charting_library';
import './Dashboard.css';

export const Dashboard = () => {
	const [primarySymbol, setPrimarySymbol] = useState('NEOUSDT');
	const [secondarySymbol, setSecondarySymbol] = useState('BTCUSDT');
	const [viewMode, setViewMode] = useState<'single' | 'split'>('split');

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<div className="header-content">
					<h1 className="dashboard-title">
						<span className="title-icon">📈</span>
						NEO Crypto Charts
					</h1>
					<a 
						href="https://congdinh.github.io/charts" 
						target="_blank" 
						rel="noopener noreferrer"
						className="buzz-charts-link"
						title="Visit Buzz Charts"
					>
						🔥 Buzz Charts
					</a>
					<div className="header-controls">
						<div className="view-toggle">
							<button
								className={`toggle-btn ${viewMode === 'single' ? 'active' : ''}`}
								onClick={() => setViewMode('single')}
								title="Single chart view"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="3" width="18" height="18" rx="2"/>
								</svg>
							</button>
							<button
								className={`toggle-btn ${viewMode === 'split' ? 'active' : ''}`}
								onClick={() => setViewMode('split')}
								title="Split view"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="3" width="7" height="18" rx="2"/>
									<rect x="14" y="3" width="7" height="18" rx="2"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="dashboard-content">
				<aside className="sidebar">
					<Watchlist 
						onSymbolSelect={setPrimarySymbol}
						currentSymbol={primarySymbol}
					/>
				</aside>

				<main className="main-content">
					<div className={`charts-container ${viewMode}`}>
						<div className="chart-panel primary">
							<div className="chart-header">
								<h3 className="chart-title">{primarySymbol.replace('USDT', '/USDT')}</h3>
								<div className="chart-actions">
									<select 
										className="symbol-select"
										value={primarySymbol}
										onChange={(e) => setPrimarySymbol(e.target.value)}
									>
										<option value="BTCUSDT">BTC/USDT</option>
										<option value="ETHUSDT">ETH/USDT</option>
										<option value="BNBUSDT">BNB/USDT</option>
										<option value="ADAUSDT">ADA/USDT</option>
										<option value="SOLUSDT">SOL/USDT</option>
										<option value="XRPUSDT">XRP/USDT</option>
										<option value="DOGEUSDT">DOGE/USDT</option>
										<option value="MATICUSDT">MATIC/USDT</option>
										<option value="NEOUSDT">NEO/USDT</option>
									</select>
								</div>
							</div>
							<div className="chart-wrapper">
								<ChartWidget 
									symbol={primarySymbol}
									theme="dark"
									onSymbolChange={setPrimarySymbol}
								/>
							</div>
						</div>

						{viewMode === 'split' && (
							<div className="chart-panel secondary">
								<div className="chart-header">
									<h3 className="chart-title">{secondarySymbol.replace('USDT', '/USDT')}</h3>
									<div className="chart-actions">
										<select 
											className="symbol-select"
											value={secondarySymbol}
											onChange={(e) => setSecondarySymbol(e.target.value)}
										>
											<option value="BTCUSDT">BTC/USDT</option>
											<option value="ETHUSDT">ETH/USDT</option>
											<option value="BNBUSDT">BNB/USDT</option>
											<option value="ADAUSDT">ADA/USDT</option>
											<option value="SOLUSDT">SOL/USDT</option>
											<option value="XRPUSDT">XRP/USDT</option>
											<option value="DOGEUSDT">DOGE/USDT</option>
											<option value="MATICUSDT">MATIC/USDT</option>
											<option value="NEOUSDT">NEO/USDT</option>
										</select>
									</div>
								</div>
								<div className="chart-wrapper">
									<ChartWidget 
										symbol={secondarySymbol}
										theme="dark"
										onSymbolChange={setSecondarySymbol}
									/>
								</div>
							</div>
						)}
					</div>
				</main>
			</div>

			<footer className="dashboard-footer">
				<p>
					Data provided by <strong>Binance API</strong> • 
					Powered by <strong>TradingView Charting Library {version()}</strong>
				</p>
			</footer>
		</div>
	);
};
