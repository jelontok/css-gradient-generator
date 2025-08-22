class GradientGenerator {
    constructor() {
        this.gradientType = document.getElementById('gradientType');
        this.direction = document.getElementById('direction');
        this.directionContainer = document.getElementById('directionContainer');
        this.colorStops = document.getElementById('colorStops');
        this.addColorBtn = document.getElementById('addColor');
        this.gradientPreview = document.getElementById('gradientPreview');
        this.cssOutput = document.getElementById('cssOutput');
        this.copyBtn = document.getElementById('copyBtn');
        this.presetBtns = document.querySelectorAll('.preset-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateGradient();
    }
    
    bindEvents() {
        // Gradient type change
        this.gradientType.addEventListener('change', () => {
            this.toggleDirectionVisibility();
            this.updateGradient();
        });
        
        // Direction change
        this.direction.addEventListener('change', () => {
            this.updateGradient();
        });
        
        // Add color button
        this.addColorBtn.addEventListener('click', () => {
            this.addColorStop();
        });
        
        // Copy button
        this.copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });
        
        // Preset buttons
        this.presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyPreset(btn.dataset.gradient);
            });
        });
        
        // Initial color stop events
        this.bindColorStopEvents();
    }
    
    bindColorStopEvents() {
        const colorInputs = this.colorStops.querySelectorAll('.color-input');
        const positionSliders = this.colorStops.querySelectorAll('.position-slider');
        const opacitySliders = this.colorStops.querySelectorAll('.opacity-slider');
        const removeButtons = this.colorStops.querySelectorAll('.remove-color');
        
        colorInputs.forEach(input => {
            input.addEventListener('input', () => this.updateGradient());
        });
        
        positionSliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const colorStop = e.target.closest('.color-stop');
                const display = colorStop.querySelector('.position-display');
                display.textContent = e.target.value + '%';
                this.updateGradient();
            });
        });
        
        opacitySliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const colorStop = e.target.closest('.color-stop');
                const display = colorStop.querySelector('.opacity-display');
                display.textContent = e.target.value + '%';
                this.updateGradient();
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeColorStop(e.target);
            });
        });
    }
    
    toggleDirectionVisibility() {
        if (this.gradientType.value === 'radial') {
            this.directionContainer.style.display = 'none';
        } else {
            this.directionContainer.style.display = 'block';
        }
    }
    
    addColorStop() {
        const colorStopDiv = document.createElement('div');
        colorStopDiv.className = 'color-stop flex items-center mb-3';
        
        const randomColor = this.getRandomColor();
        const randomPosition = Math.floor(Math.random() * 101);
        
        colorStopDiv.innerHTML = `
            <input type="color" value="${randomColor}" class="color-input w-12 h-12 rounded border-2 border-gray-300 cursor-pointer">
            <div class="flex-1 mx-3">
                <div class="text-xs text-gray-500 mb-1">Position</div>
                <input type="range" min="0" max="100" value="${randomPosition}" class="position-slider w-full mb-1">
                <div class="text-xs text-gray-500 mb-1">Opacity</div>
                <input type="range" min="0" max="100" value="100" class="opacity-slider w-full">
            </div>
            <div class="w-16 text-sm text-gray-600">
                <div class="position-display">${randomPosition}%</div>
                <div class="opacity-display text-xs">100%</div>
            </div>
            <button class="remove-color ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">×</button>
        `;
        
        this.colorStops.appendChild(colorStopDiv);
        this.bindColorStopEvents();
        this.updateRemoveButtons();
        this.updateGradient();
    }
    
    removeColorStop(button) {
        const colorStop = button.closest('.color-stop');
        colorStop.remove();
        this.updateRemoveButtons();
        this.updateGradient();
    }
    
    updateRemoveButtons() {
        const removeButtons = this.colorStops.querySelectorAll('.remove-color');
        removeButtons.forEach((button, index) => {
            button.disabled = removeButtons.length <= 2;
        });
    }
    
    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    getColorStops() {
        const stops = [];
        const colorStopElements = this.colorStops.querySelectorAll('.color-stop');
        
        colorStopElements.forEach(element => {
            const color = element.querySelector('.color-input').value;
            const position = element.querySelector('.position-slider').value;
            const opacity = element.querySelector('.opacity-slider').value;
            stops.push({ color, position: parseInt(position), opacity: parseInt(opacity) });
        });
        
        // Sort stops by position
        stops.sort((a, b) => a.position - b.position);
        return stops;
    }
    
    generateGradientCSS() {
        const type = this.gradientType.value;
        const stops = this.getColorStops();
        
        let gradient;
        if (type === 'linear') {
            const dir = this.direction.value;
            const stopStrings = stops.map(stop => {
                const rgba = this.hexToRgba(stop.color, stop.opacity / 100);
                return `${rgba} ${stop.position}%`;
            });
            gradient = `linear-gradient(${dir}, ${stopStrings.join(', ')})`;
        } else {
            const stopStrings = stops.map(stop => {
                const rgba = this.hexToRgba(stop.color, stop.opacity / 100);
                return `${rgba} ${stop.position}%`;
            });
            gradient = `radial-gradient(circle, ${stopStrings.join(', ')})`;
        }
        
        return gradient;
    }
    
    updateGradient() {
        const gradient = this.generateGradientCSS();
        this.gradientPreview.style.background = gradient;
        this.cssOutput.value = `background: ${gradient};`;
    }
    
    copyToClipboard() {
        this.cssOutput.select();
        this.cssOutput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            this.showCopyFeedback();
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(this.cssOutput.value).then(() => {
                this.showCopyFeedback();
            }).catch(() => {
                alert('Failed to copy to clipboard');
            });
        }
    }
    
    showCopyFeedback() {
        const originalText = this.copyBtn.textContent;
        this.copyBtn.textContent = 'Copied!';
        this.copyBtn.className = this.copyBtn.className.replace('bg-gray-700 hover:bg-gray-800', 'bg-green-500 hover:bg-green-600');
        
        setTimeout(() => {
            this.copyBtn.textContent = originalText;
            this.copyBtn.className = this.copyBtn.className.replace('bg-green-500 hover:bg-green-600', 'bg-gray-700 hover:bg-gray-800');
        }, 2000);
    }
    
    applyPreset(gradientCSS) {
        const parsed = this.parseGradient(gradientCSS);
        if (parsed) {
            this.setGradientFromParsed(parsed);
        }
    }
    
    parseGradient(gradientString) {
        const isLinear = gradientString.includes('linear-gradient');
        const isRadial = gradientString.includes('radial-gradient');
        
        if (!isLinear && !isRadial) return null;
        
        let type = isLinear ? 'linear' : 'radial';
        let direction = 'to right';
        let colors = [];
        
        try {
            // Remove the gradient function wrapper
            let content = gradientString.match(/\((.*)\)$/)[1];
            
            if (isLinear) {
                // Extract direction for linear gradients
                const directionMatch = content.match(/^([^,]+),/);
                if (directionMatch) {
                    const dir = directionMatch[1].trim();
                    // Map common directions
                    const directionMap = {
                        '45deg': '45deg',
                        '90deg': '90deg',
                        '135deg': '135deg',
                        '180deg': '180deg',
                        '225deg': '225deg',
                        '270deg': '270deg',
                        '315deg': '315deg',
                        '360deg': '360deg',
                        'to right': 'to right',
                        'to left': 'to left',
                        'to top': 'to top',
                        'to bottom': 'to bottom',
                        'to top right': 'to top right',
                        'to top left': 'to top left',
                        'to bottom right': 'to bottom right',
                        'to bottom left': 'to bottom left'
                    };
                    direction = directionMap[dir] || 'to right';
                    content = content.substring(directionMatch[0].length).trim();
                }
            } else {
                // For radial, remove 'circle, ' if present
                content = content.replace(/^circle,\s*/, '');
            }
            
            // Parse color stops
            const colorRegex = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\)|[a-zA-Z]+)(?:\s+(\d+)%)?/g;
            let match;
            let position = 0;
            const increment = colors.length > 0 ? 100 / (colors.length + 1) : 50;
            
            while ((match = colorRegex.exec(content)) !== null) {
                const color = match[1];
                const pos = match[2] ? parseInt(match[2]) : position;
                colors.push({ color, position: pos });
                if (!match[2]) position += increment;
            }
            
            // If we didn't find explicit positions, distribute evenly
            if (colors.length > 0 && colors.every(c => c.position === 0)) {
                colors.forEach((color, index) => {
                    color.position = index * (100 / (colors.length - 1));
                });
            }
            
            return { type, direction, colors };
        } catch (error) {
            console.error('Error parsing gradient:', error);
            return null;
        }
    }
    
    setGradientFromParsed(parsed) {
        // Set gradient type
        this.gradientType.value = parsed.type;
        this.toggleDirectionVisibility();
        
        // Set direction for linear gradients
        if (parsed.type === 'linear') {
            this.direction.value = parsed.direction;
        }
        
        // Clear existing color stops
        this.colorStops.innerHTML = '';
        
        // Add new color stops
        parsed.colors.forEach((colorData, index) => {
            this.createColorStop(colorData.color, colorData.position, index === 0);
        });
        
        // Ensure we have at least 2 color stops
        if (parsed.colors.length < 2) {
            this.createColorStop('#0000ff', 100, false);
        }
        
        // Bind events and update
        this.bindColorStopEvents();
        this.updateRemoveButtons();
        this.updateGradient();
    }
    
    createColorStop(color, position, isFirst = false, opacity = 100) {
        const colorStopDiv = document.createElement('div');
        colorStopDiv.className = 'color-stop flex items-center mb-3';
        
        colorStopDiv.innerHTML = `
            <input type="color" value="${color}" class="color-input w-12 h-12 rounded border-2 border-gray-300 cursor-pointer">
            <div class="flex-1 mx-3">
                <div class="text-xs text-gray-500 mb-1">Position</div>
                <input type="range" min="0" max="100" value="${position}" class="position-slider w-full mb-1">
                <div class="text-xs text-gray-500 mb-1">Opacity</div>
                <input type="range" min="0" max="100" value="${opacity}" class="opacity-slider w-full">
            </div>
            <div class="w-16 text-sm text-gray-600">
                <div class="position-display">${position}%</div>
                <div class="opacity-display text-xs">${opacity}%</div>
            </div>
            <button class="remove-color ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600${isFirst ? ' disabled:opacity-50' : ''}"${isFirst ? ' disabled' : ''}>×</button>
        `;
        
        this.colorStops.appendChild(colorStopDiv);
    }
}

// Initialize the gradient generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GradientGenerator();
});

// Add some utility functions for enhanced user experience
document.addEventListener('keydown', (e) => {
    // Ctrl+C or Cmd+C to copy when focused on preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'gradientPreview' || activeElement.closest('.gradient-preview')) {
            const cssOutput = document.getElementById('cssOutput');
            const copyBtn = document.getElementById('copyBtn');
            cssOutput.select();
            document.execCommand('copy');
            copyBtn.click();
            e.preventDefault();
        }
    }
});

// Add click to focus functionality for better UX
document.getElementById('gradientPreview').addEventListener('click', function() {
    this.focus();
});

// Add tabindex for keyboard navigation
document.getElementById('gradientPreview').setAttribute('tabindex', '0');