import React, { useState } from 'react'
import Color from 'color'

const AIColorSuggester = ({ onPaletteGenerated }) => {
  const [theme, setTheme] = useState('modern')
  const [mood, setMood] = useState('professional')
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock AI color generation - can be replaced with OpenAI API calls
  const generatePalette = async () => {
    setIsGenerating(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const palettes = {
      modern: {
        professional: [
          { name: 'Deep Blue', hex: '#1e3a8a', hsl: [217, 91, 33] },
          { name: 'Slate Gray', hex: '#475569', hsl: [215, 25, 27] },
          { name: 'Cool White', hex: '#f8fafc', hsl: [210, 40, 98] },
          { name: 'Accent Blue', hex: '#3b82f6', hsl: [217, 91, 60] },
          { name: 'Light Gray', hex: '#e2e8f0', hsl: [214, 32, 91] }
        ],
        creative: [
          { name: 'Vibrant Purple', hex: '#7c3aed', hsl: [262, 83, 58] },
          { name: 'Electric Blue', hex: '#06b6d4', hsl: [187, 95, 43] },
          { name: 'Neon Green', hex: '#10b981', hsl: [160, 84, 39] },
          { name: 'Hot Pink', hex: '#ec4899', hsl: [330, 81, 60] },
          { name: 'Sunny Yellow', hex: '#f59e0b', hsl: [43, 96, 53] }
        ],
        calm: [
          { name: 'Sage Green', hex: '#6b7280', hsl: [220, 9, 46] },
          { name: 'Soft Blue', hex: '#93c5fd', hsl: [217, 91, 68] },
          { name: 'Warm Beige', hex: '#f3f4f6', hsl: [220, 14, 96] },
          { name: 'Muted Teal', hex: '#5eead4', hsl: [168, 76, 78] },
          { name: 'Dusty Rose', hex: '#fecaca', hsl: [0, 100, 88] }
        ]
      },
      warm: {
        professional: [
          { name: 'Rich Brown', hex: '#92400e', hsl: [25, 83, 31] },
          { name: 'Warm Gray', hex: '#6b7280', hsl: [220, 9, 46] },
          { name: 'Cream', hex: '#fef3c7', hsl: [48, 96, 89] },
          { name: 'Terracotta', hex: '#dc2626', hsl: [0, 84, 60] },
          { name: 'Golden', hex: '#d97706', hsl: [32, 95, 44] }
        ],
        creative: [
          { name: 'Sunset Orange', hex: '#ea580c', hsl: [25, 90, 48] },
          { name: 'Golden Yellow', hex: '#fbbf24', hsl: [43, 96, 56] },
          { name: 'Coral Pink', hex: '#fb7185', hsl: [351, 96, 70] },
          { name: 'Warm Red', hex: '#dc2626', hsl: [0, 84, 60] },
          { name: 'Peach', hex: '#fed7aa', hsl: [39, 100, 83] }
        ],
        calm: [
          { name: 'Soft Peach', hex: '#fed7aa', hsl: [39, 100, 83] },
          { name: 'Warm Beige', hex: '#f5f5f4', hsl: [60, 9, 96] },
          { name: 'Muted Orange', hex: '#fb923c', hsl: [24, 94, 58] },
          { name: 'Dusty Pink', hex: '#fecaca', hsl: [0, 100, 88] },
          { name: 'Cream', hex: '#fef3c7', hsl: [48, 96, 89] }
        ]
      },
      cool: {
        professional: [
          { name: 'Navy Blue', hex: '#1e40af', hsl: [221, 83, 53] },
          { name: 'Cool Gray', hex: '#6b7280', hsl: [220, 9, 46] },
          { name: 'Ice White', hex: '#f8fafc', hsl: [210, 40, 98] },
          { name: 'Steel Blue', hex: '#64748b', hsl: [217, 33, 49] },
          { name: 'Light Blue', hex: '#dbeafe', hsl: [214, 100, 94] }
        ],
        creative: [
          { name: 'Electric Blue', hex: '#06b6d4', hsl: [187, 95, 43] },
          { name: 'Vibrant Cyan', hex: '#0891b2', hsl: [187, 95, 37] },
          { name: 'Neon Green', hex: '#10b981', hsl: [160, 84, 39] },
          { name: 'Purple', hex: '#8b5cf6', hsl: [262, 83, 58] },
          { name: 'Teal', hex: '#14b8a6', hsl: [173, 80, 36] }
        ],
        calm: [
          { name: 'Soft Blue', hex: '#93c5fd', hsl: [217, 91, 68] },
          { name: 'Mint Green', hex: '#a7f3d0', hsl: [160, 84, 39] },
          { name: 'Lavender', hex: '#c4b5fd', hsl: [262, 83, 58] },
          { name: 'Sky Blue', hex: '#bae6fd', hsl: [199, 98, 66] },
          { name: 'Cool Gray', hex: '#e5e7eb', hsl: [220, 13, 91] }
        ]
      }
    }

    const selectedPalette = palettes[theme][mood]
    const paletteWithContrast = selectedPalette.map(color => ({
      ...color,
      contrast: calculateContrast(color.hex, '#ffffff')
    }))

    onPaletteGenerated(paletteWithContrast)
    setIsGenerating(false)
  }

  const calculateContrast = (hexColor, backgroundHex) => {
    try {
      const color = Color(hexColor)
      const background = Color(backgroundHex)
      return color.contrast(background)
    } catch (error) {
      return 1
    }
  }

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <div className="text-3xl mr-3">🧠</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Color Suggester</h2>
          <p className="text-sm text-gray-600">Generate palettes with AI assistance</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Design Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="modern">Modern</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
          </select>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mood/Vibe
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="calm">Calm</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePalette}
          disabled={isGenerating}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </div>
          ) : (
            'Generate Palette'
          )}
        </button>
      </div>

      {/* Theme Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Selection:</h3>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
          <span className="text-gray-400">•</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </span>
        </div>
      </div>

      {/* AI Features Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">🤖 AI Features</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Smart color harmony algorithms</li>
          <li>• Brand consistency analysis</li>
          <li>• Accessibility-aware suggestions</li>
          <li>• Ready for OpenAI integration</li>
        </ul>
      </div>
    </div>
  )
}

export default AIColorSuggester
