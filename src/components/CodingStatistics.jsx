// src/components/CodingStatistics.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const CodingStatistics = () => {
  const { isDarkMode } = useTheme();
  
  const [codingStats, setCodingStats] = useState({
    heatmap: [],
    productiveHours: [],
    weeklyActivity: [],
    commitPattern: [],
  });

  useEffect(() => {
    fetchCodingStats();
  }, []);

  const fetchCodingStats = async () => {
    try {
      const apiKey = import.meta.env.VITE_WAKATIME_API_KEY;
      
    //   if (!apiKey) {
    //     console.log('WakaTime API key not found, using mock data');
    //     setMockData();
    //     return;
    //   }

      // Fetch last 14 days stats
      const response = await fetch(
        'https://wakatime.com/api/v1/users/current/summaries?range=last_14_days',
        {
          headers: {
            'Authorization': `Basic ${btoa(apiKey)}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch WakaTime stats');

      const data = await response.json();
      console.log('Raw WakaTime data:', data); // Debug log
      processCodingStats(data);
    } catch (error) {
      console.error('Coding stats error:', error);
    //   setMockData();
    }
  };

console.log('Coding stats data:', codingStats); // Debug log
  const processCodingStats = (data) => {
    console.log('Processing WakaTime data:', data); // Debug log
    // Process heatmap data (hours per day)
    const heatmap = data.data.map(day => ({
      date: new Date(day.range.date).toLocaleDateString('en-US', { weekday: 'short' }),
      hours: Math.round((day.grand_total.total_seconds / 3600) * 10) / 10,
      intensity: Math.min((day.grand_total.total_seconds / 3600 / 8) * 100, 100),
    }));

    // Process productive hours (0-23)
    const hourlyData = Array(24).fill(0);
    data.data.forEach(day => {
      day.projects.forEach(project => {
        // Approximate hour distribution (simplified)
        const hour = new Date(day.range.date).getHours();
        hourlyData[hour] += project.total_seconds / 3600;
      });
    });

    const productiveHours = hourlyData.map((hours, index) => ({
      hour: index,
      label: `${index.toString().padStart(2, '0')}:00`,
      hours: Math.round(hours * 10) / 10,
      intensity: Math.min((hours / 2) * 100, 100),
    })).filter(h => h.hours > 0);

    setCodingStats({
      heatmap,
      productiveHours,
    });
  };

  const setMockData = () => {
    // Mock data untuk development/demo
    const mockHeatmap = [
      { date: 'Mon', hours: 6.5, intensity: 81 },
      { date: 'Tue', hours: 7.2, intensity: 90 },
      { date: 'Wed', hours: 5.8, intensity: 73 },
      { date: 'Thu', hours: 8.1, intensity: 100 },
      { date: 'Fri', hours: 6.9, intensity: 86 },
      { date: 'Sat', hours: 3.2, intensity: 40 },
      { date: 'Sun', hours: 2.5, intensity: 31 },
    ];

    const mockProductiveHours = [
      { hour: 8, label: '08:00', hours: 1.2, intensity: 60 },
      { hour: 9, label: '09:00', hours: 2.5, intensity: 100 },
      { hour: 10, label: '10:00', hours: 2.3, intensity: 92 },
      { hour: 11, label: '11:00', hours: 1.8, intensity: 72 },
      { hour: 13, label: '13:00', hours: 1.5, intensity: 60 },
      { hour: 14, label: '14:00', hours: 2.1, intensity: 84 },
      { hour: 15, label: '15:00', hours: 2.4, intensity: 96 },
      { hour: 16, label: '16:00', hours: 1.9, intensity: 76 },
      { hour: 20, label: '20:00', hours: 1.3, intensity: 52 },
      { hour: 21, label: '21:00', hours: 1.7, intensity: 68 },
    ];

    setCodingStats({
      heatmap: mockHeatmap,
      productiveHours: mockProductiveHours,
    });
  };

  const getIntensityColor = (intensity) => {
    if (intensity >= 80) return 'bg-green-500';
    if (intensity >= 60) return 'bg-green-400';
    if (intensity >= 40) return 'bg-yellow-400';
    if (intensity >= 20) return 'bg-orange-400';
    return 'bg-gray-400';
  };

  const getMostProductiveTime = () => {
    if (codingStats.productiveHours.length === 0) return 'N/A';
    
    const sorted = [...codingStats.productiveHours].sort((a, b) => b.hours - a.hours);
    const topHour = sorted[0];
    
    return `${topHour.label} (${topHour.hours}h)`;
  };

  const getTotalWeeklyHours = () => {
    return codingStats.heatmap.reduce((sum, day) => sum + day.hours, 0).toFixed(1);
  };

  const getAverageDailyHours = () => {
    if (codingStats.heatmap.length === 0) return '0';
    return (codingStats.heatmap.reduce((sum, day) => sum + day.hours, 0) / codingStats.heatmap.length).toFixed(1);
  };

  return (
    <div className={`rounded-2xl p-6 border ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-clock text-white text-xl"></i>
        </div>
        <div>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Live Coding Statistics
          </h2>
          <p className="text-sm text-gray-400">Real-time coding activity</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className="text-2xl font-bold text-purple-500">
            {getTotalWeeklyHours()}h
          </p>
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            This Week
          </p>
        </div>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className="text-2xl font-bold text-blue-500">
            {getAverageDailyHours()}h
          </p>
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Daily Avg
          </p>
        </div>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className="text-sm font-bold text-green-500">
            {getMostProductiveTime()}
          </p>
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Peak Hour
          </p>
        </div>
      </div>

      {/* Weekly Heatmap */}
      <div className="mb-6">
        <h3 className={`text-sm font-semibold mb-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Weekly Activity
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {codingStats.heatmap.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-full h-20 rounded-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer ${
                  getIntensityColor(day.intensity)
                }`}
                title={`${day.date}: ${day.hours}h`}
              >
                <span className="text-white font-bold text-sm">
                  {day.hours}h
                </span>
              </div>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {day.date}
              </span>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Less
          </span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            More
          </span>
        </div>
      </div>

      {/* Productive Hours */}
      <div>
        <h3 className={`text-sm font-semibold mb-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Most Productive Hours
        </h3>
        <div className="space-y-2">
          {codingStats.productiveHours.slice(0, 10).map((hour, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className={`text-xs font-medium w-12 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {hour.label}
              </span>
              <div className={`flex-1 h-6 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${hour.intensity}%` }}
                >
                  {hour.intensity > 30 && (
                    <span className="text-white text-xs font-semibold">
                      {hour.hours}h
                    </span>
                  )}
                </div>
              </div>
              {hour.intensity <= 30 && (
                <span className={`text-xs font-semibold w-12 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {hour.hours}h
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className={`mt-6 pt-4 border-t text-xs text-center ${
        isDarkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'
      }`}>
        <i className="fas fa-info-circle mr-1"></i>
        Data updated from WakaTime
      </div>
    </div>
  );
};

export default CodingStatistics;