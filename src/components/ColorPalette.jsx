import React, { useState } from 'react'

const ColorPalette = ({ palette, onColorSelect, selectedColors }) => {
  const [copiedColor, setCopiedColor] = useState(null)

  const copyToClipboard = async (text, colorName) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedColor(colorName)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const isColorSelected = (color) => {
    return selectedColors.some(selected => selected.hex === color.hex)
  }

  const getContrastTextColor = (hexColor) => {
    // Simple contrast calculation for text color
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  if (!palette || palette.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-3">🎨</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Color Palette</h2>
            <p className="text-sm text-gray-600">Your generated colors will appear here</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-gray-500 mb-4">
            Generate a color palette using the AI Color Suggester to get started
          </p>
          <div className="text-sm text-gray-400">
            Click on colors to select them for accessibility testing
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-3xl mr-3">🎨</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Color Palette</h2>
            <p className="text-sm text-gray-600">
              {palette.length} colors generated
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {selectedColors.length} selected
        </div>
      </div>

      <div className="space-y-4">
        {palette.map((color, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              isColorSelected(color)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Color Swatch */}
              <div
                className="color-swatch relative group"
                style={{ backgroundColor: color.hex }}
                onClick={() => onColorSelect(color)}
              >
                {isColorSelected(color) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Copy tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to select
                </div>
              </div>

              {/* Color Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{color.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(color.hex, color.name)}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copiedColor === color.name ? 'Copied!' : 'Copy HEX'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">HEX:</span>
                    <span className="ml-1 font-mono">{color.hex}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">HSL:</span>
                    <span className="ml-1 font-mono">
                      {color.hsl[0]}°, {color.hsl[1]}%, {color.hsl[2]}%
                    </span>
                  </div>
                </div>

                {/* Contrast Ratio */}
                {color.contrast && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Contrast (vs white):</span>
                    <span className={`ml-1 text-xs font-medium ${
                      color.contrast >= 4.5 ? 'text-green-600' : 
                      color.contrast >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {color.contrast.toFixed(2)}:1
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Palette Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const allHex = palette.map(c => c.hex).join('\n')
              copyToClipboard(allHex, 'palette')
            }}
            className="btn-secondary text-sm"
          >
            Copy All HEX
          </button>
          <button
            onClick={() => {
              const allCSS = palette.map(c => `--${c.name.toLowerCase().replace(/\s+/g, '-')}: ${c.hex};`).join('\n')
              copyToClipboard(allCSS, 'css')
            }}
            className="btn-secondary text-sm"
          >
            Copy CSS Variables
          </button>
        </div>
      </div>

      {/* Selection Info */}
      {selectedColors.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>{selectedColors.length}</strong> color{selectedColors.length !== 1 ? 's' : ''} selected for accessibility testing
          </p>
        </div>
      )}
    </div>
  )
}

export default ColorPalette
