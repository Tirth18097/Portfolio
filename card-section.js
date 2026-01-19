/**
 * Card Section Generator
 * Creates card-based sections dynamically
 */

class CardSection {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.config = config;
        this.render();
    }

    render() {
        if (!this.container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        const sectionHTML = `
            <div class="card-section-wrapper">
                <div class="card-section-header">
                    ${this.config.label ? `<p class="card-section-label">${this.config.label}</p>` : ''}
                    <h2 class="card-section-title">
                        ${this.config.title.split(' ').map((word, index) =>
            this.config.highlightWords.includes(word)
                ? `<span class="highlight">${word}</span>`
                : word
        ).join(' ')}
                    </h2>
                    ${this.config.subtitle ? `<p class="card-section-subtitle">${this.config.subtitle}</p>` : ''}
                </div>
                
                <div class="cards-grid">
                    ${this.config.cards.map(card => this.createCard(card)).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = sectionHTML;
    }

    createCard(card) {
        // Support both icon fonts and custom logo images
        const iconContent = card.logo
            ? `<img src="${card.logo}" alt="${card.title}" class="w-12 h-12 object-contain">`
            : `<i class="${card.icon}"></i>`;

        // Add onclick handler if modal is specified (removed from card, added to button)
        const clickHandler = '';

        // Add preview image if specified
        const previewImage = card.previewImage
            ? `<img src="${card.previewImage}" alt="${card.title}" class="card-preview-image" onclick="window.open('${card.previewImage}', '_blank')" />`
            : '';

        // Add button if modal is specified
        const modalButton = card.modal
            ? `<button onclick="${card.modal}" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center justify-center gap-2">
                <i class="fas fa-eye"></i>
                View Content
               </button>`
            : '';

        return `
            <div class="card-item" ${clickHandler}>
                <div class="card-icon-wrapper ${card.iconColor}">
                    ${iconContent}
                </div>
                <h3 class="card-title">${card.title}</h3>
                <p class="card-organization">${card.organization}</p>
                <p class="card-description">${card.description}</p>
                ${previewImage}
                ${modalButton}
            </div>
        `;
    }
}

// Example usage - You can copy this template and modify for your sections
/*
const internshipSection = new CardSection('internship-section', {
    label: 'INTERNSHIPS',
    title: 'Professional Internships',
    highlightWords: ['Internships'],
    subtitle: 'Gaining real-world experience through industry internships',
    cards: [
        {
            icon: 'fas fa-briefcase',
            iconColor: 'blue',
            title: 'Data Science Intern',
            organization: 'Company Name',
            description: 'Description of your internship experience and key responsibilities.'
        },
        {
            icon: 'fas fa-code',
            iconColor: 'red',
            title: 'ML Engineer Intern',
            organization: 'Another Company',
            description: 'Description of your internship experience and achievements.'
        },
        {
            icon: 'fas fa-chart-line',
            iconColor: 'yellow',
            title: 'Analytics Intern',
            organization: 'Tech Company',
            description: 'Working on data analytics and visualization projects.'
        }
    ]
});
*/
